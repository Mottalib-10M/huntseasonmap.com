/**
 * One page per state read. The dates and prices come from src/data/seasons.json (agency pages read on 2026-11-13); the
 * prose is written by hand for each state in src/content/states/*.ts (what is particular there), so no two pages read alike.
 */
import type { FAQ, PageDef } from './page-types';
import {
  STATES, METHOD_LABEL, mainGun, lastEnd, openerOf, rangesText, dayText, seasonsOf, totalDays, methodOf, licenseCost, sundayClosed,
  gunUnread, speciesOf, type State, type Species,
} from './engine/seasons';
import { zonesOf, zoneList } from './engine/zones';
import { formatMoney } from './format';
import { NOTES_1 } from '../content/states/notes-1';
import { NOTES_2 } from '../content/states/notes-2';
import { NOTES_3 } from '../content/states/notes-3';
import { NOTES_4 } from '../content/states/notes-4';

export interface StateNote {
  /** ONE paragraph of 120 words or more, the cited answer for that state (what is particular there). */
  resume: string;
  /** How the state cuts its calendar (zones, units, draws), in plain words, 2 to 4 sentences. */
  zones: string;
  /** What to check before going out there (Sundays, tags, a deadline), 1 to 3 sentences. */
  check: string;
  /** Two or three questions asked about that state only. */
  faqs: FAQ[];
}
export const NOTES: Record<string, StateNote> = { ...NOTES_1, ...NOTES_2, ...NOTES_3, ...NOTES_4 };

/** First candidate whose length falls in [min, max] (RECETTE §11: titles 50-60, descriptions 150-160 characters). */
export function fit(cands: string[], min: number, max: number, what: string): string {
  const ok = cands.find((c) => c.length >= min && c.length <= max);
  if (!ok) throw new Error(`${what}: no candidate in [${min},${max}] (${cands.map((c) => c.length).join(', ')})`);
  return ok;
}

const usd = (x: number) => formatMoney(x, Number.isInteger(x) ? 0 : 2);
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const andList = (xs: string[]) => (xs.length <= 1 ? (xs[0] ?? '') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

/**
 * What the page has and does not have, said under the intro (naive testers, 2026-11-14, 4th round: "Zones B, C, D, E: gun
 * dates not on this site" was found in the detail, after a title promising every zone). Computed from the data only.
 */
export function coverOf(st: State): NonNullable<PageDef['cover']> {
  const Z = zonesOf(st), un = gunUnread(st), read = Z ? Z.zones.filter((z) => !un.includes(z)) : [];
  const other = speciesOf(st).filter((x) => x !== 'deer'), absent = (['turkey', 'duck'] as Species[]).filter((x) => !other.includes(x));
  const deer = !Z ? `deer, the ${st.deer.length} periods read on the ${st.short} pages for 2026-27`
    : un.length ? `deer, with gun dates for ${zoneList(read)} only (other methods as listed in the table)`
      : `deer, for ${Z.zones.length === 2 ? 'both' : `all ${Z.zones.length}`} ${Z.noun} (pick yours in the checker)`;
  const missing = [...(un.length ? [`gun deer dates for ${zoneList(un)}`] : []), ...(absent.length ? [`${andList(absent)} seasons`] : [])];
  return {
    has: `${cap(deer)}${other.length ? `; ${andList(other)} dates, lower on this page` : ''}.`,
    missing: missing.length ? `${cap(missing.join('; '))}. The ${st.agency} publishes them; no date is guessed here.` : undefined,
    href: st.src[0].u,
    label: `${Z ? 'Find your zone and its dates' : 'The agency page we read'}: ${st.agency}, ${st.src[0].t}`,
  };
}

export function titleOf(st: State): string {
  const N = st.name;
  // A state whose gun dates cover some zones only does not promise "Dates by Zone" (naive testers, 4th round).
  if (gunUnread(st).length) return fit([`${N} Deer Season 2026-27: Dates and Opening Days`, `${N} Deer Season 2026-27: Dates and Openers`], 50, 60, `title ${st.code}`);
  return fit([
    `${N} Deer Season 2026-27: Dates by Zone and Opening Days`,
    `${N} Deer Season 2026-27: Dates, Zones and Opening Days`,
    `${N} Deer Season 2026-27: Dates by Zone and Opener`,
    `${N} Deer Season 2026-27: Dates, Zones and Openers`,
    `${N} Deer Season 2026-27: Every Date and Opener`,
    `${N} Deer Season 2026-27: Dates and Openers`,
    `${N} Deer Season 2026-27: All Dates`,
  ], 50, 60, `title ${st.code}`);
}

export function descriptionOf(st: State): string {
  const N = st.name, g = mainGun(st), a = openerOf(st, 'deer', 'archery');
  const gun = `${lower(g.s.replace(/\s*\(.*\)$/, ''))} opens ${dayText(g.r[0][0])}`;
  const arch = a ? `, archery ${dayText(a.start)}` : '';
  const heads = [`${N} deer season 2026-27: ${gun}${arch}.`, `${N} deer season 2026-27: ${gun}.`];
  const tails = [
    ' Every 2026-27 period by zone from the state wildlife agency, and a checker for any date you pick.',
    ' Every period by zone from the state wildlife agency, and a checker for any date you pick.',
    ' Every period by zone from the state wildlife agency, and a checker for any date.',
    ' Every period by zone from the state agency, and a checker for any date you pick.',
    ' Every period by zone from the state agency, and a checker for any date.',
    ' Every period from the state agency, and a date checker.',
    ' Every period by zone from the agency, plus a checker for any date.',
    ' All periods by zone and a checker that says if it is open on a date.',
    ' Every 2026-27 period as the agency printed it, and a date checker.',
    ' All periods as the agency printed them, with a checker for any date.',
    ' Every period, read on the agency site.',
    ' Every period.',
  ];
  const un = gunUnread(st);
  const read = un.length ? zoneList(zonesOf(st)!.zones.filter((z) => !un.includes(z))) : '';
  const partial = [
    ` Gun dates read for ${read} only, other zones on the agency site, and a date checker.`,
    ` Gun dates read for ${read} only; other zones on the agency site, and a checker.`,
    ` Gun dates for ${read} only, from the state agency, and a checker for any date.`,
    ` Gun dates for ${read} only, from the state agency, and a date checker.`,
    ` Gun dates for ${read} only; other zones on the agency site.`,
    ` Gun dates for ${read} only, from the state agency.`,
  ];
  const cands: string[] = [];
  for (const h of heads) for (const t of un.length ? partial : tails) cands.push(`${h}${t}`);
  return fit(cands, 150, 160, `description ${st.code}`);
}

const SP_TITLE: Record<Species, string> = { deer: 'deer', turkey: 'turkey', duck: 'duck' };
function seasonTable(st: State, sp: Species, h: { table: (a: string[], b: Array<Array<string | number>>, c?: string) => string }) {
  return h.table(['Season', 'Area', 'Dates', 'Days'], seasonsOf(st, sp).map((x) => [x.s, x.a, rangesText(x), totalDays(x)]), `${st.name} ${SP_TITLE[sp]} seasons 2026-27, as printed by ${st.short}`);
}

export function statePages(): PageDef[] {
  return STATES.map((st, i): PageDef => {
    const note = NOTES[st.code];
    if (!note) throw new Error(`No note for ${st.code}`);
    const kw = `${st.name} deer season`;
    const g = mainGun(st), first = seasonsOf(st, 'deer').flatMap((x) => x.r.map((r) => ({ x, d: r[0] }))).sort((p, q) => p.d.localeCompare(q.d))[0];
    const methods = (['archery', 'muzzleloader', 'gun'] as const).map((m) => ({ m, o: openerOf(st, 'deer', m) })).filter((y) => y.o);
    const deerCost = licenseCost(st, 'res', 'deer'), deerCostNon = licenseCost(st, 'non', 'deer');
    const faqOpen: FAQ = {
      q: `When does gun season for deer open in ${st.name} in 2026?`,
      a: `The headline period, ${lower(g.s)}, opens on ${dayText(g.r[0][0])} (${g.a}) and runs ${rangesText(g)}. ${methods.filter((y) => y.m !== 'gun').map((y) => `${METHOD_LABEL[y.m]} opens ${dayText(y.o!.start)} (${y.o!.season.a})`).join('; ')}${methods.some((y) => y.m !== 'gun') ? '.' : ''} The last deer period of 2026-27 in ${st.name} ends on ${dayText(lastEnd(st.deer))}. Dates as printed by ${st.short}, read on Nov. 13, 2026; other zones may open on other days, as the table on this page shows.`.replace(/\s+/g, ' '),
    };
    return {
      id: st.slug, group: 'states', order: 200 + i, slug: st.slug,
      nav: st.name,
      card: `${g.s}: ${rangesText(g)}.`,
      title: titleOf(st), description: descriptionOf(st),
      h1: `${kw} 2026-27: dates and opening days`,
      cover: coverOf(st),
      intro: `The ${kw} for 2026-27 starts with ${lower(first.x.s)} on ${dayText(first.d)}; the headline gun season, ${lower(g.s.replace(/\s*\(.*\)$/, ''))}, runs ${rangesText(g)} (${g.a}), one of ${st.deer.length} deer periods listed below.`,
      resume: `${note.resume} Source: ${st.agency}, read on November 13, 2026.`.replace(/\s+/g, ' '),
      faqs: [faqOpen, ...note.faqs],
      body: (h) => `
<h2>${kw} by method and zone</h2>
<p>${note.zones}</p>
${h.mini('countdown', { t: `How many days until your ${st.name} opener?`, p: ['m'], d: { st: st.code } })}
<h2>Before you go out in ${st.name}</h2>
<p>${note.check}${sundayClosed(st, 'deer') ? ` ${st.name} closes hunting on Sundays: the checker counts a Sunday inside a season as closed.` : ''}</p>
${deerCost.total !== null || deerCostNon.total !== null ? `<p>What an adult pays ${st.short} for a deer hunt, before agent fees: ${deerCost.total !== null ? `${usd(deerCost.total)} for a resident` : 'resident price not read'} and ${deerCostNon.total !== null ? `${usd(deerCostNon.total)} for a nonresident` : 'nonresident price not read'}. The ${h.a('hunting-license-cost-by-state', 'license cost comparison')} sets it beside the other states.</p>` : ''}
${st.turkey ? `<h2>Turkey season in ${st.name}</h2>${seasonTable(st, 'turkey', h)}${st.turkeyNote ? `<p>${st.turkeyNote}</p>` : ''}<p>Every state with turkey dates read is on the ${h.a('turkey-season-by-state', 'turkey season page')}.</p>` : ''}
${st.duck ? `<h2>Duck season in ${st.name}</h2>${seasonTable(st, 'duck', h)}${st.duckNote ? `<p>${st.duckNote}</p>` : ''}<p>Duck hunters 16 and older also carry the federal duck stamp: see the ${h.a('duck-season-by-state', 'duck season page')}.</p>` : ''}
`,
      tool: 'open', toolArg: { st: st.code },
      related: ['deer-season-by-state', 'archery-season-by-state', ...(st.turkey ? ['turkey-season-by-state'] : []), ...(st.duck ? ['duck-season-by-state'] : []), 'hunting-license-cost-by-state'].slice(0, 4),
      sources: Object.keys(stateSourceKeys(st)),
    };
  });
}

/** Keys of helpers.SOURCES for one state, built the same way (st_XX_i, lic_XX_i), without importing helpers (server only). */
function stateSourceKeys(st: State): Record<string, true> {
  const o: Record<string, true> = {};
  st.src.forEach((_, i) => { o[`st_${st.code}_${i}`] = true; });
  (st.lic?.src ?? []).filter((x) => !st.src.some((y) => y.u === x.u)).forEach((_, i) => { o[`lic_${st.code}_${i}`] = true; });
  return o;
}
export { methodOf };

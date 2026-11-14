/**
 * The calculators of the site, rendered by components/calc/SpecTool.tsx (full tool) and MiniSim.tsx (mini-simulator).
 * Every answer comes from the engine (lib/engine/seasons.ts) and src/data/seasons.json: the 2026-27 season pages and
 * regulation PDFs of the state wildlife agencies, read on November 13, 2026. `arg` overrides the default of any field.
 * This file ships to the browser.
 */
import type { ToolSpec, V, Input, ToolOut } from './tool-types';
import {
  STATES, STATES_LIC, READ, SPECIES_LABEL, MONTH_OPTIONS, METHOD_LABEL, byCode, speciesOf, statesWith, seasonsOf, statusOn, isoOf,
  inWindow, longDay, dayText, rangesText, licenseCost, daysBetween, sundayClosed, mainGun, periodName, periodList, periodState, totalDays,
  zoneRead, methodOf, type Species, type Method, type State, type Season,
} from './engine/seasons';
import { zonesOf, zoneOf, whereOf, zoneList, ALL_ZONE_IDS, type Zone } from './engine/zones';
import { formatMoney } from './format';
import { LSTATES, LREAD, READ_STATES, lByCode, price, ranked, comboSaving, type LState, type Who } from './engine/licenses';

const s = (v: V, k: string) => String(v[k]);
const n = (v: V, k: string) => Number(v[k]) || 0;
export const longDate = longDay;

declare const __BUILD_DAY__: string;
/** First render = the build day (RECETTE §17.5); the browser then moves the date to today (SpecTool, `today`). */
export const BUILD = inWindow(typeof __BUILD_DAY__ !== 'undefined' ? __BUILD_DAY__ : READ);

/** ONE example case for the whole site: deer season in Texas, on the build day. */
export const EX = { st: 'TX', sp: 'deer', mo: BUILD.slice(0, 7), d: Number(BUILD.slice(8, 10)) } as const;

const usd = (x: number) => formatMoney(x, Number.isInteger(x) ? 0 : 2);
const spLabel = (sp: Species) => SPECIES_LABEL[sp].toLowerCase();
const plural = (k: number, one: string, many: string) => `${k} ${k === 1 ? one : many}`;
const sources = (st: State) => st.src.map((x) => x.t).join('; ');
const official = (st: State) => `Dates as published by the ${st.agency} (${sources(st)}), read on ${longDay(st.read)}. Zones, units, permits and bag limits decide where and what you may hunt: check the regulations of your area before you go.`;

const STATE_OPTS = STATES.map((x) => ({ value: x.code, label: x.name }));
const STATE = (def: string = EX.st, id = 'st', label = 'State'): Input => ({ kind: 'select', id, label, def, options: STATE_OPTS, help: `${STATES.length} states covered so far (list in the menu)` });
const SPECIES = (def: string = EX.sp): Input => ({
  kind: 'select', id: 'sp', label: 'Game', def,
  options: (['deer', 'turkey', 'duck'] as Species[]).map((x) => ({ value: x, label: SPECIES_LABEL[x] })),
  dyn: (v) => speciesOf(byCode(s(v, 'st'))).map((x) => ({ value: x, label: SPECIES_LABEL[x] })),
});
const SPECIES_ALL = (def: string = 'deer'): Input => ({ kind: 'select', id: 'sp', label: 'Game', def, options: (['deer', 'turkey', 'duck'] as Species[]).map((x) => ({ value: x, label: `${SPECIES_LABEL[x]} (${statesWith(x).length} states read)` })) });
const MONTH = (def: string = EX.mo): Input => ({ kind: 'select', id: 'mo', label: 'Month', def, options: MONTH_OPTIONS });
const DAY = (def: number = EX.d): Input => ({ id: 'd', label: 'Day', def, max: 31, help: 'Day of the month' });
// Gun first: "deer season" means the gun season for most hunters, and a status for "any method" said Open in
// Alabama while only archery and the youth gun weekend were (naive testers, 2026-11-14). The method is asked up front.
const METHODS: Array<Method | 'any'> = ['gun', 'archery', 'muzzleloader', 'youth', 'any'];
// Naive testers, 2026-11-14 (second round): "muzzleloader" read as jargon, and "Deer only: other game shows every
// period" was not understood. The option says what a muzzleloader is; the help says what "Gun / rifle" covers.
const mOpt = (x: Method | 'any') => ({ value: x, label: x === 'any' ? 'Any method' : x === 'muzzleloader' ? 'Muzzleloader (old-style black-powder gun)' : METHOD_LABEL[x] });
const METHOD = (def: Method | 'any' = 'gun', adv = false): Input => ({
  kind: 'select', id: 'm', label: 'Your method', short: 'method', def, adv,
  options: METHODS.map(mOpt),
  dyn: (v) => (s(v, 'sp') === 'deer' ? METHODS.map(mOpt) : [{ value: 'any', label: 'All methods' }]),
  help: 'Gun / rifle: modern rifle or shotgun.',
});
/** The zone, beside the method (naive testers, 2026-11-14, second round): left on "All zones", one line per zone. */
const zoneOpts = (st: State) => { const Z = zonesOf(st); return Z ? [{ value: 'all', label: `All ${Z.noun}, one line each` }, ...Z.zones.map((z) => ({ value: z.id, label: z.label }))] : [{ value: 'all', label: 'One calendar statewide' }]; };
const ZONE = (): Input => ({
  kind: 'select', id: 'z', label: 'Your zone or area', short: 'zone', def: 'all',
  options: [{ value: 'all', label: 'All zones' }, ...ALL_ZONE_IDS.map((x) => ({ value: x, label: x }))],
  dyn: (v) => (s(v, 'sp') === 'deer' ? zoneOpts(byCode(s(v, 'st'))) : [{ value: 'all', label: 'One calendar statewide' }]),
  hidden: (v) => s(v, 'sp') !== 'deer' || !zonesOf(byCode(s(v, 'st'))),
});
const dateOf = (v: V) => isoOf(s(v, 'mo'), n(v, 'd'));
const today = (iso: string): V => { const d = inWindow(iso); return { mo: d.slice(0, 7), d: Number(d.slice(8, 10)) }; };

type Arg = Record<string, number | string>;
function spec(inputs: Input[], arg: Arg, run: (v: V) => ToolOut, withToday = true): ToolSpec {
  return {
    inputs: inputs.map((i) => (arg[i.id] === undefined ? i : { ...i, def: (i.kind === 'choice' || i.kind === 'select') ? String(arg[i.id]) : Number(arg[i.id]) } as Input)),
    run,
    // A page that fixes the date (a "season opener" page) keeps it; otherwise the browser moves it to today.
    ...(withToday && arg.mo === undefined ? { today } : {}),
  };
}

/** "gun / rifle", "archery", "any method". */
const mWord = (m: Method | 'any') => (m === 'any' ? 'any method' : METHOD_LABEL[m].toLowerCase());
const PSTATE = (st: State, sp: Species, x: Season, iso: string): string => {
  const p = periodState(st, sp, x, iso);
  return p.k === 'open' ? 'Open' : p.k === 'sunday' ? 'Sunday: closed' : p.k === 'notyet' ? 'Not yet' : p.k === 'paused' ? `Paused, back ${dayText(p.back!)}` : 'Over';
};
/** "opens Jan. 4, 2027, in 51 days" */
const opensIn = (start: string, k: number, again = false) => `${again ? 'reopens' : 'opens'} ${dayText(start)}, in ${plural(k, 'day', 'days')}`;
/** The next period, said "reopens" when it is a later stretch of a period (Arkansas modern gun, Dec. 26; muzzleloader, Dec. 12). */
const nextText = (S: { open: Season[]; next: { season: Season; start: string; inDays: number } | null }) =>
  S.next ? `${periodName(S.next.season)}: ${opensIn(S.next.start, S.next.inDays, S.next.season.r.some((r) => r[0] < S.next!.start))}` : '';

/** Who the status is for: "gun hunters", "bowhunters", "duck hunters". */
const HUNTERS: Record<Method | 'any', string> = { gun: 'gun hunters', archery: 'bowhunters', muzzleloader: 'muzzleloader hunters', youth: 'youth and special hunts', other: 'other hunts', any: 'deer hunters' };
const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
/** The reader's own day in the browser (the build day at build time): "today" only when it is. */
const localToday = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const when = (iso: string) => (iso === localToday() ? 'today' : `on ${dayText(iso)}`);
/** "Archery (stalk hunting), Special youth gun (under 16)": each name once (the table names the areas). */
const names = (ss: Season[]) => [...new Set(ss.map((x) => x.s))].join(', ');
/** The sentence of the deer note that says licenses are drawn (Colorado, Utah, the Dakotas), shown in bold. */
const drawLine = (st: State, sp: Species) => (sp === 'deer' && st.deerNote ? st.deerNote.split(/(?<=\.)\s+(?=[A-Z])/).find((x) => /\bdraw|\bdrawn\b|lottery/i.test(x)) : undefined);
/** One zone in the summary: "open until Jan. 3, 2027", "closed, opens Nov. 21, 2026, in 7 days". */
function zoneLine(st: State, sp: Species, iso: string, method: Method | 'any', z: Zone): string {
  if (!zoneRead(st, method, z.id)) return `${mWord(method)} dates not on this site`;
  const S = statusOn(st, sp, iso, method, z.id);
  if (S.open.length) return `open: ${S.ends.map((e) => `${e.season.s} until ${dayText(e.end)}`).join('; ')}`;
  const why = S.sundayOnly ? 'closed (no hunting on Sundays)' : 'closed';
  return S.next ? `${why}, ${opensIn(S.next.start, S.next.inDays, S.next.season.r.some((r) => r[0] < S.next!.start))} (${S.next.season.s})` : `${why}, no other period in 2026-27`;
}

/**
 * Is it open on that date, in that state, for that game, method and zone? The large word carries its own scope
 * ("Closed for adult gun hunters in Zone A", "Open in 3 of 5 zones for gun hunters"), never a bare statewide
 * "Closed" (naive testers, 2026-11-14, second round), and the periods of other methods open that day come right under it.
 */
function openAnswer(v: V): ToolOut {
  const st = byCode(s(v, 'st'));
  const sp = (speciesOf(st).includes(s(v, 'sp') as Species) ? s(v, 'sp') : 'deer') as Species;
  const method = (sp === 'deer' ? s(v, 'm') : 'any') as Method | 'any';
  const iso = dateOf(v);
  const Z = sp === 'deer' ? zonesOf(st) : null;
  const zone = Z && Z.zones.some((z) => z.id === s(v, 'z')) ? s(v, 'z') : 'all';
  const Zc = Z && zone !== 'all' ? zoneOf(st, zone) : null;
  const S = statusOn(st, sp, iso, method, zone);
  const methodWord = method === 'any' ? '' : `, ${mWord(method)}`;
  const youthOpen = method === 'gun' && S.others.some((x) => methodOf(x) === 'youth');
  const who = sp === 'deer' ? `${youthOpen ? 'adult ' : ''}${HUNTERS[method]}` : `${spLabel(sp)} hunters`;
  const flags = [
    ...(S.others.length ? [`${S.open.length ? 'Also open' : 'Open'} ${when(iso)} for: ${names(S.others)}`] : []),
    ...(drawLine(st, sp) ? [drawLine(st, sp)!] : []),
  ];
  const sundays = sundayClosed(st, sp) ? [['Sundays', `closed for ${sp === 'duck' && !st.noSunday ? 'migratory birds' : 'all hunting'}`] as [string, string]] : [];
  const every = seasonsOf(st, sp);
  const table = {
    caption: `${st.name}, ${spLabel(sp)}: every 2026-27 period we read, all methods and areas, and its status on ${dayText(iso)}`,
    headers: ['Season', 'Area', 'Dates', 'Days', `On ${dayText(iso)}`],
    rows: every.map((x) => [x.s, x.a, rangesText(x), String(totalDays(x)), PSTATE(st, sp, x, iso)]),
    align: ['l', 'l', 'l', 'r', 'l'] as Array<'l' | 'r'>,
  };
  const note = `${sp === 'deer' && st.deerNote ? `${st.deerNote.split(/(?<=\.)\s+(?=[A-Z])/).filter((x) => x !== drawLine(st, sp)).join(' ')} ` : ''}${official(st)}`.replace(/^ +/, '');
  const base = { label: `${st.name} ${spLabel(sp)} season${methodWord}${Zc ? `, ${Zc.label}` : ''}, on ${longDay(iso)}`, flags, table, note, example: `Shown for ${longDay(iso)}`, exampleAide: 'pick your state, game, method, zone or another date to check it' };

  // No zone chosen in a state with zones: one line per zone, never one status for the whole state.
  if (Z && zone === 'all') {
    const read = Z.zones.filter((z) => zoneRead(st, method, z.id)), unread = Z.zones.filter((z) => !zoneRead(st, method, z.id));
    const open = read.filter((z) => statusOn(st, sp, iso, method, z.id).open.length);
    const prep = Z.prep ?? 'in';
    const every_ = (k: number) => (k === 2 ? `both ${Z.noun}` : `all ${k} ${Z.noun}`);
    const pick = `Pick ${Z.field.replace(/^Your /, 'your ').replace(/^Where/, 'where')} above for its own dates and next opener.`;
    const value = read.length === 1
      ? `${open.length ? 'Open' : 'Closed'} for ${who} ${whereOf(read[0])}`
      : open.length === 0 ? `Closed for ${who} ${prep} ${every_(read.length)}`
        : open.length === read.length ? `Open for ${who} ${prep} ${every_(read.length)}`
          : `Open ${prep} ${open.length} of ${read.length} ${Z.noun} for ${who}`;
    return {
      ...base, value,
      sub: pick,
      rows: [
        ...read.map((z) => [z.label, zoneLine(st, sp, iso, method, z)] as [string, string]),
        ...(unread.length ? [[cap(zoneList(unread)), `${mWord(method)} dates not on this site (${st.short} sets them)`] as [string, string]] : []),
        ...sundays,
      ],
    };
  }

  // One zone chosen, or a state with one calendar.
  const where = Zc ? ` ${whereOf(Zc)}` : '';
  if (Zc && !zoneRead(st, method, zone)) {
    const readZ = Z!.zones.filter((z) => zoneRead(st, method, z.id));
    return {
      ...base,
      value: `${Zc.label}: ${mWord(method)} dates not on this site`,
      sub: `${st.short} prints its own ${mWord(method)} dates for ${Zc.label}; the ones read here are for ${zoneList(readZ) || 'other zones'}. Check the agency regulations linked below before you go.`,
      rows: [...sundays],
    };
  }
  const nextVal = S.next ? nextText(S) : `no other ${method === 'any' ? '' : `${mWord(method)} `}period in 2026-27`;
  let sub: string | undefined;
  if (S.sundayOnly) sub = `No ${sp === 'duck' && !st.noSunday ? 'migratory bird ' : ''}hunting on Sundays in ${st.name}.`;
  else if (S.open.length > 1) sub = `${S.open.length} periods open, each with its own last day below.`;
  else if (!S.open.length) sub = S.next ? `${nextText(S)}.` : `No ${mWord(method)} period left in 2026-27${where}.`;
  return {
    ...base,
    value: `${S.open.length ? 'Open' : 'Closed'} for ${who}${where}`,
    sub,
    rows: [
      ...S.ends.map((e) => [periodName(e.season), `open until ${dayText(e.end)}`] as [string, string]),
      ...(S.open.length || S.sundayOnly ? [['Next new period', nextVal] as [string, string]] : []),
      [method === 'any' ? `All ${spLabel(sp)} periods${where}, 2026-27` : `All ${mWord(method)} periods${where}, 2026-27`, S.first ? `${dayText(S.first)} to ${dayText(S.last)}` : 'none in the dates read'],
      ...sundays,
    ],
  };
}

/** Which states are open on a date, for one game (the "map" of the site, as a table). */
function mapAnswer(v: V): ToolOut {
  const sp = s(v, 'sp') as Species, iso = dateOf(v);
  const method = (sp === 'deer' ? s(v, 'm') : 'any') as Method | 'any';
  const list = statesWith(sp).map((st) => ({ st, S: statusOn(st, sp, iso, method) }));
  const open = list.filter((x) => x.S.open.length), closed = list.filter((x) => !x.S.open.length);
  const soonest = closed.filter((x) => x.S.next).sort((a, b) => a.S.next!.start.localeCompare(b.S.next!.start))[0];
  const methodWord = method === 'any' ? '' : ` (${mWord(method)})`;
  return {
    label: `States with a ${spLabel(sp)} season${methodWord} open on ${longDay(iso)}`,
    value: `${open.length} of ${list.length}`,
    sub: `Among the ${list.length} states whose 2026-27 ${spLabel(sp)} dates we read`,
    rows: [
      ['Open', open.length ? open.map((x) => x.st.name).join(', ') : 'none'],
      ['Closed', closed.length ? closed.map((x) => x.st.name).join(', ') : 'none'],
      ['Next state to open', soonest ? `${soonest.st.name}, ${dayText(soonest.S.next!.start)} (${soonest.S.next!.season.s})` : 'none'],
    ],
    table: {
      caption: `${SPECIES_LABEL[sp]}${methodWord} on ${dayText(iso)}, state by state`,
      headers: ['State', 'On that date', 'Next new period'],
      rows: list.map(({ st, S }) => [
        st.name,
        S.open.length ? `Open: ${S.ends.map((e) => `${periodName(e.season)}, until ${dayText(e.end)}`).join('; ')}` : S.sundayOnly ? 'Closed (Sunday)' : 'Closed',
        S.next ? `${dayText(S.next.start)}: ${periodName(S.next.season)}${S.open.includes(S.next.season) ? ' (reopens)' : ''}` : `no other ${method === 'any' ? '' : `${mWord(method)} `}period in 2026-27`,
      ]),
      align: ['l', 'l', 'l'],
    },
    note: `Dates as published by each state wildlife agency, read on ${longDay(READ)}. A state shown open may be open only in some zones or units: each period is named with its area.${method === 'archery' ? ' A state shown closed to archery may still allow bows during its gun season: check the agency rules.' : ''}`,
    example: `Shown for ${longDay(iso)}`,
    exampleAide: 'pick another date, game or method to check it',
  };
}

/** Days until a method opens in a state (or how long each open period still runs). */
function countdownAnswer(v: V): ToolOut {
  const st = byCode(s(v, 'st')), iso = dateOf(v);
  const method = s(v, 'm') as Method;
  const S = statusOn(st, 'deer', iso, method);
  const label = `${st.name} ${mWord(method)} deer season, seen from ${longDay(iso)}`;
  const example = `Shown for ${longDay(iso)}`, exampleAide = 'pick your state, method or another date';
  if (S.open.length) {
    const e0 = S.ends[0];
    return {
      label, value: 'Open now',
      sub: S.ends.length === 1
        ? `${periodName(e0.season)}: last day ${dayText(e0.end)}, ${plural(e0.left, 'more day', 'more days')} after today`
        : `${S.ends.length} periods open, each with its own last day below`,
      rows: [
        ...S.ends.map((e) => [periodName(e.season), `last day ${dayText(e.end)} (${plural(e.left, 'more day', 'more days')})`] as [string, string]),
        ['Next new period', S.next ? nextText(S) : `no other ${mWord(method)} period in 2026-27`],
      ],
      note: official(st), example, exampleAide,
    };
  }
  return {
    label, value: S.next ? plural(S.next.inDays, 'day', 'days') : 'Over',
    sub: S.next ? `until ${S.next.season.s} opens on ${dayText(S.next.start)} (${S.next.season.a})` : `No ${mWord(method)} deer period left in 2026-27 in ${st.name}`,
    rows: [['Opens', S.next ? dayText(S.next.start) : 'n/a'], ['Area', S.next ? S.next.season.a : 'n/a'], [`All ${mWord(method)} periods, 2026-27`, S.first ? `${dayText(S.first)} to ${dayText(S.last)}` : 'none in the dates read']],
    note: official(st), example, exampleAide,
  };
}

/** Two states side by side: the headline gun season and the first archery day. */
function compareAnswer(v: V): ToolOut {
  const a = byCode(s(v, 'st')), b = byCode(s(v, 'st2'));
  const ga = mainGun(a), gb = mainGun(b);
  const oa = ga.r[0][0], ob = gb.r[0][0];
  const diff = daysBetween(oa, ob);
  const arch = (x: State) => statusOn(x, 'deer', '2026-08-01', 'archery').next?.start ?? '';
  return {
    label: `Headline gun deer season: ${a.name} and ${b.name}`,
    value: diff === 0 ? 'Same day' : `${plural(Math.abs(diff), 'day', 'days')}`,
    sub: diff === 0 ? `Both open on ${dayText(oa)}` : `${diff > 0 ? a.name : b.name} opens first (${dayText(diff > 0 ? oa : ob)})`,
    rows: [
      [`${a.name}: ${ga.s}`, rangesText(ga)],
      [`${b.name}: ${gb.s}`, rangesText(gb)],
      [`First archery day`, `${a.code} ${arch(a) ? dayText(arch(a)) : 'n/a'} · ${b.code} ${arch(b) ? dayText(arch(b)) : 'n/a'}`],
    ],
    note: `The headline gun season is the one most hunters in the state mean by "deer season"; other zones or units can differ. Read on the agency pages on ${longDay(READ)}.`,
    example: `Example: ${a.name} and ${b.name}`,
  };
}

/** What an adult pays the state: base license + deer license, or an annual fishing license. */
function licenseAnswer(v: V): ToolOut {
  const st = byCode(s(v, 'st')), who = s(v, 'who') as 'res' | 'non', what = s(v, 'what') as 'deer' | 'fish';
  const c = licenseCost(st, who, what);
  const whoW = who === 'res' ? 'resident' : 'nonresident', whatW = what === 'deer' ? 'to hunt deer' : 'to fish for a year';
  const others = STATES_LIC.map((x) => ({ x, c: licenseCost(x, who, what) })).filter((y) => y.c.total !== null).sort((p, q) => p.c.total! - q.c.total!);
  return {
    label: `${st.name}: what an adult ${whoW} pays ${whatW}`,
    value: c.total === null ? 'Not read' : usd(c.total),
    sub: c.total === null ? `Missing on the page we read: ${c.missing.join(', ')}` : `${c.items.length === 1 ? 'one license' : `${c.items.length} items`}, before any agent or processing fee`,
    rows: [...c.items.map(([k, p]) => [k, usd(p)] as [string, string]), ...(st.lic?.note ? [['Also', st.lic.note] as [string, string]] : [])],
    table: {
      caption: `Adult ${whoW} ${what === 'deer' ? 'deer hunting' : 'fishing'} license cost in the ${others.length} states where we read it, lowest first`,
      headers: ['State', 'Total', 'What it covers'],
      rows: others.map(({ x, c: k }) => [x.name, usd(k.total!), k.items.map((i) => i[0].replace(/^[^:]+: /, '')).join(' + ')]),
      align: ['l', 'r', 'l'],
    },
    note: st.lic ? `Prices read on ${st.lic.src.map((x) => x.t).join('; ')}, ${longDay(st.read)}. Federal duck stamps, HIP, habitat stamps not listed and vendor fees are not included.` : 'No license prices read for this state yet.',
    example: `Example: a ${whoW} in ${st.name}`,
  };
}

/* ---------- 50-state licenses (src/data/licenses.json, read on 2026-11-14) ---------- */
const L_OPTS = LSTATES.map((x) => ({ value: x.code, label: x.status === 'blocked' ? `${x.name} (prices to check)` : x.name }));
const L_STATE = (def = 'TX'): Input => ({ kind: 'select', id: 'st', label: 'State', def, options: L_OPTS, help: `${LSTATES.length} states, prices read in ${READ_STATES.length}` });
const WHO = (def = 'res'): Input => ({ kind: 'choice', id: 'who', label: 'You are', def, options: [{ value: 'res', label: 'Resident' }, { value: 'non', label: 'Nonresident' }] });
const pr = (x: number | null) => (x === null ? 'not printed' : usd(x));
const whoWord = (w: Who) => (w === 'res' ? 'resident' : 'nonresident');
const lnote = (st: LState) => (st.status === 'blocked'
  ? `The ${st.short} site refused our reader on ${longDay(LREAD)} (${st.reason ?? 'blocked'}): prices to check on the agency store.`
  : `As printed by the ${st.agency} (${st.src.map((x) => x.t).join('; ')}), read on ${longDay(LREAD)}. Vendor and processing fees are not included.`);
const storeRow = (st: LState): [string, string] => ['Where to buy', st.buy ? `${st.buy.t} (official, run by ${st.short})` : 'agency page to check'];

/** Base annual hunting license of a state, with combination, deer license and the official store. */
function buyAnswer(v: V): ToolOut {
  const st = lByCode(s(v, 'st')), who = s(v, 'who') as Who, p = price(st.hunt, who);
  const all = ranked('hunt', who);
  const rank = all.findIndex((x) => x.s.code === st.code);
  return {
    label: `${st.name}: annual hunting license for an adult ${whoWord(who)}`,
    value: st.status === 'blocked' ? 'To check' : p === null ? 'Not printed' : usd(p),
    sub: st.hunt ? `${st.hunt.t}${rank >= 0 ? ` · ${rank + 1} of ${all.length} states, cheapest first` : ''}` : 'No base hunting license price read for this state',
    rows: [
      ...(st.combo ? [[`Hunting and fishing: ${st.combo.t}`, pr(price(st.combo, who))] as [string, string]] : []),
      ...(st.deer ? [[`Deer: ${st.deer.t}`, pr(price(st.deer, who))] as [string, string]] : []),
      storeRow(st),
      ...(st.online ? [['How it is sold', st.online] as [string, string]] : []),
    ],
    table: {
      caption: `Adult ${whoWord(who)} annual hunting license in the ${all.length} states where it was printed, cheapest first`,
      headers: ['State', 'Price', 'License'],
      rows: all.map((x) => [x.s.name, usd(x.p), x.s.hunt!.t]),
      align: ['l', 'r', 'l'],
    },
    note: lnote(st),
    example: `Example: a ${whoWord(who)} of ${st.name}`,
  };
}

/** Hunting and fishing: combination license against the two licenses bought apart. */
function comboAnswer(v: V): ToolOut {
  const st = lByCode(s(v, 'st')), who = s(v, 'who') as Who, c = comboSaving(st, who);
  const h = price(st.hunt, who), f = price(st.fish, who), k = price(st.combo, who);
  const list = LSTATES.map((x) => ({ x, c: comboSaving(x, who) })).filter((y) => y.c).sort((p, q) => q.c!.saving - p.c!.saving);
  return {
    label: `${st.name}: hunting and fishing for an adult ${whoWord(who)}`,
    value: st.status === 'blocked' ? 'To check' : c ? (c.saving > 0 ? `${usd(c.saving)} saved` : c.saving === 0 ? 'Same price' : `${usd(-c.saving)} more`) : k !== null ? usd(k) : h !== null && f !== null ? usd(h + f) : 'Not printed',
    sub: c ? (c.saving >= 0 ? `combination ${usd(c.combo)} against ${usd(c.apart)} for the two licenses bought apart` : `the ${st.combo!.t} costs ${usd(c.combo)}, ${usd(c.apart)} for the two base licenses: it bundles more, check what it includes`) : k !== null ? `combination license (${st.combo!.t}); a price for one of the separate licenses was not printed` : st.combo ? 'Combination license not sold to this residency' : 'No combination license printed: hunting and fishing licenses bought apart',
    rows: [
      ['Hunting license', st.hunt ? `${pr(h)} (${st.hunt.t})` : 'not read'],
      ['Fishing license', st.fish ? `${pr(f)} (${st.fish.t})` : 'not read'],
      ['Combination license', st.combo ? `${pr(k)} (${st.combo.t})` : 'none printed'],
      storeRow(st),
    ],
    table: {
      caption: `States where hunting, fishing and combination prices were all printed for a ${whoWord(who)}, biggest saving first`,
      headers: ['State', 'Apart', 'Combination', 'Saving'],
      rows: list.map(({ x, c: y }) => [x.name, usd(y!.apart), usd(y!.combo), usd(y!.saving)]),
      align: ['l', 'r', 'r', 'r'],
    },
    note: lnote(st),
    example: `Example: a ${whoWord(who)} of ${st.name} who hunts and fishes`,
  };
}

/** Deer license or tag of a state, and what it adds to the base license. */
function tagAnswer(v: V): ToolOut {
  const st = lByCode(s(v, 'st')), who = s(v, 'who') as Who, d = price(st.deer, who), h = price(st.hunt, who);
  const all = ranked('deer', who);
  return {
    label: `${st.name}: deer license or tag for an adult ${whoWord(who)}`,
    value: st.status === 'blocked' ? 'To check' : d === null ? 'Not printed' : d === 0 ? 'Included' : usd(d),
    sub: st.deer ? st.deer.t : 'No deer license or tag price read for this state',
    rows: [
      ['Base hunting license', st.hunt ? `${pr(h)} (${st.hunt.t})` : 'not read'],
      ...(st.tag ? [['How deer tags work', st.tag] as [string, string]] : []),
      storeRow(st),
    ],
    table: {
      caption: `Deer license or tag for an adult ${whoWord(who)}, as printed in ${all.length} states, cheapest first`,
      headers: ['State', 'Price', 'Deer license or tag'],
      rows: all.map((x) => [x.s.name, x.p === 0 ? 'included' : usd(x.p), x.s.deer!.t]),
      align: ['l', 'r', 'l'],
    },
    note: `${lnote(st)} What each state calls a deer license, tag or permit differs: some cover any deer, some only antlerless deer, some are drawn.`,
    example: `Example: a ${whoWord(who)} of ${st.name}`,
  };
}

const SPECS: Record<string, (arg?: Arg) => ToolSpec> = {
  /** 50 states: base hunting license and official store. */
  buy: (arg = {}) => spec([L_STATE(), WHO()], arg, buyAnswer, false),
  /** Hunting and fishing combination against licenses bought apart. */
  combo: (arg = {}) => spec([L_STATE('OK'), WHO()], arg, comboAnswer, false),
  /** Deer license or tag. */
  tags: (arg = {}) => spec([L_STATE('NM'), WHO('non')], arg, tagAnswer, false),
  /** Home and state pages: is it open on that date? */
  open: (arg = {}) => spec([STATE(), SPECIES(), METHOD(), ZONE(), MONTH(), DAY()], arg, openAnswer),
  /** Species pages: every state on one date. */
  map: (arg = {}) => spec([SPECIES_ALL(), METHOD('any'), MONTH(), DAY()], arg, mapAnswer),
  /** Countdown to a method's opener. */
  countdown: (arg = {}) => spec([STATE(), { ...METHOD('gun'), dyn: undefined, help: undefined, options: (['archery', 'muzzleloader', 'gun'] as Method[]).map((x) => ({ value: x, label: METHOD_LABEL[x] })) }, MONTH(), DAY()], arg, countdownAnswer),
  /** Two states side by side. */
  compare: (arg = {}) => spec([STATE(EX.st, 'st', 'First state'), STATE('OK', 'st2', 'Second state')], arg, compareAnswer, false),
  /** License cost. */
  license: (arg = {}) => spec([
    { kind: 'select', id: 'st', label: 'State', def: 'TX', options: STATES_LIC.map((x) => ({ value: x.code, label: x.name })), help: `${STATES_LIC.length} states with prices read` },
    { kind: 'choice', id: 'who', label: 'You are', def: 'non', options: [{ value: 'res', label: 'Resident' }, { value: 'non', label: 'Nonresident' }] },
    { kind: 'choice', id: 'what', label: 'License for', def: 'deer', options: [{ value: 'deer', label: 'Deer' }, { value: 'fish', label: 'Fishing' }] },
  ], arg, licenseAnswer, false),
};

export function getTool(kind: string, arg?: Arg): ToolSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown tool ${kind}`);
  return f(arg);
}
export const TOOL_KINDS = Object.keys(SPECS);
export { STATES };

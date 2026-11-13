/**
 * The calculators of the site, rendered by components/calc/SpecTool.tsx (full tool) and MiniSim.tsx (mini-simulator).
 * Every answer comes from the engine (lib/engine/seasons.ts) and src/data/seasons.json: the 2026-27 season pages and
 * regulation PDFs of the state wildlife agencies, read on November 13, 2026. `arg` overrides the default of any field.
 * This file ships to the browser.
 */
import type { ToolSpec, V, Input, ToolOut } from './tool-types';
import {
  STATES, STATES_LIC, READ, SPECIES_LABEL, MONTH_OPTIONS, METHOD_LABEL, byCode, speciesOf, statesWith, seasonsOf, statusOn, isoOf,
  inWindow, longDay, dayText, rangesText, coversDate, licenseCost, methodOf, daysBetween, sundayClosed, mainGun,
  type Species, type Method, type State,
} from './engine/seasons';
import { formatMoney } from './format';

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
const STATE = (def: string = EX.st, id = 'st', label = 'State'): Input => ({ kind: 'select', id, label, def, options: STATE_OPTS, help: `${STATES.length} states read so far` });
const SPECIES = (def: string = EX.sp): Input => ({
  kind: 'select', id: 'sp', label: 'Game', def,
  options: (['deer', 'turkey', 'duck'] as Species[]).map((x) => ({ value: x, label: SPECIES_LABEL[x] })),
  dyn: (v) => speciesOf(byCode(s(v, 'st'))).map((x) => ({ value: x, label: SPECIES_LABEL[x] })),
});
const SPECIES_ALL = (def: string = 'deer'): Input => ({ kind: 'select', id: 'sp', label: 'Game', def, options: (['deer', 'turkey', 'duck'] as Species[]).map((x) => ({ value: x, label: `${SPECIES_LABEL[x]} (${statesWith(x).length} states read)` })) });
const MONTH = (def: string = EX.mo): Input => ({ kind: 'select', id: 'mo', label: 'Month', def, options: MONTH_OPTIONS });
const DAY = (def: number = EX.d): Input => ({ id: 'd', label: 'Day', def, max: 31, help: 'Day of the month' });
const METHODS: Array<Method | 'any'> = ['any', 'archery', 'muzzleloader', 'gun', 'youth'];
const METHOD = (def = 'any', adv = true): Input => ({
  kind: 'select', id: 'm', label: 'Method', short: 'method', def, adv,
  options: METHODS.map((x) => ({ value: x, label: x === 'any' ? 'Any method' : METHOD_LABEL[x] })),
  dyn: (v) => (s(v, 'sp') === 'deer' ? METHODS : ['any']).map((x) => ({ value: x, label: x === 'any' ? 'Any method' : METHOD_LABEL[x as Method] })),
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

/** Is it open on that date, in that state, for that game? */
function openAnswer(v: V): ToolOut {
  const st = byCode(s(v, 'st'));
  const sp = (speciesOf(st).includes(s(v, 'sp') as Species) ? s(v, 'sp') : 'deer') as Species;
  const method = (sp === 'deer' ? s(v, 'm') : 'any') as Method | 'any';
  const iso = dateOf(v);
  const S = statusOn(st, sp, iso, method);
  const names = S.open.map((x) => `${x.s} (${x.a})`);
  const methodWord = method === 'any' ? '' : ` (${METHOD_LABEL[method].toLowerCase()})`;
  const nextLine = S.next ? `${S.next.season.s}, ${S.next.season.a}: ${dayText(S.next.start)}, in ${plural(S.next.inDays, 'day', 'days')}` : `none left in 2026-27 (last day ${dayText(S.last)})`;
  const all = seasonsOf(st, sp).filter((x) => method === 'any' || methodOf(x) === method);
  return {
    label: `${st.name} ${spLabel(sp)} season${methodWord} on ${longDay(iso)}`,
    value: S.open.length ? 'Open' : 'Closed',
    sub: S.sundayOnly ? `Closed: no ${sp === 'duck' && !st.noSunday ? 'migratory bird ' : ''}hunting on Sundays in ${st.name}` : S.open.length ? `${plural(S.open.length, 'period', 'periods')} open that day: ${names.join('; ')}` : `Next opening: ${nextLine}`,
    rows: [
      ['Open that day', S.open.length ? names.join('; ') : 'nothing'],
      ['Open period ends', S.closesOn ? dayText(S.closesOn) : 'n/a'],
      ['Next opening', nextLine],
      ['All 2026-27 periods', S.first ? `${dayText(S.first)} to ${dayText(S.last)}` : 'none read'],
      ...(sundayClosed(st, sp) ? [['Sundays', `closed for ${sp === 'duck' && !st.noSunday ? 'migratory birds' : 'all hunting'}`] as [string, string]] : []),
    ],
    table: {
      caption: `${st.name}, ${spLabel(sp)}${methodWord}: every 2026-27 period we read, and its status on ${dayText(iso)}`,
      headers: ['Season', 'Area', 'Dates', `On ${dayText(iso)}`],
      rows: all.map((x) => [x.s, x.a, rangesText(x), coversDate(x, iso) ? (sundayClosed(st, sp) && new Date(`${iso}T00:00:00Z`).getUTCDay() === 0 ? 'Sunday: closed' : 'Open') : x.r.some((r) => r[0] > iso) ? 'Not yet' : 'Over']),
      align: ['l', 'l', 'l', 'l'],
    },
    note: official(st),
    example: `Example: ${spLabel(sp)} season in ${st.name} on ${longDay(iso)}`,
    exampleAide: "Today's date is filled in once the page has loaded. Pick another state, game or date to check it.",
  };
}

/** Which states are open on a date, for one game (the "map" of the site, as a table). */
function mapAnswer(v: V): ToolOut {
  const sp = s(v, 'sp') as Species, iso = dateOf(v);
  const method = (sp === 'deer' ? s(v, 'm') : 'any') as Method | 'any';
  const list = statesWith(sp).map((st) => ({ st, S: statusOn(st, sp, iso, method) }));
  const open = list.filter((x) => x.S.open.length), closed = list.filter((x) => !x.S.open.length);
  const soonest = closed.filter((x) => x.S.next).sort((a, b) => a.S.next!.start.localeCompare(b.S.next!.start))[0];
  const methodWord = method === 'any' ? '' : ` (${METHOD_LABEL[method].toLowerCase()})`;
  return {
    label: `States with a ${spLabel(sp)} season${methodWord} open on ${longDay(iso)}`,
    value: `${open.length} of ${list.length}`,
    sub: `Among the ${list.length} states whose 2026-27 ${spLabel(sp)} dates we read`,
    rows: [
      ['Open', open.length ? open.map((x) => x.st.code).join(', ') : 'none'],
      ['Closed', closed.length ? closed.map((x) => x.st.code).join(', ') : 'none'],
      ['Next state to open', soonest ? `${soonest.st.name}, ${dayText(soonest.S.next!.start)} (${soonest.S.next!.season.s})` : 'none'],
    ],
    table: {
      caption: `${SPECIES_LABEL[sp]}${methodWord} on ${dayText(iso)}, state by state`,
      headers: ['State', 'On that date', 'Next opening'],
      rows: list.map(({ st, S }) => [st.name, S.open.length ? `Open: ${S.open.map((x) => x.s).join('; ')}` : S.sundayOnly ? 'Closed (Sunday)' : 'Closed', S.next ? `${dayText(S.next.start)}: ${S.next.season.s}` : 'none left']),
      align: ['l', 'l', 'l'],
    },
    note: `Dates as published by each state wildlife agency, read on ${longDay(READ)}. A state shown open may be open only in some zones or units: the state page lists the areas.`,
    example: `Example: ${spLabel(sp)} on ${longDay(iso)}`,
    exampleAide: "Today's date is filled in once the page has loaded. Pick another date or game.",
  };
}

/** Days until a method opens in a state (or how long the open period still runs). */
function countdownAnswer(v: V): ToolOut {
  const st = byCode(s(v, 'st')), iso = dateOf(v);
  const method = s(v, 'm') as Method;
  const S = statusOn(st, 'deer', iso, method);
  const label = `${st.name} ${METHOD_LABEL[method].toLowerCase()} deer season, seen from ${longDay(iso)}`;
  if (S.open.length) {
    const left = daysBetween(iso, S.closesOn!);
    return {
      label, value: 'Open now', sub: `Open until ${dayText(S.closesOn!)}: ${plural(left, 'day', 'days')} after this one`,
      rows: [['Open period', S.open.map((x) => `${x.s} (${x.a})`).join('; ')], ['Last day', dayText(S.closesOn!)], ['Next opening after that', S.next ? `${dayText(S.next.start)}: ${S.next.season.s}` : 'none']],
      note: official(st), example: `Example: ${st.name}, ${METHOD_LABEL[method].toLowerCase()}, on ${longDay(iso)}`,
      exampleAide: "Today's date is filled in once the page has loaded.",
    };
  }
  return {
    label, value: S.next ? plural(S.next.inDays, 'day', 'days') : 'Over',
    sub: S.next ? `until ${S.next.season.s} opens on ${dayText(S.next.start)} (${S.next.season.a})` : `No ${METHOD_LABEL[method].toLowerCase()} deer period left in 2026-27 in ${st.name}`,
    rows: [['Opens', S.next ? dayText(S.next.start) : 'n/a'], ['Area', S.next ? S.next.season.a : 'n/a'], ['All periods of that method', S.first ? `${dayText(S.first)} to ${dayText(S.last)}` : 'none read']],
    note: official(st), example: `Example: ${st.name}, ${METHOD_LABEL[method].toLowerCase()}, on ${longDay(iso)}`,
    exampleAide: "Today's date is filled in once the page has loaded.",
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

const SPECS: Record<string, (arg?: Arg) => ToolSpec> = {
  /** Home and state pages: is it open on that date? */
  open: (arg = {}) => spec([STATE(), SPECIES(), MONTH(), DAY(), METHOD()], arg, openAnswer),
  /** Species pages: every state on one date. */
  map: (arg = {}) => spec([SPECIES_ALL(), MONTH(), DAY(), METHOD()], arg, mapAnswer),
  /** Countdown to a method's opener. */
  countdown: (arg = {}) => spec([STATE(), { ...METHOD('gun', false), dyn: undefined, options: (['archery', 'muzzleloader', 'gun'] as Method[]).map((x) => ({ value: x, label: METHOD_LABEL[x] })) }, MONTH(), DAY()], arg, countdownAnswer),
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

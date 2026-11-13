/**
 * Season engine. Every date comes from src/data/seasons.json: the 2026-27 season pages and regulation PDFs of the
 * state wildlife agencies, read on 2026-11-13. Pure functions, no clock: the date to test is always passed in.
 */
import D from '../../data/seasons.json';

export type Species = 'deer' | 'turkey' | 'duck';
export type Method = 'archery' | 'muzzleloader' | 'gun' | 'youth' | 'other';
export interface Season { s: string; a: string; r: Array<[string, string]>; /** The headline firearm season of the state (one per state). */ main?: boolean }
export interface Src { t: string; u: string }
export interface Fee { res: number | null; non: number | null; t: string }
export interface Lic { base: Fee | null; deer: Fee | null; fish: Fee | null; note?: string; src: Src[] }
export interface State {
  code: string; name: string; slug: string; agency: string; short: string; read: string;
  deer: Season[]; turkey?: Season[]; duck?: Season[];
  deerNote?: string; turkeyNote?: string; duckNote?: string;
  noSunday?: boolean; duckNoSunday?: boolean;
  lic?: Lic; src: Src[];
}

export const STATES: State[] = (D as unknown as { states: State[] }).states;
export const READ: string = (D as { read: string }).read;
export const SPECIES: Species[] = ['deer', 'turkey', 'duck'];
export const SPECIES_LABEL: Record<Species, string> = { deer: 'Deer', turkey: 'Turkey', duck: 'Duck' };

export function byCode(code: string): State {
  const s = STATES.find((x) => x.code === code);
  if (!s) throw new Error(`Unknown state ${code}`);
  return s;
}
export const seasonsOf = (st: State, sp: Species): Season[] => st[sp] ?? [];
export const speciesOf = (st: State): Species[] => SPECIES.filter((sp) => seasonsOf(st, sp).length > 0);
export const statesWith = (sp: Species): State[] => STATES.filter((s) => seasonsOf(s, sp).length > 0);

/* ---------- dates (ISO yyyy-mm-dd, computed in UTC so that no time zone shifts a day) ---------- */
const t = (iso: string) => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10));
export const daysBetween = (a: string, b: string) => Math.round((t(b) - t(a)) / 86400000);
export const addDays = (iso: string, n: number) => new Date(t(iso) + n * 86400000).toISOString().slice(0, 10);
export const isSunday = (iso: string) => new Date(t(iso)).getUTCDay() === 0;
export const daysInMonth = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();
/** A valid ISO date from a month value ("2026-11") and a day, the day clamped to the month. */
export function isoOf(month: string, day: number): string {
  const y = +month.slice(0, 4), m = +month.slice(5, 7);
  const d = Math.min(Math.max(1, Math.round(day) || 1), daysInMonth(y, m));
  return `${month}-${String(d).padStart(2, '0')}`;
}
const MON = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
const MONTH_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/** "Oct. 3, 2026" (AP style, as most agencies print it). */
export const dayText = (iso: string) => `${MON[+iso.slice(5, 7) - 1]} ${+iso.slice(8, 10)}, ${iso.slice(0, 4)}`;
/** "November 13, 2026". */
export const longDay = (iso: string) => `${MONTH_FULL[+iso.slice(5, 7) - 1]} ${+iso.slice(8, 10)}, ${iso.slice(0, 4)}`;
/** "Oct. 3 to Nov. 6, 2026" or "Dec. 26, 2026 to Jan. 24, 2027" or "Oct. 31, 2026" (one day). */
export function rangeText([a, b]: [string, string]): string {
  if (a === b) return dayText(a);
  if (a.slice(0, 4) === b.slice(0, 4)) return `${MON[+a.slice(5, 7) - 1]} ${+a.slice(8, 10)} to ${dayText(b)}`;
  return `${dayText(a)} to ${dayText(b)}`;
}
export const rangesText = (s: Season) => s.r.map(rangeText).join(' and ');

/** The months the date picker offers: August 2026 to May 2027 (every season read falls inside). */
export const MONTH_OPTIONS = Array.from({ length: 10 }, (_, i) => {
  const y = i < 5 ? 2026 : 2027, m = ((i + 7) % 12) + 1;
  return { value: `${y}-${String(m).padStart(2, '0')}`, label: `${MONTH_FULL[m - 1]} ${y}` };
});
/** Clamp any date into the picker window. */
export function inWindow(iso: string): string {
  if (iso < '2026-08-01') return '2026-08-01';
  if (iso > '2027-05-31') return '2027-05-31';
  return iso;
}

/* ---------- seasons ---------- */
export function methodOf(s: Season): Method {
  const n = s.s.toLowerCase();
  if (/youth|junior|apprentice|veteran|disabled|class q/.test(n)) return 'youth';
  if (/muzzle|primitive|blackpowder|flintlock/.test(n)) return 'muzzleloader';
  if (/archery|bow|crossbow/.test(n) && !/gun\/bow|shotgun or bow/.test(n)) return 'archery';
  if (/gun|firearm|rifle|general|shotgun|regular|holiday|antlerless|weapon|heritage|plains|high country|special late|resident only|cwd|late winter/.test(n)) return 'gun';
  return 'other';
}
export const METHOD_LABEL: Record<Method, string> = { archery: 'Archery', muzzleloader: 'Muzzleloader', gun: 'Gun / rifle', youth: 'Youth and special hunts', other: 'Other' };

/** Sunday closed for this state and species (Maine for all hunting; Pennsylvania for migratory birds). */
export const sundayClosed = (st: State, sp: Species) => !!st.noSunday || (sp === 'duck' && !!st.duckNoSunday);

export const coversDate = (s: Season, iso: string) => s.r.some(([a, b]) => a <= iso && iso <= b);
export const totalDays = (s: Season) => s.r.reduce((n, [a, b]) => n + daysBetween(a, b) + 1, 0);
export const firstStart = (ss: Season[]) => ss.flatMap((s) => s.r.map((r) => r[0])).sort()[0];
export const lastEnd = (ss: Season[]) => ss.flatMap((s) => s.r.map((r) => r[1])).sort().slice(-1)[0];

export interface Status {
  open: Season[];
  /** A date inside a season but on a closed Sunday. */
  sundayOnly: boolean;
  /** Next start strictly after the date, with its season. */
  next: { season: Season; start: string; inDays: number } | null;
  /** Last day of the periods open on that date (the latest one). */
  closesOn: string | null;
  first: string; last: string;
}
export function statusOn(st: State, sp: Species, iso: string, method: Method | 'any' = 'any'): Status {
  const all = seasonsOf(st, sp).filter((s) => method === 'any' || methodOf(s) === method);
  const covering = all.filter((s) => coversDate(s, iso));
  const sun = sundayClosed(st, sp) && isSunday(iso);
  const open = sun ? [] : covering;
  const starts = all.flatMap((s) => s.r.filter((r) => r[0] > iso).map((r) => ({ season: s, start: r[0] }))).sort((a, b) => a.start.localeCompare(b.start));
  const nx = starts[0];
  const ends = covering.flatMap((s) => s.r.filter(([a, b]) => a <= iso && iso <= b).map((r) => r[1])).sort();
  return {
    open, sundayOnly: sun && covering.length > 0,
    next: nx ? { ...nx, inDays: daysBetween(iso, nx.start) } : null,
    closesOn: ends.length ? ends[ends.length - 1] : null,
    first: all.length ? firstStart(all) : '', last: all.length ? lastEnd(all) : '',
  };
}

/** Earliest opening of each method in a state (for the cross-state tables). */
export function openerOf(st: State, sp: Species, method: Method): { season: Season; start: string } | null {
  const c = seasonsOf(st, sp).filter((s) => methodOf(s) === method).flatMap((s) => s.r.map((r) => ({ season: s, start: r[0] }))).sort((a, b) => a.start.localeCompare(b.start));
  return c[0] ?? null;
}
/** The headline firearm deer season of a state: the one most hunters mean by "deer season". */
export function mainGun(st: State): Season {
  return st.deer.find((s) => s.main) ?? st.deer.find((s) => methodOf(s) === 'gun') ?? st.deer[0];
}

/** Number of calendar days on which at least one period of that species is open (Sundays removed where closed). */
export function openDays(st: State, sp: Species): number {
  const ss = seasonsOf(st, sp);
  if (!ss.length) return 0;
  let n = 0;
  for (let d = firstStart(ss); d <= lastEnd(ss); d = addDays(d, 1)) if (ss.some((s) => coversDate(s, d)) && !(sundayClosed(st, sp) && isSunday(d))) n += 1;
  return n;
}

/* ---------- licenses ---------- */
export type Residency = 'res' | 'non';
export interface Cost { total: number | null; items: Array<[string, number]>; missing: string[] }
/** What an adult pays the state for one deer hunt (base license + deer license or tag), or for an annual fishing license. */
export function licenseCost(st: State, who: Residency, what: 'deer' | 'fish'): Cost {
  const L = st.lic;
  if (!L) return { total: null, items: [], missing: ['no license prices read for this state'] };
  const parts: Array<[string, Fee | null]> = what === 'fish' ? [['Fishing license', L.fish]] : [['Base hunting license', L.base], ['Deer license or tag', L.deer]];
  const items: Array<[string, number]> = [], missing: string[] = [];
  for (const [k, f] of parts) {
    if (!f) { if (what === 'fish' || k === 'Deer license or tag') missing.push(k); continue; }
    const p = f[who];
    if (p === null) missing.push(k); else items.push([`${k}: ${f.t}`, p]);
  }
  const total = missing.length ? null : items.reduce((n, [, p]) => n + p, 0);
  return { total, items, missing };
}
export const STATES_LIC = STATES.filter((s) => s.lic);
export const STATES_FISH = STATES.filter((s) => s.lic?.fish);

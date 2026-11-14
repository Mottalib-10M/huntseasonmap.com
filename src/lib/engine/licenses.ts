/**
 * License engine for the 50 states. Every price comes from src/data/licenses.json: the license fee pages and
 * regulation guides of the state wildlife agencies, read with a plain reader on 2026-11-14. A state whose site refused
 * the reader keeps its agency and store link, with prices marked "to check". Pure functions, no clock.
 */
import D from '../../data/licenses.json';

export interface LFee { res: number | null; non: number | null; t: string }
export interface LState {
  code: string; name: string; agency: string; short: string;
  status: 'read' | 'partial' | 'blocked'; reason?: string | null;
  buy: { t: string; u: string } | null;
  hunt: LFee | null; combo: LFee | null; fish: LFee | null; deer: LFee | null;
  tag: string | null; online: string | null;
  /** Other licenses and tags of the agency, for the single-state pages (Washington, New York). */
  more?: Array<{ t: string; res: number | null; non: number | null }>;
  /** Hunter education rule as printed (single-state pages). */
  he?: string;
  src: Array<{ t: string; u: string }>;
}
export type Who = 'res' | 'non';

export const LREAD: string = (D as { read: string }).read;
export const LSTATES: LState[] = ((D as unknown as { states: LState[] }).states).slice().sort((a, b) => a.name.localeCompare(b.name));
export const lByCode = (code: string): LState => {
  const s = LSTATES.find((x) => x.code === code);
  if (!s) throw new Error(`Unknown license state ${code}`);
  return s;
};
/** A price of one residency, or null when not printed or not read. */
export const price = (f: LFee | null | undefined, who: Who): number | null => (f ? f[who] : null);
/** States with a price of that kind for that residency, cheapest first. */
export function ranked(kind: 'hunt' | 'combo' | 'fish' | 'deer', who: Who): Array<{ s: LState; p: number }> {
  return LSTATES.map((s) => ({ s, p: price(s[kind], who) })).filter((x): x is { s: LState; p: number } => x.p !== null).sort((a, b) => a.p - b.p || a.s.name.localeCompare(b.s.name));
}
/** Hunting and fishing bought apart versus the combination license, when all three prices were read. */
export function comboSaving(s: LState, who: Who): { apart: number; combo: number; saving: number } | null {
  const h = price(s.hunt, who), f = price(s.fish, who), c = price(s.combo, who);
  if (h === null || f === null || c === null) return null;
  return { apart: h + f, combo: c, saving: Math.round((h + f - c) * 100) / 100 };
}
export const READ_STATES = LSTATES.filter((s) => s.status !== 'blocked');
export const BLOCKED_STATES = LSTATES.filter((s) => s.status === 'blocked');

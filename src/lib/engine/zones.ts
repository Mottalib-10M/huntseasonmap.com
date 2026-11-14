/**
 * Deer zones of the states whose calendar differs inside the state (naive testers, 2026-11-14, second round: a large
 * "Open" or "Closed" read as a statewide answer when it held for Alabama Zone A or Arkansas Zone 1 only).
 * Every zone below is named on the agency pages already cited (src/data/seasons.json: the area of each period, and
 * the deer note: "Alabama has five deer zones (A to E) plus a management zone for chronic wasting disease", "Arkansas
 * has 17 deer zones", "Louisiana has ten deer areas", "The Southeast unit follows the same gun calendar"). A zone
 * listed with no period of a method means: dates not read for it, never "closed".
 */
import type { Method, Season, State } from './seasons';

export interface Zone { id: string; label: string; /** In a list ("Zones B, C, D, E and ..."). */ short?: string; /** After "Open for gun hunters": "in Zone A" (default), "on private land". */ where?: string }
export interface ZoneSet {
  /** Label of the field ("Your zone", "Where you hunt"). */
  field: string;
  /** Plural noun of the summary ("Open in 3 of 5 zones"), with its preposition. */
  noun: string; prep?: 'in' | 'on';
  zones: Zone[];
  /** Zones a period applies to, from its area; 'all' for a statewide period. */
  of: (s: Season, method: Method) => string[] | 'all';
}
type AreaMap = Record<string, string[]>;
const byArea = (m: AreaMap) => (s: Season): string[] | 'all' => m[s.a] ?? 'all';

export const ZONES: Record<string, ZoneSet> = {
  AL: {
    field: 'Your zone', noun: 'zones',
    zones: [
      { id: 'A', label: 'Zone A' }, { id: 'B', label: 'Zone B' }, { id: 'C', label: 'Zone C' }, { id: 'D', label: 'Zone D' },
      { id: 'E', label: 'Zone E' }, { id: 'CWD', label: 'Chronic wasting disease (CWD) zone', short: 'the CWD zone' },
    ],
    of: byArea({
      'Zone A': ['A'], 'Zone A, where allowed': ['A'],
      'Zones A, B, C and the chronic wasting disease (CWD) zone': ['A', 'B', 'C', 'CWD'],
    }),
  },
  AR: {
    field: 'Your zone', noun: 'zones',
    zones: [{ id: '1', label: 'Zone 1' }, { id: 'x', label: 'Another of the 17 zones', short: 'the other 16 zones', where: 'in the other 16 zones' }],
    of: byArea({ 'Zone 1': ['1'] }),
  },
  CO: {
    field: 'Your area', noun: 'areas',
    zones: [{ id: 'W', label: 'West of Interstate 25 (mountains)', where: 'west of Interstate 25' }, { id: 'E', label: 'East of Interstate 25 (plains)', where: 'east of Interstate 25' }],
    of: byArea({
      'West of Interstate 25 and unit 140': ['W'], 'West of Interstate 25': ['W'], 'Select high-country units': ['W'],
      'East of Interstate 25, most plains units': ['E'], 'East of Interstate 25': ['E'], 'East of Interstate 25, where offered': ['E'],
    }),
  },
  CT: {
    field: 'Where you hunt', noun: 'kinds of land', prep: 'on',
    zones: [{ id: 'P', label: 'Private land', where: 'on private land' }, { id: 'S', label: 'State land', where: 'on state land' }],
    of: byArea({ 'Private land, all zones': ['P'], 'Private land': ['P'], 'State land': ['S'] }),
  },
  LA: {
    field: 'Your area', noun: 'areas',
    zones: [{ id: '1', label: 'Area 1' }, { id: '2', label: 'Area 2' }, { id: '3', label: 'Area 3' }, { id: 'x', label: 'Another of the ten areas', short: 'the other seven areas', where: 'in the other seven areas' }],
    of: byArea({ 'Area 1': ['1'], 'Area 2': ['2'], 'Area 3': ['3'], 'Areas 1 and 2': ['1', '2'] }),
  },
  MS: {
    field: 'Your unit', noun: 'units',
    zones: [{ id: 'D', label: 'Delta, North Central or Hills unit', where: 'in the Delta, North Central and Hills units' }, { id: 'S', label: 'Southeast unit', where: 'in the Southeast unit' }],
    // "The Southeast unit follows the same gun calendar" (deer note): the gun periods printed for the other units hold there too.
    of: (s, m) => (s.a === 'Delta, North Central and Hills units' ? (m === 'gun' ? ['D', 'S'] : ['D']) : s.a === 'Southeast unit' ? ['S'] : 'all'),
  },
  NC: {
    field: 'Your zone', noun: 'zones',
    zones: [
      { id: 'NE', label: 'Northeastern zone' }, { id: 'SE', label: 'Southeastern zone' }, { id: 'C', label: 'Central zone' },
      { id: 'NW', label: 'Northwestern zone' }, { id: 'W', label: 'Western zone' },
    ],
    of: byArea({ 'Northeastern and Southeastern zones': ['NE', 'SE'], 'Central zone': ['C'], 'Northwestern zone': ['NW'], 'Western zone': ['W'] }),
  },
  PA: {
    field: 'Your unit', noun: 'groups of units',
    zones: [{ id: 'R', label: 'Most wildlife management units', where: 'in most units' }, { id: 'S', label: 'Units 2B, 5C or 5D', where: 'in units 2B, 5C and 5D' }],
    // Statewide archery is replaced by the units' own archery dates in 2B, 5C and 5D.
    of: (s, m) => (s.a.includes('2B, 5C and 5D') ? ['S'] : m === 'archery' && s.a === 'Statewide' ? ['R'] : 'all'),
  },
  SD: {
    field: 'Your area', noun: 'areas',
    zones: [{ id: 'BH', label: 'Black Hills', where: 'in the Black Hills' }, { id: 'WR', label: 'West River', where: 'West River' }, { id: 'ER', label: 'East River', where: 'East River' }],
    of: byArea({ 'Black Hills': ['BH'], 'West River units': ['WR'], 'East River units': ['ER'] }),
  },
  TX: {
    field: 'Your zone', noun: 'zones',
    zones: [{ id: 'N', label: 'North Zone', where: 'in the North Zone' }, { id: 'S', label: 'South Zone', where: 'in the South Zone' }],
    of: byArea({ 'North Zone': ['N'], 'South Zone': ['S'] }),
  },
  VA: {
    field: 'Your part of the state', noun: 'parts of the state',
    zones: [{ id: 'W', label: 'Western counties', where: 'in the western counties' }, { id: 'E', label: 'Eastern counties', where: 'in the eastern counties' }],
    of: byArea({
      'Western counties such as Augusta, Rockbridge, Smyth and Washington': ['W'], 'West of the Blue Ridge': ['W'],
      'Eastern counties such as Caroline, Amelia, Cumberland and Gloucester': ['E'],
    }),
  },
};

export const zonesOf = (st: State): ZoneSet | null => ZONES[st.code] ?? null;
export const zoneOf = (st: State, id: string): Zone | null => zonesOf(st)?.zones.find((z) => z.id === id) ?? null;
/** "in Zone A", "on private land". */
export const whereOf = (z: Zone) => z.where ?? `in ${z.label}`;
/** Every zone id of every state, for reading a shared link (the options of the state are checked after). */
export const ALL_ZONE_IDS = [...new Set(Object.values(ZONES).flatMap((Z) => Z.zones.map((z) => z.id)))];
/** Does that period apply in that zone? */
export function inZone(st: State, s: Season, method: Method, zone: string): boolean {
  const Z = zonesOf(st);
  if (!Z || zone === 'all' || !zone) return true;
  const o = Z.of(s, method);
  return o === 'all' || o.includes(zone);
}
/** "Zones B, C, D, E and the CWD zone" / "the other 16 zones". */
export function zoneList(zs: Zone[]): string {
  const plain = zs.filter((z) => !z.short && /^Zone [A-Z0-9]+$/.test(z.label)).map((z) => z.label.slice(5));
  const rest = zs.filter((z) => !(!z.short && /^Zone [A-Z0-9]+$/.test(z.label))).map((z) => z.short ?? z.label);
  const parts = [...(plain.length ? [plain.length === 1 ? `Zone ${plain[0]}` : `Zones ${plain.join(', ')}`] : []), ...rest];
  return parts.length <= 1 ? (parts[0] ?? '') : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
}

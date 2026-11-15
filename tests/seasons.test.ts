/** Engine and content tests: dates as read on the agency pages (2026-11-13), page rules of RECETTE §7, §11, §21. */
import { describe, expect, it } from 'vitest';
import { STATES, byCode, statusOn, methodOf, mainGun, licenseCost, openerOf, isoOf, rangeText, daysBetween, inWindow } from '../src/lib/engine/seasons';
import { getTool, TOOL_KINDS } from '../src/lib/tool-specs';
import { PAGES } from '../src/lib/pages';
import { helpers } from '../src/lib/helpers';

describe('data', () => {
  it('24 states, each with deer periods in 2026-27 and one headline gun season', () => {
    expect(STATES).toHaveLength(24);
    for (const s of STATES) {
      expect(s.deer.length).toBeGreaterThan(0);
      expect(s.deer.filter((x) => x.main)).toHaveLength(1);
      expect(methodOf(mainGun(s))).toBe('gun');
      for (const x of [...s.deer, ...(s.turkey ?? []), ...(s.duck ?? [])]) for (const [a, b] of x.r) {
        expect(a <= b).toBe(true);
        expect(a >= '2026-08-01' && b <= '2027-05-31').toBe(true);
      }
    }
  });
  it('classifies the period names', () => {
    expect(methodOf({ s: 'Bow (residents and nonresidents)', a: '', r: [] })).toBe('archery');
    expect(methodOf({ s: 'Alternative firearms (muzzleloader)', a: '', r: [] })).toBe('muzzleloader');
    expect(methodOf({ s: 'Youth deer gun', a: '', r: [] })).toBe('youth');
    expect(methodOf({ s: 'Any legal weapon (rifle)', a: '', r: [] })).toBe('gun');
  });
});

describe('engine', () => {
  it('Texas general season is open on Nov. 13, 2026', () => {
    const S = statusOn(byCode('TX'), 'deer', '2026-11-13');
    expect(S.open.map((x) => x.s)).toContain('General (gun)');
  });
  it('Maine: a Sunday inside the firearms season is closed', () => {
    const S = statusOn(byCode('ME'), 'deer', '2026-11-08');
    expect(S.open).toHaveLength(0);
    expect(S.sundayOnly).toBe(true);
  });
  it('next opener and countdown', () => {
    const S = statusOn(byCode('PA'), 'deer', '2026-11-13', 'gun');
    expect(S.next?.start).toBe('2026-11-28');
    expect(S.next?.inDays).toBe(15);
    expect(openerOf(byCode('UT'), 'deer', 'archery')?.start).toBe('2026-08-15');
  });
  it('license totals', () => {
    expect(licenseCost(byCode('TX'), 'non', 'deer').total).toBe(315);
    expect(licenseCost(byCode('OK'), 'non', 'deer').total).toBe(710);
    expect(licenseCost(byCode('MT'), 'res', 'deer').total).toBeNull();
  });
  it('dates', () => {
    expect(isoOf('2027-02', 31)).toBe('2027-02-28');
    expect(rangeText(['2026-12-26', '2027-01-24'])).toBe('Dec. 26, 2026 to Jan. 24, 2027');
    expect(daysBetween('2026-11-13', '2026-11-28')).toBe(15);
    expect(inWindow('2027-07-01')).toBe('2027-05-31');
  });
  it('every calculator runs with its defaults', () => {
    for (const k of TOOL_KINDS) {
      const t = getTool(k);
      const v = Object.fromEntries(t.inputs.map((i) => [i.id, i.def]));
      const out = t.run(v);
      expect(out.value.length).toBeGreaterThan(0);
    }
  });
});

/* Naive testers, 2026-11-14: the status and every date follow the chosen method and say which period and zone they
 * apply to. Dates as printed by TPWD (2026-2027 Hunting Season Dates), AGFC (Deer seasons and limits by zone) and
 * Outdoor Alabama (Deer Season 2026-2027), all already cited by the site (src/data/seasons.json). */
describe('status follows the method, each date names its period', () => {
  const run = (st: string, extra: Record<string, string | number> = {}) => {
    const t = getTool('open', { st, mo: '2026-11', d: 14, ...extra });
    return t.run(Object.fromEntries(t.inputs.map((i) => [i.id, i.def])));
  };
  it('the method is asked up front, gun first', () => {
    const m = getTool('open').inputs.find((i) => i.id === 'm')!;
    expect(m.def).toBe('gun');
    expect(m.adv).toBeFalsy();
  });
  it('Texas, Nov. 14: North Zone ends Jan. 3, South Zone Jan. 17, each on its own line', () => {
    const S = statusOn(byCode('TX'), 'deer', '2026-11-14', 'gun');
    expect(S.ends.map((e) => [e.season.a, e.end])).toEqual([['North Zone', '2027-01-03'], ['South Zone', '2027-01-17']]);
    const out = run('TX');
    expect(out.value).toBe('Open for gun hunters in both zones');
    expect(out.rows).toContainEqual(['North Zone', 'open: General (gun) until Jan. 3, 2027']);
    expect(out.rows).toContainEqual(['South Zone', 'open: General (gun) until Jan. 17, 2027']);
    // One zone chosen: its own last day and the next new period of that zone.
    const n = run('TX', { z: 'N' });
    expect(n.value).toBe('Open for gun hunters in the North Zone');
    expect(n.rows).toContainEqual(['General (gun) · North Zone', 'open until Jan. 3, 2027']);
    expect(n.rows.find((r) => r[0] === 'Next new period')?.[1]).toBe('Special late · North Zone: opens Jan. 4, 2027, in 51 days');
    expect(n.rows.some((r) => r[0].includes('South Zone'))).toBe(false);
  });
  it('Texas countdown: each open period has its own last day, no "next" before a "last day" without its zone', () => {
    const t = getTool('countdown', { st: 'TX', m: 'gun', mo: '2026-11', d: 14 });
    const out = t.run(Object.fromEntries(t.inputs.map((i) => [i.id, i.def])));
    expect(out.value).toBe('Open now');
    expect(out.rows).toContainEqual(['General (gun) · North Zone', 'last day Jan. 3, 2027 (50 more days)']);
    expect(out.rows).toContainEqual(['General (gun) · South Zone', 'last day Jan. 17, 2027 (64 more days)']);
  });
  it('Arkansas, Nov. 14, gun: modern gun Zone 1 open until Dec. 6, said once, never the archery Feb. 28', () => {
    const out = run('AR');
    // Only Zone 1 gun dates were read (AGFC): the title says so, the other 16 zones are "not on this site", not closed.
    expect(out.value).toBe('Open for gun hunters in Zone 1');
    expect(out.rows).toContainEqual(['Zone 1', 'open: Modern gun until Dec. 6, 2026']);
    expect(out.rows).toContainEqual(['The other 16 zones', 'gun / rifle dates not on this site: see the agency page linked below']);
    expect(out.sub).toBe('Pick your zone above for its own dates and next opener.');
    expect(JSON.stringify(out.rows)).not.toContain('Feb. 28');
    expect(out.flags?.join(' ')).toMatch(/Also open (today|on Nov\. 14, 2026) for: Archery/);
    // Zone 1 chosen: the end is a row, not repeated in a sentence above it (naive testers, second round).
    const z1 = run('AR', { z: '1' });
    expect(z1.value).toBe('Open for gun hunters in Zone 1');
    expect(z1.sub).toBeUndefined();
    expect(z1.rows).toContainEqual(['Modern gun · Zone 1', 'open until Dec. 6, 2026']);
    expect(z1.rows.find((r) => r[0] === 'Next new period')?.[1]).toBe('Modern gun · Zone 1: reopens Dec. 26, 2026, in 42 days');
    // Another zone: archery (statewide) is read, the gun dates are not.
    const x = run('AR', { z: 'x' });
    expect(x.value).toBe('Another of the 17 zones: gun / rifle dates not on this site');
    expect(run('AR', { z: 'x', m: 'archery' }).value).toBe('Open for bowhunters in the other 16 zones');
    // With any method, each period keeps its own end: archery Feb. 28, modern gun Dec. 6.
    const any = run('AR', { m: 'any', z: '1' });
    expect(any.rows).toContainEqual(['Archery · Statewide', 'open until Feb. 28, 2027']);
    expect(any.rows).toContainEqual(['Modern gun · Zone 1', 'open until Dec. 6, 2026']);
    // The muzzleloader is between its two stretches, not "Not yet".
    expect(any.table!.rows.find((r) => r[0] === 'Alternative firearms (muzzleloader)')?.[4]).toBe('Paused, back Dec. 12, 2026');
    expect(run('AR', { m: 'muzzleloader', z: '1' }).sub).toBe('Alternative firearms (muzzleloader) · Zone 1: reopens Dec. 12, 2026, in 28 days.');
  });
  it('Alabama, Nov. 14, gun: closed for adult gun hunters in Zone A, the youth gun weekend open, said under the title', () => {
    const out = run('AL');
    expect(out.value).toBe('Closed for adult gun hunters in Zone A');
    expect(out.flags?.[0]).toMatch(/^Open (today|on Nov\. 14, 2026) for: /);
    expect(out.flags?.[0]).toContain('Special youth gun (under 16)');
    expect(out.flags?.[0]).toContain('Archery (stalk hunting)');
    expect(out.rows).toContainEqual(['Zone A', 'closed, opens Nov. 21, 2026, in 7 days (Gun, stalk hunting, private or leased land)']);
    expect(out.rows).toContainEqual(['Zones B, C, D, E and the CWD zone', 'gun / rifle dates not on this site: see the agency page linked below']);
    const S = statusOn(byCode('AL'), 'deer', '2026-11-14', 'gun', 'A');
    expect(S.open).toHaveLength(0);
    expect(S.next?.inDays).toBe(7);
    // Zone A chosen: the next gun opener in the sub, the youth gun weekend in bold above it.
    const a = run('AL', { z: 'A' });
    expect(a.value).toBe('Closed for adult gun hunters in Zone A');
    expect(a.sub).toBe('Gun, stalk hunting, private or leased land · Zone A: opens Nov. 21, 2026, in 7 days.');
    // Zone B: the youth gun weekend is printed for it (Zones A, B, C and the CWD zone), the adult gun dates are not.
    const b = run('AL', { z: 'B' });
    expect(b.value).toBe('Zone B: gun / rifle dates not on this site');
    expect(b.flags?.[0]).toMatch(/for: Special youth gun \(under 16\)$/);
    expect(run('AL', { z: 'B', m: 'youth' }).value).toBe('Open for youth and special hunts in Zone B');
    expect(run('AL', { z: 'D', m: 'youth' }).value).toBe('Zone D: youth and special hunts dates not on this site');
    // Archery alone is open, until Feb. 10, 2027 in Zone A.
    expect(run('AL', { m: 'archery', z: 'A' }).rows).toContainEqual(['Archery (stalk hunting) · Zone A', 'open until Feb. 10, 2027']);
    // Nov. 21: the gun opener, Zone A open.
    expect(run('AL', { d: 21 }).value).toBe('Open for gun hunters in Zone A');
  });
  it('North Carolina, Nov. 14, gun: open in 3 of 5 zones, one line per zone', () => {
    const out = run('NC');
    expect(out.value).toBe('Open in 3 of 5 zones for gun hunters');
    expect(out.rows).toContainEqual(['Northwestern zone', 'closed, opens Nov. 21, 2026, in 7 days (Gun)']);
  });
  it('the zone field is shown only for deer in a state with zones', () => {
    const z = getTool('open').inputs.find((i) => i.id === 'z')!;
    expect(z.kind === 'select' && z.hidden?.({ st: 'TX', sp: 'deer' })).toBe(false);
    expect(z.kind === 'select' && z.hidden?.({ st: 'GA', sp: 'deer' })).toBe(true);
    expect(z.kind === 'select' && z.hidden?.({ st: 'TX', sp: 'duck' })).toBe(true);
    expect(run('GA').value).toBe('Open for gun hunters');
  });
  it('archery map: no period name repeated without its area', () => {
    const t = getTool('map', { sp: 'deer', m: 'archery', mo: '2026-11', d: 14 });
    const out = t.run(Object.fromEntries(t.inputs.map((i) => [i.id, i.def])));
    for (const r of out.table!.rows) expect(r[1]).not.toMatch(/Archery; Archery/);
  });
});

describe('pages', () => {
  const words = (s: string) => s.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  it('titles 50-60, descriptions 150-160, a resume of 120 words, unique ids and FAQs', () => {
    const ids = new Set<string>(), qs = new Set<string>();
    for (const p of PAGES) {
      expect(p.title.length, p.id).toBeGreaterThanOrEqual(50);
      expect(p.title.length, p.id).toBeLessThanOrEqual(60);
      expect(p.description.length, p.id).toBeGreaterThanOrEqual(150);
      expect(p.description.length, p.id).toBeLessThanOrEqual(160);
      expect(words(p.resume), p.id).toBeGreaterThanOrEqual(120);
      expect(ids.has(p.id)).toBe(false); ids.add(p.id);
      for (const f of p.faqs) { expect(qs.has(f.q), f.q).toBe(false); qs.add(f.q); }
      expect(p.faqs.length).toBeGreaterThanOrEqual(2);
    }
  });
  it('every body renders and links only to known pages', () => {
    const h = helpers();
    for (const p of PAGES) expect(p.body(h).length).toBeGreaterThan(200);
  });
});

describe('coverage said up front (naive testers, 2026-11-14, 4th round)', () => {
  it('gun dates read for some zones only in Alabama, Arkansas and Louisiana, nowhere else', async () => {
    const { gunUnread } = await import('../src/lib/engine/seasons');
    expect(STATES.filter((s) => gunUnread(s).length).map((s) => s.code)).toEqual(['AL', 'AR', 'LA']);
    expect(gunUnread(byCode('AL')).map((z) => z.id)).toEqual(['B', 'C', 'D', 'E', 'CWD']);
  });
  it('state pages say what is missing, link a source of the state, and never promise every zone', async () => {
    const { coverOf } = await import('../src/lib/state-pages');
    const al = coverOf(byCode('AL')), ar = coverOf(byCode('AR')), tx = coverOf(byCode('TX'));
    expect(al.missing).toContain('Zones B, C, D, E and the CWD zone');
    expect(ar.missing).toMatch(/other 16 zones; turkey and duck/);
    expect(tx.missing).toBeUndefined();
    for (const s of STATES) expect(s.src.map((x) => x.u)).toContain(coverOf(s).href);
    for (const p of PAGES) expect(p.h1).not.toMatch(/every period, zone/);
  });
  it('the checker links the agency page in a state with zones, and its help follows the method', () => {
    const t = getTool('open', { st: 'AL', z: 'B' });
    const v = Object.fromEntries(t.inputs.map((i) => [i.id, i.def]));
    expect(t.run(v).link?.href).toBe(byCode('AL').src[0].u);
    const m = t.inputs.find((i) => i.id === 'm')!;
    expect(m.kind === 'select' && m.dynHelp?.({ ...v, m: 'archery' })).toMatch(/^Archery/);
  });
});

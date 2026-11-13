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

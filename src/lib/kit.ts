/**
 * Writing kit: every figure written in a page comes from here, never typed by hand.
 *   K.S(code), K.STATES        one state's seasons, all states (src/data/seasons.json, read on the agency pages on 2026-11-13)
 *   K.opener, K.mainGun, K.status, K.openDays, K.cost   engine (lib/engine/seasons.ts)
 *   K.P                        federal rules (params-2026.json: duck stamp, HIP)
 *   K.EX                       the one example case of the whole site
 *   formats                    K.num, K.day("2026-11-13"), K.d("2026-11-13") = "Nov. 13, 2026", K.range(season), K.usd
 */
import P from '../data/params-2026.json';
import { EX, longDate } from './tool-specs';
import { formatMoney, formatNumber } from './format';
import * as E from './engine/seasons';

export const KIT = {
  P, EX, READ: E.READ, STATES: E.STATES, S: E.byCode, LIC: E.STATES_LIC, with: E.statesWith,
  opener: E.openerOf, mainGun: E.mainGun, status: E.statusOn, openDays: E.openDays, cost: E.licenseCost, method: E.methodOf,
  seasons: E.seasonsOf, range: E.rangesText, first: E.firstStart, last: E.lastEnd, between: E.daysBetween,
  num: (x: number) => formatNumber(x, 0), day: longDate, d: E.dayText,
  usd: (x: number) => formatMoney(x, Number.isInteger(x) ? 0 : 2),
};
export type Kit = typeof KIT;

import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { lByCode, LREAD, ranked } from '../../lib/engine/licenses';

const W = lByCode('WA');
const more = W.more ?? [];
const m = (t: string) => { const x = more.find((y) => y.t === t); if (!x) throw new Error(`WA: ${t}`); return x; };
const deer = m('Deer License'), de = m('Deer + Elk License'), all4 = m('Deer + Elk + Bear + Cougar License'), turkey = m('Turkey Tag'), app = m('Special Hunt Permit Application');
const sg = W.hunt!, fish = W.fish!;
const rankNon = ranked('hunt', 'non').findIndex((x) => x.s.code === 'WA') + 1, nNon = ranked('hunt', 'non').length;
const c = (x: number | null) => (x === null ? 'not sold' : K.usd(x));

export default definePage({
  id: 'washington-hunting-license', group: 'licenses', order: 53, slug: 'washington-hunting-license',
  nav: 'Washington hunting license', card: 'WDFW small game, deer, elk and package licenses for residents and nonresidents, and where to buy them.',
  title: 'Washington Hunting License 2026: WDFW Fees and Packages',
  description: 'Washington hunting license fees 2026-27 from WDFW: small game, deer, elk, bear, cougar licenses and packages for residents and nonresidents, and where to buy.',
  h1: 'Washington hunting license: 2026 WDFW fees and packages',
  intro: `A Washington hunting license for deer costs a resident ${K.usd(deer.res!)} and a nonresident ${K.usd(deer.non!)}, as printed by WDFW; small game is ${K.usd(sg.res!)} and ${K.usd(sg.non!)}. Pick your residency to compare.`,
  resume: `The Washington Department of Fish and Wildlife (WDFW) sells hunting licenses by species rather than as one base license plus tags. A deer hunter buys the Deer License, ${K.usd(deer.res!)} for a resident and ${K.usd(deer.non!)} for a nonresident, which carries the deer tag; an elk hunter buys the Elk License; and packages combine species, such as Deer + Elk at ${K.usd(de.res!)} (resident) or ${K.usd(de.non!)} (nonresident), and Deer + Elk + Bear + Cougar at ${K.usd(all4.res!)} or ${K.usd(all4.non!)}. Small game is a separate annual license: ${K.usd(sg.res!)} for residents and ${K.usd(sg.non!)} for nonresidents, the ${rankNon}${rankNon === 1 ? 'st' : rankNon === 2 ? 'nd' : rankNon === 3 ? 'rd' : 'th'} lowest nonresident base license of the ${nNon} states priced on this site. Special hunts are drawn, with an application fee. Prices were read on the WDFW license pages on ${K.day(LREAD)}, before dealer fees. ${W.he ?? ''}`,
  faqs: [
    { q: 'How much is a Washington hunting license for deer?', open: true, a: `The WDFW Deer License costs ${K.usd(deer.res!)} for a resident and ${K.usd(deer.non!)} for a nonresident, read on ${K.day(LREAD)}. A version with a discounted small game license is also sold. Special deer permits are drawn and need an application. A Deer + Elk package costs less than the two licenses bought apart, and small game is a separate license.` },
    { q: 'Where do I buy a Washington hunting license?', a: `${W.online ?? 'Through WDFW.'} The WDFW license pages link the online store. The prices on this page are the WDFW license fees; dealer or online transaction fees, if any, are not included. Nonresidents buy through the same store and dealers as residents.` },
    { q: 'Do I need hunter education to hunt in Washington?', a: `${W.he ?? 'Check the WDFW license page.'} WDFW explains the deferral and the hunter education courses on its hunting license page. Hunters born on or before that date can buy a license without showing a course certificate.` },
  ],
  body: (h) => `
<h2>Washington hunting license fees, resident and nonresident</h2>
${h.table(['License or tag', 'Resident', 'Nonresident'], [[`Small game: ${sg.t}`, c(sg.res), c(sg.non)], ...more.map((x) => [x.t, c(x.res), c(x.non)]), [`Get Outdoors package: ${W.combo?.t ?? ''}`, c(W.combo?.res ?? null), c(W.combo?.non ?? null)], [`Fishing: ${fish.t}`, c(fish.res), c(fish.non)]], `WDFW hunting licenses and tags, adult prices read on ${K.day(LREAD)}`, ['l', 'r', 'r'])}
<h2>Single license, package or Get Outdoors?</h2>
<p>A hunter who wants deer and elk saves with the Deer + Elk package rather than the two licenses apart. Residents who also fish can buy the Get Outdoors package, which adds the fishing license and the bear and cougar tags. Turkey hunters add a turkey tag, ${K.usd(turkey.res!)} resident and ${K.usd(turkey.non!)} nonresident; special hunts for deer, elk and turkey cost ${K.usd(app.res!)} per application for a resident.</p>
${h.mini('combo', { t: 'Washington: hunting and fishing apart or bundled', p: ['who'], d: { st: 'WA' } })}
<h2>Washington next to other states</h2>
<p>Every state with a price read is on the ${h.a('hunting-license', 'hunting license by state')} page, and the deer licenses side by side are on the ${h.a('hunting-tags', 'hunting tags page')}. Washington season dates were not readable for this site; they are printed in the WDFW hunting regulations.</p>
`,
  tool: 'buy', toolArg: { st: 'WA' },
  related: ['hunting-license', 'hunting-tags', 'nysdec-hunting-license', 'hunting-and-fishing-license'],
  sources: ['lj_WA_0', 'lj_WA_1', 'lj_WA_2', 'lj_WA_3', 'buy_WA'],
});

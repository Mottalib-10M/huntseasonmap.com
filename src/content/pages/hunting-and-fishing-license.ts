import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { LSTATES, LREAD, ranked, price, comboSaving } from '../../lib/engine/licenses';

const combos = LSTATES.filter((s) => s.combo);
const cr = ranked('combo', 'res'), cn = ranked('combo', 'non');
const sav = LSTATES.map((s) => ({ s, c: comboSaving(s, 'res') })).filter((x) => x.c).sort((a, b) => b.c!.saving - a.c!.saving);
const saves = sav.filter((x) => x.c!.saving > 0);
const fish = ranked('fish', 'res');
const cell = (x: number | null) => (x === null ? 'not printed' : K.usd(x));

export default definePage({
  id: 'hunting-and-fishing-license', group: 'licenses', order: 52, slug: 'hunting-and-fishing-license',
  nav: 'Hunting and fishing license', card: 'The hunting and fishing combination license of each state, against the two licenses bought apart.',
  title: 'Hunting and Fishing License by State 2026: Combo Prices',
  description: 'Hunting and fishing license by state for 2026-27: combination and sportsman licenses for residents and nonresidents, and what they save against two licenses.',
  h1: 'Hunting and fishing license by state: combo or two licenses?',
  intro: `A hunting and fishing combination license is printed by ${combos.length} state agencies, from ${K.usd(cr[0].p)} for a resident of ${cr[0].s.name} to ${K.usd(cr[cr.length - 1].p)} in ${cr[cr.length - 1].s.name}. Pick your state to compare it with two licenses.`,
  resume: `Most states sell hunting and fishing licenses separately, and many also sell a combination, often called a sportsman, sports or combo license, that covers both for one price. We read the fee pages of the 50 state agencies on ${K.day(LREAD)}: ${combos.length} print a hunting and fishing combination, ${cr.length} of them for residents and ${cn.length} for nonresidents, since many reserve it to residents. Where the base hunting, the annual fishing and the combination prices were all printed, the combination saves a resident money in ${saves.length} of ${sav.length} states${saves.length ? `, most in ${saves[0].s.name} (${K.usd(saves[0].c!.saving)})` : ''}. In the others the combination costs more because it bundles big game tags or stamps the two base licenses leave out. An adult annual fishing license alone costs a resident from ${K.usd(fish[0].p)} (${fish[0].s.name}) to ${K.usd(fish[fish.length - 1].p)} (${fish[fish.length - 1].s.name}).`,
  faqs: [
    { q: 'Is a hunting and fishing combo license cheaper?', open: true, a: `Often, for residents. In ${saves.length} of the ${sav.length} states where all three prices were printed, the combination costs less than a hunting and a fishing license bought apart. Where it costs more, it includes extra items such as big game tags. The calculator compares both for your state.` },
    { q: 'Can a nonresident buy a hunting and fishing combination?', a: `In ${cn.length} states on the pages read on ${K.day(LREAD)}: ${cn.map((x) => x.s.name).join(', ') || 'none'}. Elsewhere a nonresident buys the two licenses apart. On the pages read, a nonresident annual fishing license costs much less than the nonresident hunting license almost everywhere, so the hunting side drives the bill; the calculator shows both for your state.` },
    { q: 'Where do I buy a hunting and fishing license?', a: 'On the license store of the state wildlife agency, or from its license agents, which most agencies list on their site. The hunting license by state page links the official store of each agency. Buying from the agency store gives the price printed by the agency; a vendor or processing fee may be added at the counter or online, and is not counted on this page.' },
  ],
  body: (h) => `
<h2>Hunting and fishing combination license by state</h2>
<p>As printed by each agency on ${K.day(LREAD)}, adult annual prices, before vendor fees.</p>
${h.table(['State', 'Resident', 'Nonresident', 'Combination license'], combos.map((s) => [s.name, cell(price(s.combo, 'res')), cell(price(s.combo, 'non')), s.combo!.t]), `Hunting and fishing combination licenses in ${combos.length} states, read on ${K.day(LREAD)}`, ['l', 'r', 'r', 'l'])}
<h2>Combination or two licenses: what a resident saves</h2>
${h.table(['State', 'Hunting + fishing apart', 'Combination', 'Saving'], sav.map((x) => [x.s.name, K.usd(x.c!.apart), K.usd(x.c!.combo), x.c!.saving >= 0 ? K.usd(x.c!.saving) : `costs ${K.usd(-x.c!.saving)} more`]), `Resident: combination against base hunting and annual fishing licenses, ${sav.length} states`, ['l', 'r', 'r', 'r'])}
${h.mini('buy', { t: 'Hunting license alone in your state', p: ['st', 'who'], d: { st: 'MN' } })}
<h2>Fishing license prices read on the same pages</h2>
<p>The annual adult fishing license appears beside the hunting fees on most agency pages. A nonresident fishing license costs much less than a nonresident hunting license almost everywhere: see the ${h.a('hunting-license', 'hunting license by state')} page for the hunting side and the ${h.a('hunting-tags', 'hunting tags page')} for deer.</p>
`,
  tool: 'combo',
  related: ['hunting-license', 'hunting-tags', 'hunting-license-cost-by-state', 'duck-season-by-state'],
  sources: combos.slice(0, 6).map((s) => `lj_${s.code}_0`),
});

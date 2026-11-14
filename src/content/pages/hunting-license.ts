import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { LSTATES, LREAD, READ_STATES, BLOCKED_STATES, ranked, price } from '../../lib/engine/licenses';

const res = ranked('hunt', 'res'), non = ranked('hunt', 'non');
const lo = res[0], hi = res[res.length - 1], nlo = non[0], nhi = non[non.length - 1];
const med = (a: number[]) => { const b = [...a].sort((x, y) => x - y); const m = Math.floor(b.length / 2); return b.length % 2 ? b[m] : (b[m - 1] + b[m]) / 2; };
const mRes = med(res.map((x) => x.p)), mNon = med(non.map((x) => x.p));
const both = LSTATES.filter((s) => price(s.hunt, 'res') !== null && price(s.hunt, 'non') !== null).map((s) => ({ s, r: price(s.hunt, 'non')! / price(s.hunt, 'res')! })).sort((a, b) => a.r - b.r);
const withStore = LSTATES.filter((s) => s.buy);
const cell = (x: number | null) => (x === null ? 'not printed' : K.usd(x));
const blockedNames = BLOCKED_STATES.map((s) => s.name).join(', ');

export default definePage({
  id: 'hunting-license', group: 'licenses', order: 50, slug: 'hunting-license',
  nav: 'Hunting license by state', card: 'The adult annual hunting license of all 50 states, resident and nonresident, with the official store of each agency.',
  title: 'Hunting License by State 2026: Prices and Where to Buy',
  description: `Hunting license prices for 2026-27 in all 50 states: the adult annual license for residents and nonresidents, and the official agency store to buy it online.`,
  h1: 'Hunting license by state: 2026 prices and where to buy',
  intro: `A hunting license for an adult resident costs from ${K.usd(lo.p)} in ${lo.s.name} to ${K.usd(hi.p)} in ${hi.s.name}, as printed by ${res.length} state agencies. Pick your state and residency to see the price and the official store.`,
  resume: `Every state sells its own hunting license through its fish and wildlife agency; no license from one state is valid in another, and there is no federal hunting license, only the federal duck stamp for waterfowl. We read the license fee pages and regulation guides of the 50 agencies on ${K.day(LREAD)} and kept the basic annual license an adult needs, as each agency names it. For residents, the ${res.length} prices printed run from ${K.usd(lo.p)} (${lo.s.name}) to ${K.usd(hi.p)} (${hi.s.name}), with a median of ${K.usd(mRes)}. Nonresidents pay from ${K.usd(nlo.p)} (${nlo.s.name}) to ${K.usd(nhi.p)} (${nhi.s.name}), median ${K.usd(mNon)}. In most states this base license is not enough for deer, elk or turkey: a species license or tag is added, sometimes through a draw. ${BLOCKED_STATES.length ? `${BLOCKED_STATES.length} agency sites refused our reader; their prices are marked to check, with the link to the official store.` : ''}`,
  faqs: [
    { q: 'Where do I buy a hunting license online?', open: true, a: `From the state wildlife agency, on its own license store: the table on this page links the official store of ${withStore.length} states. Most agencies also sell through sporting goods stores and other license agents, and some by phone. Buy from the agency store rather than a third-party site: the agency price is the one printed on this page, before any vendor or processing fee.` },
    { q: 'How much does a hunting license cost for a nonresident?', a: `From ${K.usd(nlo.p)} in ${nlo.s.name} to ${K.usd(nhi.p)} in ${nhi.s.name} for the base annual license, as printed on ${K.day(LREAD)}. Where both prices were printed, the nonresident pays ${both.length ? `${Math.round(both[0].r * 10) / 10} to ${Math.round(both[both.length - 1].r * 10) / 10}` : 'several'} times the resident price. Deer or elk tags for nonresidents often cost more than the license itself.` },
    { q: 'Is one hunting license valid in every state?', a: 'No. Each state issues its own license, valid only there. A hunter who crosses a state line buys a nonresident license in the second state. The one federal requirement is the duck stamp for waterfowl hunters 16 and older, sold by the U.S. Fish and Wildlife Service and the post office.' },
    { q: 'Do I need hunter education to buy a hunting license?', a: 'In most states, yes, for hunters born after a set date: the license store asks for a hunter education certificate number. The date and the exemptions, such as an apprentice or mentored license, differ by state and are printed on each agency page linked here.' },
  ],
  body: (h) => `
<h2>Hunting license by state: resident, nonresident and official store</h2>
<p>Adult annual license as printed by each agency on ${K.day(LREAD)}, before vendor or processing fees. "To check" marks an agency site that refused our reader: open its store for the price.</p>
${h.table(['State', 'Resident', 'Nonresident', 'License', 'Buy from'], LSTATES.map((s) => [s.name, s.status === 'blocked' ? 'to check' : cell(price(s.hunt, 'res')), s.status === 'blocked' ? 'to check' : cell(price(s.hunt, 'non')), s.hunt ? s.hunt.t : '-', s.buy ? h.src(`buy_${s.code}`, s.short) : '-']), `Adult annual hunting license in the 50 states, read on ${K.day(LREAD)}`, ['l', 'r', 'r', 'l', 'l'])}
<h2>What the base license covers, and what it does not</h2>
<p>The base license lets you hunt small game in most states. Deer, elk, bear, turkey and other big game usually need a species license or tag on top, priced on the ${h.a('hunting-tags', 'hunting tags page')}. Waterfowl hunters add the federal duck stamp (${h.src('usc_718b', '16 U.S.C. 718b')}) and state HIP registration. Hunters who also fish often save with a combination license: see ${h.a('hunting-and-fishing-license', 'hunting and fishing license by state')}.</p>
${h.mini('combo', { t: 'Is the hunting and fishing combination cheaper in your state?', p: ['st', 'who'], d: { st: 'NM' } })}
<h2>Buying online, by phone or at a store</h2>
<p>Every agency read sells licenses online, on a store it runs or contracts out under its own name, and through license agents such as sporting goods and hardware stores. Online buyers usually print the license or carry it in the agency app; some states mail tags. Two state pages give the details for the most searched agencies: the ${h.a('washington-hunting-license', 'Washington hunting license')} and the ${h.a('nysdec-hunting-license', 'NYSDEC hunting license')}.</p>
${BLOCKED_STATES.length ? `<p>Sites that refused our reader on ${K.day(LREAD)}: ${blockedNames}. Their prices are not guessed.</p>` : ''}
`,
  tool: 'buy',
  related: ['hunting-tags', 'hunting-and-fishing-license', 'hunting-license-cost-by-state', 'deer-season-by-state'],
  sources: [...READ_STATES.slice(0, 6).map((s) => `lj_${s.code}_0`), 'usc_718b'],
});

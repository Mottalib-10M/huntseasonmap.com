import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { LSTATES, LREAD, ranked, price } from '../../lib/engine/licenses';

const res = ranked('deer', 'res').filter((x) => x.p > 0), non = ranked('deer', 'non').filter((x) => x.p > 0);
const withTag = LSTATES.filter((s) => s.deer);
const draw = LSTATES.filter((s) => s.tag && /draw|drawn|lottery|application/i.test(s.tag));
const incl = LSTATES.filter((s) => s.tag && /included|comes with|come with|covered by/i.test(s.tag));
const cell = (x: number | null) => (x === null ? 'not printed' : x === 0 ? 'included' : K.usd(x));

export default definePage({
  id: 'hunting-tags', group: 'licenses', order: 51, slug: 'hunting-tags',
  nav: 'Hunting tags and deer tags', card: 'What a deer tag or deer license costs on top of the hunting license, state by state, and which states draw them.',
  title: 'Hunting Tags by State 2026: Deer Tag Prices and Draws',
  description: 'Hunting tags by state for 2026-27: the deer tag or deer license price for residents and nonresidents as printed by each agency, and where tags are drawn.',
  h1: 'Hunting tags by state: deer tag prices for 2026-27',
  intro: `Hunting tags for deer cost a resident from ${K.usd(res[0].p)} in ${res[0].s.name} to ${K.usd(res[res.length - 1].p)} in ${res[res.length - 1].s.name}, on top of or instead of the base license. Pick a state to see its tag rules.`,
  resume: `A hunting tag is the license, permit or carcass tag that lets you take one animal of a species, usually deer, elk, bear or turkey, and that you attach or report after the kill. States sell them in three ways. In some the deer tags come with the hunting license, in others a deer license or permit is bought apart, and in western states many tags are drawn by lottery months before the season. We read the fee pages of the 50 agencies on ${K.day(LREAD)} and kept the deer license or tag each one prints for an adult: ${withTag.length} states print one. For residents it costs from ${K.usd(res[0].p)} (${res[0].s.name}) to ${K.usd(res[res.length - 1].p)} (${res[res.length - 1].s.name}); for nonresidents from ${K.usd(non[0].p)} (${non[0].s.name}) to ${K.usd(non[non.length - 1].p)} (${non[non.length - 1].s.name}). Names differ: an antlerless permit in one state is not an any-deer license in another, so read the name beside each price.`,
  faqs: [
    { q: 'What is the difference between a hunting license and a deer tag?', open: true, a: 'The hunting license lets you hunt in the state; the deer tag, license or permit lets you take a deer and is attached to it or reported after the kill. Some states sell both together, others apart. The table gives, for each state, the deer item the agency prints and its price.' },
    { q: 'How much does a deer tag cost for a nonresident?', a: `Among the ${non.length} states that print a nonresident price, from ${K.usd(non[0].p)} in ${non[0].s.name} to ${K.usd(non[non.length - 1].p)} in ${non[non.length - 1].s.name}, read on ${K.day(LREAD)}. Many western tags for nonresidents are drawn: the price is paid only if you draw, plus an application fee.` },
    { q: 'Which states draw their deer tags?', a: `Where the agency page says so: ${draw.length ? draw.map((s) => s.name).join(', ') : 'none among the pages read'}. Other states sell over the counter, sometimes with a separate draw for antlerless or special units. The deadline is printed in each state's regulations, often in spring.` },
  ],
  body: (h) => `
<h2>Deer tags by state: resident and nonresident price</h2>
<p>The deer license, tag or permit as printed on the agency pages read on ${K.day(LREAD)}, adult prices, before vendor fees.${incl.length ? ` In ${incl.map((s) => s.name).join(', ')} the agency says deer tags come with the license.` : ''}</p>
${h.table(['State', 'Resident', 'Nonresident', 'Deer license or tag', 'How tags work'], withTag.map((s) => [s.name, cell(price(s.deer, 'res')), cell(price(s.deer, 'non')), s.deer!.t, s.tag ?? '-']), `Deer tag or deer license in ${withTag.length} states, read on ${K.day(LREAD)}`, ['l', 'r', 'r', 'l', 'l'])}
<h2>Deer tags and the base license</h2>
<p>A tag rarely stands alone: most states also ask for the base hunting license, priced on the ${h.a('hunting-license', 'hunting license by state')} page. The ${h.a('hunting-license-cost-by-state', 'license cost page')} adds both for a full deer hunt in the states where every item was read.</p>
${h.mini('buy', { t: 'Base hunting license in your state', p: ['st', 'who'], d: { st: 'UT' } })}
<h2>Before the season: draws, tag reporting and carcass tags</h2>
<p>Drawn tags have application windows that close months before opening day, and a tag left unused cannot be moved to another hunter in most states. After a kill, states ask you to fill in the tag and report the harvest, by phone, online or in the agency app; several now issue electronic tags. The ${h.a('deer-season-by-state', 'deer season page')} gives the dates each tag can be used.</p>
`,
  tool: 'tags',
  related: ['hunting-license', 'hunting-license-cost-by-state', 'deer-season-by-state', 'hunting-and-fishing-license'],
  sources: withTag.slice(0, 6).map((s) => `lj_${s.code}_0`),
});

import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const L = K.LIC;
const deer = (who: 'res' | 'non') => L.map((s) => ({ s, c: K.cost(s, who, 'deer') })).filter((x) => x.c.total !== null).sort((a, b) => a.c.total! - b.c.total!);
const res = deer('res'), non = deer('non');
const fish = L.map((s) => ({ s, r: K.cost(s, 'res', 'fish'), n: K.cost(s, 'non', 'fish') })).filter((x) => x.r.total !== null);
const both = L.map((s) => ({ r: K.cost(s, 'res', 'deer').total, n: K.cost(s, 'non', 'deer').total })).filter((x) => x.r && x.n).map((x) => x.n! / x.r!);
const cell = (c: { total: number | null }) => (c.total === null ? 'not read' : K.usd(c.total));

export default definePage({
  id: 'hunting-license-cost-by-state', group: 'guides', order: 105, slug: 'hunting-license-cost-by-state',
  nav: 'License cost by state', card: 'What an adult resident and nonresident pay to hunt deer, and to fish, in the states read.',
  title: 'Hunting License Cost by State 2026: Deer Hunting License',
  description: 'Hunting license cost by state for 2026-27: what an adult resident and a nonresident pay to hunt deer in 12 states, with the fishing license where it was read.',
  h1: 'Hunting license cost by state: deer, resident and nonresident',
  intro: `Hunting license cost by state for a deer hunt in 2026-27: from ${K.usd(res[0].c.total!)} for a resident of ${res[0].s.name} to ${K.usd(non[non.length - 1].c.total!)} for a nonresident in ${non[non.length - 1].s.name}. Pick a state to see the items.`,
  resume: `We read the license fee pages of ${L.length} state agencies on ${K.day(K.READ)} and added what an adult pays the state for one deer hunt: the base hunting license where one is required, plus the deer license or tag. Residents pay from ${K.usd(res[0].c.total!)} in ${res[0].s.name} to ${K.usd(res[res.length - 1].c.total!)} in ${res[res.length - 1].s.name}. Nonresidents pay far more, from ${K.usd(non[0].c.total!)} in ${non[0].s.name} to ${K.usd(non[non.length - 1].c.total!)} in ${non[non.length - 1].s.name}. In Arkansas, Texas and Pennsylvania the deer tag comes with the hunting license; in Missouri the deer permit needs no separate base license. For North Dakota, South Dakota and Wisconsin, the total is the deer license as listed; any base license or certificate those states also require is not added. Vendor and processing fees, habitat stamps not listed, and federal duck stamps are not included.`,
  faqs: [
    { q: 'Which state has the cheapest deer hunting license for residents?', a: `Among the ${res.length} states with a resident price read, ${res[0].s.name}: ${K.usd(res[0].c.total!)} (${res[0].c.items.map((i) => i[0].replace(/^[^:]+: /, '')).join(' + ')}). Prices read on the agency sites on ${K.day(K.READ)}, before vendor fees. Where the tag is sold separately, its price is included, so the figure is what a deer hunt costs at the state counter.` },
    { q: 'Why is a nonresident license so much more expensive?', a: `Each state agency sets separate resident and nonresident fees. On the pages we read, the nonresident deer hunt costs ${Math.floor(Math.min(...both))} to ${Math.ceil(Math.max(...both))} times the resident price, depending on the state. The gap is narrowest in Virginia and Pennsylvania and widest in Missouri and Arkansas.` },
    { q: 'Does the price include the deer tag?', a: 'Yes, in the totals on this page. Where the tag comes with the license (Arkansas, Texas, Pennsylvania) the tag line is $0. Where a separate deer license or tag is sold, its price is added to the base license. In Missouri, the firearms any-deer permit stands alone, with no base license.' },
  ],
  body: (h) => `
<h2>Hunting license cost by state for a deer hunt</h2>
${h.table(['State', 'Resident', 'Nonresident', 'What is counted'], L.map((s) => { const r = K.cost(s, 'res', 'deer'), n = K.cost(s, 'non', 'deer'); return [h.a(s.slug, s.name), cell(r), cell(n), (n.items.length ? n.items : r.items).map((i) => i[0].replace(/^[^:]+: /, '')).join(' + ')]; }), `Adult deer hunting license cost in ${L.length} states, read on ${K.day(K.READ)}`, ['l', 'r', 'r', 'l'])}
<p>Montana prints only the nonresident deer combination ($704, with fishing and upland birds); its resident price depends on base licenses we did not add. Pennsylvania's antlerless license costs extra ($6.97 resident, $26.97 nonresident).</p>
${h.mini('license', { t: 'What you pay for a fishing license', p: ['st', 'who'], d: { what: 'fish', st: 'OK' } })}
<h2>Fishing licenses read on the same pages</h2>
${h.table(['State', 'Resident', 'Nonresident', 'License'], fish.map((x) => [h.a(x.s.slug, x.s.name), cell(x.r), cell(x.n), x.s.lic!.fish!.t]), `Annual adult fishing license in ${fish.length} states, read on ${K.day(K.READ)}`, ['l', 'r', 'r', 'l'])}
<h2>What the totals leave out</h2>
<p>Online and store agents may add a processing fee. Hunter education courses are not priced here. Duck hunters add the federal duck stamp, ${K.usd(K.P.duckStamp.fee)} under ${h.src('usc_718b', '16 U.S.C. 718b')}, see the ${h.a('duck-season-by-state', 'duck season page')}. North Dakota also charges nonresident gun applicants a $5 application fee.</p>
`,
  tool: 'license',
  related: ['deer-season-by-state', 'duck-season-by-state', 'texas-deer-season', 'oklahoma-deer-season'],
  sources: ['lic_TX_0', 'lic_OK_0', 'lic_VA_0', 'lic_AR_0', 'lic_MO_0', 'lic_WI_0', 'lic_IA_0', 'usc_718b'],
});

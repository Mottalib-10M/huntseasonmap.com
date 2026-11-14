import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const ST = K.STATES;
const rows = ST.map((s) => ({ s, g: K.mainGun(s), a: K.opener(s, 'deer', 'archery'), m: K.opener(s, 'deer', 'muzzleloader'), end: K.last(s.deer) }))
  .sort((x, y) => x.g.r[0][0].localeCompare(y.g.r[0][0]) || x.s.name.localeCompare(y.s.name));
const earliest = rows[0], latest = rows[rows.length - 1];
const sameDay = (d: string) => rows.filter((r) => r.g.r[0][0] === d).map((r) => r.s.name);
const nov14 = sameDay('2026-11-14'), nov21 = sameDay('2026-11-21');
const lastClose = [...rows].sort((x, y) => y.end.localeCompare(x.end))[0];
const october = rows.filter((r) => r.g.r[0][0] < '2026-11-01');

export default definePage({
  id: 'deer-season-by-state', group: 'guides', order: 101, slug: 'deer-season-by-state',
  nav: 'Deer season by state', card: 'Gun, archery and muzzleloader openers of the 24 states read, side by side.',
  title: 'Deer Season by State 2026-27: Deer Hunting Season Openers',
  description: 'Deer season by state for 2026-27: the gun opener, the first archery day, muzzleloader dates and the last day in 24 states, read on the state agency sites.',
  h1: 'Deer season by state: 2026-27 gun and archery openers',
  intro: `Deer season by state for 2026-27 starts with gun openers from ${K.d(earliest.g.r[0][0])} in ${earliest.s.name} to ${K.d(latest.g.r[0][0])} in ${latest.s.name}. Pick a date to see which states are open.`,
  resume: `We read the 2026-27 deer seasons of ${ST.length} states on their wildlife agency sites on ${K.day(K.READ)}. The headline gun season, the one most hunters mean by "deer season", opens first in ${october.map((r) => r.s.name).join(', ')}, all before November. The most common opener is Saturday, Nov. 14, shared by ${nov14.join(', ')}; ${nov21.join(', ')} follow on Nov. 21. ${latest.s.name} opens last, on ${K.d(latest.g.r[0][0])}. Archery comes earlier everywhere, from Aug. 15 in Utah to Oct. 15 in Alabama's Zone A, and the last legal day ranges from Nov. 30 in Utah to ${K.d(lastClose.end)} in ${lastClose.s.name}. Every state cuts its calendar into zones or units, so the table gives the headline zone and each state page lists the others.`,
  faqs: [
    { q: 'Which state has the earliest deer gun season?', a: `Among the ${ST.length} states we read, Georgia and Utah open first, on Oct. 17, 2026: Georgia statewide, Utah on its general-season units. Colorado and Montana follow on Oct. 24. Louisiana's Area 3 also opens gun hunting on Oct. 17, but its headline season, in Area 2, opens Oct. 31. Iowa opens last, on Dec. 5.` },
    { q: 'Why does my state not appear here?', a: `Because we could not read its 2026-27 dates on the agency site: some agencies refuse automated readers, and we do not copy dates from unofficial pages. ${ST.length} states are covered so far; for the others, the regulations of your state agency are the source.` },
    { q: 'Does the opener in this table apply to my county?', a: 'Only if your county is in the zone shown. The table gives the headline zone of each state. Arkansas has 17 deer zones, Louisiana ten and North Carolina five; the state pages give the other zones and their dates. The checker at the top counts a state as open when any zone is open that day.' },
  ],
  body: (h) => `
<h2>Deer season by state, opener by opener</h2>
<p>The table lists, for each state, the headline gun season and its zone, the first day any archery season opens, the first muzzleloader day and the last day of any deer season. Click a state for every period and zone.</p>
${h.table(['State', 'Gun season (zone)', 'Gun opens', 'Archery opens', 'Muzzleloader', 'Last day'], rows.map((r) => [h.a(r.s.slug, r.s.name), `${r.g.s} (${r.g.a})`, K.d(r.g.r[0][0]), r.a ? K.d(r.a.start) : 'none read', r.m ? K.d(r.m.start) : 'none read', K.d(r.end)]), `Deer seasons 2026-27 in ${ST.length} states, read on ${K.day(K.READ)}`)}
<h2>Three ways states schedule the gun opener</h2>
<p>Some openers sit around Thanksgiving: in 2026 Wisconsin opens its nine-day season on the Saturday before it, West Virginia on the Monday of Thanksgiving week and Pennsylvania on the Saturday after it. Others stagger by zone: North Carolina moves from Oct. 17 in the east to Nov. 28 in the west, and Louisiana from Oct. 17 in Area 3 to Nov. 21 in Area 1. A third group holds short, separate seasons: Illinois hunts three days in November and four in December, Iowa five and nine days in December.</p>
${h.mini('compare', { t: 'Compare the gun opener of two states', p: ['st', 'st2'] })}
<h2>What the dates do not tell you</h2>
<p>An open date is not a license. Colorado, Utah, North Dakota and the South Dakota rifle seasons need a drawn license; several states sell tags valid only for one method or zone. Sundays are closed in Maine. Bag limits and antler rules change by county or unit. The ${h.a('hunting-license-cost-by-state', 'license cost page')} gives prices, and the ${h.a('method', 'method page')} explains how we read each agency.</p>
`,
  tool: 'map', toolArg: { sp: 'deer', m: 'gun' },
  related: ['archery-season-by-state', 'days-until-deer-season', 'hunting-license-cost-by-state', 'texas-deer-season'],
  sources: ['st_TX_0', 'st_PA_0', 'st_WI_0', 'st_GA_1', 'st_NC_0', 'st_MO_0'],
});

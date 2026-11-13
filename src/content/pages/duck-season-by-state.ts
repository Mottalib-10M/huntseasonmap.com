import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const DS = K.with('duck');
const P = K.P;
const zones = DS.flatMap((s) => (s.duck ?? []).map((x) => ({ s, x })));
const firstZone = [...zones].sort((a, b) => a.x.r[0][0].localeCompare(b.x.r[0][0]))[0];
const lastZone = [...zones].sort((a, b) => b.x.r[b.x.r.length - 1][1].localeCompare(a.x.r[a.x.r.length - 1][1]))[0];

export default definePage({
  id: 'duck-season-by-state', group: 'guides', order: 104, slug: 'duck-season-by-state',
  nav: 'Duck season by state', card: 'Duck zones and split seasons of 2026-27 in six states, with the federal stamp and HIP rules.',
  title: 'Duck Season by State 2026-27: Zones, Splits and Duck Stamp',
  description: 'Duck season by state for 2026-27: zones and split dates in six states, the $25 federal duck stamp from age 16 and the HIP registration every duck hunter needs.',
  h1: 'Duck season by state: 2026-27 zones and split seasons',
  intro: `Duck season by state for 2026-27, in the six states whose agencies printed it: the first zone opens on ${K.d(firstZone.x.r[0][0])} (${firstZone.s.name}, ${firstZone.x.a}). Pick a date to see which are open.`,
  resume: `Duck seasons are set by each state inside federal frameworks for migratory birds, so every state splits its days differently. Read on ${K.day(K.READ)}, the six states with 2026-27 duck dates on their agency sites open between ${K.d(firstZone.x.r[0][0])} in ${firstZone.s.name}'s ${firstZone.x.a} and late November in Alabama and Mississippi, and the last zone closes on ${K.d(lastZone.x.r[lastZone.x.r.length - 1][1])}. Most use a split season, with a closed gap of a few days to a few weeks. Two federal rules apply in all of them: a hunter aged ${P.duckStamp.age} or older must carry a valid federal duck stamp (16 U.S.C. 718a), sold for $${P.duckStamp.fee} per hunting year (16 U.S.C. 718b), and every migratory bird hunter must register with the Harvest Information Program, HIP, through the state licensing system (50 CFR 20.20).`,
  faqs: [
    { q: 'Do I need a federal duck stamp to hunt ducks?', a: `Yes, from age ${P.duckStamp.age}: 16 U.S.C. 718a forbids anyone who has reached ${P.duckStamp.age} to take migratory waterfowl without a valid Migratory Bird Hunting and Conservation Stamp, signed in ink across its face or held as an electronic stamp. The law sets its price at $${P.duckStamp.fee} per hunting year.` },
    { q: 'What is HIP certification?', a: 'The Harvest Information Program. Under 50 CFR 20.20, everyone hunting migratory game birds in any state except Hawaii must give name, address and date of birth to the state licensing authority and carry the proof that state provides. States use it to survey the harvest.' },
    { q: 'Why do duck seasons close for a few days in the middle?', a: 'Federal frameworks give each state a number of days, and the state chooses how to split them into segments. Texas, for example, closes its South Zone from Nov. 30 to Dec. 11, 2026, between its two segments, and Alabama closes from Nov. 29 to Dec. 4. The checker counts those gap days as closed.' },
  ],
  body: (h) => `
<h2>Duck season by state and zone</h2>
${h.table(['State', 'Zone', 'Dates', 'Days'], zones.map(({ s, x }) => [h.a(s.slug, s.name), x.a, K.range(x), x.r.reduce((n, [a, b]) => n + K.between(a, b) + 1, 0)]), `Duck seasons 2026-27 by zone, read on ${K.day(K.READ)}`, ['l', 'l', 'l', 'r'])}
<p>Alabama's page warned that federal frameworks were not final when it was printed; Pennsylvania keeps Sunday closed for migratory birds while it opens Sundays for deer.</p>
${h.mini('open', { t: 'Is duck season open in your zone on a date?', p: ['st', 'mo', 'd'], d: { st: 'TX', sp: 'duck' } })}
<h2>What every duck hunter carries</h2>
<p>A state hunting license, the state waterfowl or migratory bird stamp where the state requires one, the HIP proof (${h.src('cfr_20_20', '50 CFR 20.20')}) and, from age ${P.duckStamp.age}, the federal duck stamp (${h.src('usc_718a', '16 U.S.C. 718a')}; price in ${h.src('usc_718b', '16 U.S.C. 718b')}). The shotgun must hold no more than ${P.shotgunShellsMax} shells, plugged if needed, outside a few light-goose and September Canada goose seasons (${h.src('cfr_20_21', '50 CFR 20.21')}). The ${h.a('hunting-license-cost-by-state', 'license cost page')} gives state prices; the federal stamp is extra.</p>
<h2>Zones, not states, set your dates</h2>
<p>Alabama and Mississippi set one statewide duck season; the four others cut theirs by zone. Texas runs the High Plains Mallard Management Unit, North and South zones; Pennsylvania a North, South, Northwest and Lake Erie zone; Oklahoma zones 1 and 2 and the Panhandle; Wisconsin a Northern, a Southern and an Open Water zone. Check the zone of the water you hunt before the opener.</p>
`,
  tool: 'map', toolArg: { sp: 'duck' },
  related: ['turkey-season-by-state', 'hunting-license-cost-by-state', 'texas-deer-season', 'wisconsin-deer-season'],
  sources: ['usc_718a', 'usc_718b', 'cfr_20_20', 'cfr_20_21', 'st_AL_2', 'st_TX_0', 'st_PA_0', 'st_WI_0'],
});

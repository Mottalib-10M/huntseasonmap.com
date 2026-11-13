import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const TS = K.with('turkey');
const isSpring = (x: { s: string; r: Array<[string, string]> }) => /spring/i.test(x.s) || x.r[0][0] >= '2027-02-01';
const rows = TS.map((s) => {
  const ss = s.turkey ?? [];
  const fall = ss.filter((x) => !isSpring(x)), spring = ss.filter((x) => isSpring(x));
  return { s, fall, spring };
});
const springStates = rows.filter((r) => r.spring.length);
const firstSpring = [...springStates].sort((a, b) => K.first(a.spring).localeCompare(K.first(b.spring)))[0];
const lastSpring = [...springStates].sort((a, b) => K.last(b.spring).localeCompare(K.last(a.spring)))[0];
const noSpring = rows.filter((r) => !r.spring.length).map((r) => r.s.name);

export default definePage({
  id: 'turkey-season-by-state', group: 'guides', order: 103, slug: 'turkey-season-by-state',
  nav: 'Turkey season by state', card: 'Fall 2026 and spring 2027 turkey dates in the states whose agencies printed them.',
  title: 'Turkey Season by State 2026-27: Fall and Spring Dates',
  description: 'Turkey season by state: fall 2026 and spring 2027 dates in 12 states, from the agency regulations, with the youth days and a checker for any date you pick.',
  h1: 'Turkey season by state: fall 2026 and spring 2027',
  intro: `Turkey season by state, as printed for 2026-27 by ${TS.length} state agencies: spring 2027 opens first in ${firstSpring.s.name} on ${K.d(K.first(firstSpring.spring))}. Pick a date to check it.`,
  resume: `Of the ${K.STATES.length} states whose deer seasons we read on ${K.day(K.READ)}, ${TS.length} had also published turkey dates for 2026-27. Spring 2027 dates were printed by ${springStates.length} of them: ${springStates.map((r) => r.s.name).join(', ')}. The earliest spring opener is ${firstSpring.s.name}, on ${K.d(K.first(firstSpring.spring))}, and the latest closing day ${K.d(K.last(lastSpring.spring))} in ${lastSpring.s.name}. ${noSpring.join(', ')} had printed only fall dates when we read them, either because the spring 2027 calendar was not yet out or because the page still showed spring 2026. Fall seasons are more varied: Iowa and Oklahoma split archery from gun, Vermont opens shotguns only in listed management units, and South Dakota's fall prairie season runs into January.`,
  faqs: [
    { q: 'When does spring turkey season start in 2027?', a: `In the states we read, between ${K.d(K.first(firstSpring.spring))} (${firstSpring.s.name}) and May 1 (Pennsylvania's spring gobbler season). Youth days come before the regular opener in Mississippi, North Carolina, Oklahoma, Pennsylvania and West Virginia. Texas opens three zones on three different dates.` },
    { q: 'Why are spring dates missing for some states?', a: `Because the agency page we read had not published spring 2027 yet. Wisconsin still showed spring 2026 periods and says the spring permit application deadline is December 10; Vermont's 2026 calendar gave spring 2026. We show only dates printed for 2026-27.` },
    { q: 'Can you hunt turkey in the fall with a rifle?', a: 'It depends on the state and the period. The agencies name the fall periods by method: archery only in Iowa and Vermont at first, then gun or bow, shotgun or bow in Vermont\'s listed units, and fall gun in Oklahoma. The regulations of your state list legal weapons.' },
  ],
  body: (h) => `
<h2>Turkey season by state: fall and spring periods</h2>
${h.table(['State', 'Fall 2026', 'Spring 2027'], rows.map((r) => [h.a(r.s.slug, r.s.name), r.fall.length ? r.fall.map((x) => `${x.s} (${x.a}): ${K.range(x)}`).join('<br>') : 'none printed', r.spring.length ? r.spring.map((x) => `${x.s} (${x.a}): ${K.range(x)}`).join('<br>') : 'not yet printed']), `Turkey seasons 2026-27 in ${TS.length} states, read on ${K.day(K.READ)}`)}
<p>Fall periods are often limited to some counties or units: Alabama's fall season is open in Zone 3 counties, West Virginia's in select counties, Pennsylvania's by Wildlife Management Unit, with WMUs 5C and 5D closed.</p>
${h.mini('open', { t: 'Is turkey season open in your state on a date?', p: ['st', 'mo', 'd'], d: { st: 'OK', sp: 'turkey' } })}
<h2>Spring gobbler rules that change the day</h2>
<p>North Carolina limits its spring season to male or bearded birds, and West Virginia to bearded birds. Pennsylvania ends spring hunting hours at noon from May 1 to 15. Mississippi lets nonresidents hunt public land only from April 1. Texas opens three zones on three dates, from March 20 in the South Zone to April 22 in the East Zone.</p>
<h2>Turkey and deer on the same calendar</h2>
<p>Fall turkey often overlaps deer season. In Texas, fall turkey follows the deer zones, and in Iowa fall archery turkey runs on the same dates as deer archery. The ${h.a('deer-season-by-state', 'deer season page')} gives the overlapping deer dates.</p>
`,
  tool: 'map', toolArg: { sp: 'turkey' },
  related: ['deer-season-by-state', 'duck-season-by-state', 'pennsylvania-deer-season', 'oklahoma-deer-season'],
  sources: ['st_AL_1', 'st_TX_0', 'st_PA_0', 'st_OK_0', 'st_WV_0', 'st_MS_0'],
});

import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const ST = K.STATES;
const rows = ST.map((s) => {
  const g = K.mainGun(s), a = K.opener(s, 'deer', 'archery'), m = K.opener(s, 'deer', 'muzzleloader');
  return { s, g, gun: g.r[0][0], arch: a?.start ?? null, ml: m?.start ?? null };
}).sort((x, y) => x.gun.localeCompare(y.gun));
const leads = rows.filter((r) => r.arch).map((r) => K.between(r.arch!, r.gun));
const spread = K.between(rows[0].gun, rows[rows.length - 1].gun);

export default definePage({
  id: 'days-until-deer-season', group: 'guides', order: 106, slug: 'days-until-deer-season',
  nav: 'Days until deer season', card: 'A countdown to the archery, muzzleloader or gun opener of your state, from any date.',
  title: 'Days Until Deer Season 2026: Countdown to Your State Opener',
  description: 'Days until deer season in your state: a countdown to the 2026 archery, muzzleloader or gun opener of 24 states, counted from today or from any date you pick.',
  h1: 'Days until deer season: countdown to your 2026 opener',
  intro: `Days until deer season, counted to the opener of your state and method. Gun openers read for 2026 are ${spread} days apart, from ${K.d(rows[0].gun)} to ${K.d(rows[rows.length - 1].gun)}.`,
  resume: `The countdown above counts calendar days from the date shown, today once the page has loaded, to the first day of the next period of the method you pick in your state, using the 2026-27 dates the state agencies printed and we read on ${K.day(K.READ)}. When a period of that method is already open, it says so and counts the days left instead. The gun opener is the headline season of each state, the one most hunters mean by "opening day"; archery and muzzleloader count from the first period of that method, wherever it is open in the state. Among the states read, the first gun opener is ${rows[0].s.name}'s, on ${K.d(rows[0].gun)}, and the last ${rows[rows.length - 1].s.name}'s, on ${K.d(rows[rows.length - 1].gun)}, ${spread} days later.`,
  faqs: [
    { q: 'How many days until deer season opens?', a: 'It depends on your state and method. Pick both in the countdown: it counts from today to the next opener and switches to the days left when a season is already open. The table below lists every gun opener read, with the archery and muzzleloader openers of the same state.' },
    { q: 'Is opening day the same for bow and rifle?', a: `No. In every state we read, archery opens first, from ${Math.min(...leads)} to ${Math.max(...leads)} days before the headline gun season. Muzzleloader seasons fall before or after the gun season depending on the state: before it in Arkansas, Oklahoma and Virginia, after it in Ohio, Wisconsin and North Dakota. Pick the method in the countdown to count to each opener.` },
    { q: 'Does the countdown know about zones?', a: 'It takes the first day of the method anywhere in the state. For the gun opener, it uses the headline zone shown on each state page. If your county is in another zone, read that zone\'s date on the state page.' },
  ],
  body: (h) => `
<h2>Days until deer season, state by state</h2>
<p>The countdown above counts from today, or from the date you pick. The table gives the opening day of each method, and how many days archery opens before the gun season.</p>
${h.table(['State', 'Gun opener', 'Archery opener', 'Archery opens before gun', 'Muzzleloader opener'], rows.map((r) => [h.a(r.s.slug, r.s.name), K.d(r.gun), r.arch ? K.d(r.arch) : 'none read', r.arch ? `${K.between(r.arch, r.gun)} days` : '-', r.ml ? K.d(r.ml) : 'none read']), `Deer openers 2026-27 in ${ST.length} states, read on ${K.day(K.READ)}`, ['l', 'l', 'l', 'r', 'l'])}
<h2>Why opening day is a moving date</h2>
<p>In 2026, Wisconsin's gun opener falls on the Saturday before Thanksgiving, West Virginia's on the Monday of Thanksgiving week and Pennsylvania's on the Saturday after it: openers follow the calendar of each year rather than a fixed date. Some states set dates in multi-year plans, like Colorado's 2025-2029 season structure, or by commission vote each spring, like the Ohio Wildlife Council's vote announced on May 4, 2026.</p>
${h.mini('countdown', { t: 'Days until the muzzleloader opener', p: ['st'], d: { m: 'muzzleloader', st: 'PA' } })}
<h2>The days before the opener</h2>
<p>Check that your license or tag covers the season and zone, that any drawn license arrived, and the hunting hours of your state. Some states hold a youth hunt the weekend before: Alabama, Arkansas, Texas and Ohio among them. The ${h.a('deer-season-by-state', 'deer season page')} gives every opener side by side.</p>
`,
  tool: 'countdown',
  related: ['deer-season-by-state', 'archery-season-by-state', 'wisconsin-deer-season', 'pennsylvania-deer-season'],
  sources: ['st_WI_0', 'st_WV_0', 'st_PA_0', 'st_CO_0', 'st_OH_0'],
});

import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const ST = K.STATES;
/** Archery periods of each state: first day, last day, and how many days a bow may be used. */
const rows = ST.map((s) => {
  const arch = s.deer.filter((x) => K.method(x) === 'archery');
  let days = 0;
  for (let d = K.first(arch); d <= K.last(arch); d = new Date(Date.parse(`${d}T00:00:00Z`) + 86400000).toISOString().slice(0, 10)) {
    if (arch.some((x) => x.r.some(([a, b]) => a <= d && d <= b)) && !(s.noSunday && new Date(`${d}T00:00:00Z`).getUTCDay() === 0)) days += 1;
  }
  return { s, arch, start: K.first(arch), end: K.last(arch), days };
}).sort((x, y) => x.start.localeCompare(y.start) || x.s.name.localeCompare(y.s.name));
const longest = [...rows].sort((x, y) => y.days - x.days)[0];
const shortest = [...rows].sort((x, y) => x.days - y.days)[0];
const sept = rows.filter((r) => r.start < '2026-10-01');

export default definePage({
  id: 'archery-season-by-state', group: 'guides', order: 102, slug: 'archery-season-by-state',
  nav: 'Archery season by state', card: 'When bowhunting for deer opens and closes in each state read, and how many days it lasts.',
  title: 'Archery Season by State 2026-27: Bow Deer Dates and Days',
  description: 'Archery season by state for 2026-27: when bowhunting for deer opens and closes in 24 states, the pauses for gun weeks, and how many days a bow may be used.',
  h1: 'Archery season by state: bow deer dates for 2026-27',
  intro: `Archery season by state opens between ${K.d(rows[0].start)} in ${rows[0].s.name} and ${K.d(rows[rows.length - 1].start)} in ${rows[rows.length - 1].s.name}. Pick a date to see where a bow is legal.`,
  resume: `On the agency sites we read on ${K.day(K.READ)}, ${sept.length} of the ${ST.length} states open deer archery before October 1, 2026. Utah opens first, on Aug. 15, for general-season bucks, and Arkansas has a three-day buck-only hunt on Aug. 29 to 31. Counting the days on which some archery period is open, ${longest.s.name} gives bowhunters the most, ${longest.days} days, and ${shortest.s.name} the fewest, ${shortest.days}. Several states close archery during their gun weeks: Illinois around both firearm seasons, Missouri during the November portion, North Carolina when blackpowder starts, and Connecticut on state land. Crossbows count as archery in some states, such as West Virginia and Wisconsin, and under rules of their own elsewhere: read the regulations of your state before taking one out.`,
  faqs: [
    { q: 'Which state has the longest archery deer season?', a: `Among the ${ST.length} states we read, ${longest.s.name}: ${longest.days} days on which an archery period is open in 2026-27, from ${K.d(longest.start)} to ${K.d(longest.end)}. The count adds every zone or area, so a single county may have fewer.` },
    { q: 'Is archery season closed during gun season?', a: 'In some states. Illinois closes archery in firearm counties during both firearm seasons, Missouri during the November firearms portion (Nov. 14 to 24, 2026), and Connecticut on state land from Nov. 18 to Dec. 22. In Georgia, by contrast, Georgia WRD says archery is allowed through the whole season, gun weeks included.' },
    { q: 'Do these dates include crossbows?', a: 'The table follows the period names the agencies print. West Virginia and Wisconsin name archery and crossbow together; in other states crossbow rules differ, and the regulations of your state say whether a crossbow is allowed in archery season. The checker uses the period names as printed, so a crossbow-only period would be filed under archery too.' },
  ],
  body: (h) => `
<h2>Archery season by state: first day, last day, days open</h2>
<p>Days open counts every calendar day on which at least one archery period is open somewhere in the state, Sundays removed in Maine. Your zone or county may have fewer.</p>
${h.table(['State', 'First archery day', 'Last archery day', 'Days open', 'Periods'], rows.map((r) => [h.a(r.s.slug, r.s.name), K.d(r.start), K.d(r.end), r.days, r.arch.map((x) => x.s).join('; ')]), `Deer archery seasons 2026-27 in ${ST.length} states, read on ${K.day(K.READ)}`, ['l', 'l', 'l', 'r', 'l'])}
<h2>Early hunts and late extensions</h2>
<p>A few states add short early hunts: Arkansas (Aug. 29 to 31, bucks only), Mississippi (velvet season, Sept. 11 to 13, by permit) and the expanded archery areas of Maine and Vermont in September. At the other end, extended archery areas keep bowhunting open after the main season: to Jan. 31 in Wisconsin's metro sub-units and Nov. 30 in Utah's extended areas. Ohio's archery season runs to Feb. 7 and Arkansas's to Feb. 28.</p>
${h.mini('countdown', { t: 'Days until archery opens in a state', p: ['st'], d: { m: 'archery' } })}
<h2>Before the first sit</h2>
<p>In South Dakota, archery licenses stay on sale through the season while firearm licenses are drawn in June. Colorado is the exception among the states read, with every deer license, archery included, in the draw. The ${h.a('deer-season-by-state', 'deer season page')} gives the gun openers that end or interrupt archery in each state.</p>
`,
  tool: 'map', toolArg: { sp: 'deer', m: 'archery' },
  related: ['deer-season-by-state', 'days-until-deer-season', 'ohio-deer-season', 'illinois-deer-season'],
  sources: ['st_UT_0', 'st_AR_0', 'st_IL_1', 'st_MO_0', 'st_WI_0', 'st_SD_0'],
});

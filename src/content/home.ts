/** Text of the home page (the pillar). Every figure comes from the kit (src/data/seasons.json, read on 2026-11-13). */
import { KIT as K } from '../lib/kit';
import { BUILD } from '../lib/tool-specs';
import type { FAQ, Helpers } from '../lib/page-types';

const ST = K.STATES;
const sorted = [...ST].sort((a, b) => a.name.localeCompare(b.name));
const openOn = (iso: string, sp: 'deer' | 'turkey' | 'duck' = 'deer') => K.with(sp).filter((s) => K.status(s, sp, iso).open.length);
const openNow = openOn(BUILD);
const gunNow = ST.filter((s) => K.status(s, 'deer', BUILD, 'gun').open.length);
const ex = K.S(K.EX.st), exG = K.mainGun(ex);
const T = K.with('turkey'), D = K.with('duck');
const byGun = [...ST].sort((a, b) => K.mainGun(a).r[0][0].localeCompare(K.mainGun(b).r[0][0]));
const MISSING = 'Michigan, Minnesota, New York, Florida, Kansas, Kentucky, Indiana, Nebraska, Tennessee, New Jersey, Maryland, Massachusetts, New Hampshire, Idaho, California and South Carolina';

/** The value sentence (RECETTE §2.4), shown on the home page, the About page and the method page. */
export const VALUE = `Search results for hunting season dates send you to fifty agency sites, each with its own zones and PDF, or to blog posts that copy last year's dates and sell an app. This site reads the 2026-27 season pages of each state wildlife agency it can reach, keeps the dates as printed, and tells you whether a season is open on any date you pick, how many days remain until an opener, and how states compare. It sells nothing and asks for nothing.`;

export const HOME = {
  title: 'Hunting Season Dates by State 2026-27: Deer, Turkey, Duck',
  description: 'Hunting season dates by state for 2026-27: deer, turkey and duck seasons in 24 states as the agencies printed them, and a checker that says if a season is open.',
  h1: 'Hunting season dates by state: is it open today?',
  /** The answer in one sentence, one figure. */
  answer: `On ${K.day(BUILD)}, a gun deer season is open in ${gunNow.length} of the ${ST.length} states whose 2026-27 hunting season dates we read, and some deer period, archery included, in ${openNow.length}. Pick your state, game and method: the answer appears at once.`,
  intro: `The checker opens on ${ex.name}, gun deer season, today: pick your own state and method.`,
  resume: `Each state wildlife agency sets its own hunting seasons, by species, method and zone, and publishes them in its own regulations. We read the 2026-27 season pages and PDFs of ${ST.length} state agencies on ${K.day(K.READ)}: deer in all ${ST.length}, turkey in ${T.length}, ducks in ${D.length}, and license prices in ${K.LIC.length}. The headline gun deer season opens between ${K.d(K.mainGun(byGun[0]).r[0][0])} (${byGun[0].name}) and ${K.d(K.mainGun(byGun[byGun.length - 1]).r[0][0])} (${byGun[byGun.length - 1].name}); archery opens earlier everywhere, from mid-August in Utah. In ${ex.name}, the example on this page, the ${exG.s.toLowerCase()} season (${exG.a}) runs ${K.range(exG)}. ${MISSING.split(', ').length} more states could not be read on their agency sites, which refused automated readers or did not publish 2026-27 dates in a page we could open; they are not shown rather than guessed.`,
  faqs: [
    { q: 'Is deer season open today in my state?', a: 'Pick your state, deer and your method in the checker at the top: it fills in today\'s date and says Open or Closed for that method, gives the last day of each open period with its zone, and the next opener. Gun is chosen first; pick archery, muzzleloader, youth hunts or any method to change it.' },
    { q: 'Is this an official government site?', a: 'No. Hunt Season Map is an independent site published by Radif Partners. It is not a state wildlife agency, sells no license and links to each agency page it read, so you can check the source before you go. It is paid by no one: no license fee, no affiliate link and no paid placement.' },
    { q: 'Why are only 24 states covered?', a: `Because we publish only dates read on the agency's own site. ${MISSING} refused automated readers, timed out, or had no 2026-27 page we could open on ${K.day(K.READ)}. Their seasons are not guessed from other sites.` },
    { q: 'Do these dates apply to my county or zone?', a: 'Each state page lists every zone, area or unit the agency printed with its own dates. The home checker says Open when a period of your method is open somewhere in the state, and names the area of each period next to its last day.' },
    { q: 'How current are these dates?', a: `Every date was read on ${K.day(K.READ)} on the 2026-27 pages and PDFs of the agencies. Agencies sometimes adjust dates after printing, and federal frameworks for ducks can change late. The regulations of your state agency govern. This site is updated by hand when a source is read again; the date of the last reading is shown on every page.` },
    { q: 'Do I need a license for every season?', a: 'Yes, a hunting license or permit for the state, and often a tag or license for the species, method or zone. Some seasons need a license drawn months before. The license cost page lists what an adult pays in the states where prices were read.' },
  ] as FAQ[],
  /** Right under the calculator: how to read the answer. */
  start: (h: Helpers) => `
<h2>Reading the answer for your state</h2>
<p>The large word is the status for your method on the date shown. Under it, each open period with its zone and its own last day, then the next new period. The table lists every period read, with its status that day.</p>
<p>A Sunday inside a Maine season is shown closed, since Maine forbids hunting on Sunday, and so is a Sunday inside a Pennsylvania duck season. The ${h.a('method', 'method page')} explains how periods are classified as archery, muzzleloader, gun or youth hunts.</p>
`,
  /** Open sections. */
  guide: (h: Helpers) => `
<h2>Hunting season dates by state: the 2026-27 deer calendar</h2>
<p>The table gives, for each of the ${ST.length} states read, one headline gun deer season, the first day of archery, and whether turkey and duck dates are on the state page. Many states have other gun periods or zones: the state page lists them all.</p>
${h.table(['State', 'Headline gun season (one zone)', 'Other gun periods', 'Archery opens', 'Turkey', 'Duck'], sorted.map((s) => { const g = K.mainGun(s), a = K.opener(s, 'deer', 'archery'); const more = s.deer.filter((x) => x !== g && K.method(x) === 'gun').length; return [h.a(s.slug, s.name), `${K.range(g)}, ${g.a}`, more ? h.a(s.slug, `${more} more`) : 'none', a ? K.d(a.start) : 'none read', s.turkey ? 'dates on the state page' : 'not covered yet', s.duck ? 'dates on the state page' : 'not covered yet']; }), `Hunting season dates of ${ST.length} states for 2026-27, read on ${K.day(K.READ)}`)}
<h2>Deer, turkey and duck seasons: how each is set</h2>
<p><strong>Deer.</strong> Every state splits deer hunting by method. Archery comes first, from ${K.d([...ST].map((s) => K.opener(s, 'deer', 'archery')?.start ?? '9999').sort()[0])}; muzzleloader seasons fall before or after the gun weeks; the gun season is the one most hunters mean by opening day. The ${h.a('deer-season-by-state', 'deer season page')} sets every gun opener side by side, the ${h.a('archery-season-by-state', 'archery season page')} counts the bow days, and the ${h.a('days-until-deer-season', 'countdown')} counts the days to yours.</p>
<p><strong>Turkey.</strong> Turkey seasons come in spring and, in some states, in fall. ${T.length} of the states read printed 2026-27 turkey dates; the ${h.a('turkey-season-by-state', 'turkey season page')} lists fall and spring.</p>
<p><strong>Ducks.</strong> Duck seasons follow federal frameworks for migratory birds, so the federal duck stamp (${h.src('usc_718a', '16 U.S.C. 718a')}) and HIP registration (${h.src('cfr_20_20', '50 CFR 20.20')}) apply in every state. The ${h.a('duck-season-by-state', 'duck season page')} gives the zones of ${D.length} states.</p>
<h2>Hunting license by state: what it costs and where to buy it</h2>
<p>An adult resident pays the state between ${K.usd(Math.min(...K.LIC.map((s) => K.cost(s, 'res', 'deer').total ?? 1e9)))} and ${K.usd(Math.max(...K.LIC.map((s) => K.cost(s, 'res', 'deer').total ?? 0)))} for a deer hunt in the ${K.LIC.length} states where prices were read, and a nonresident far more. The ${h.a('hunting-license-cost-by-state', 'license cost page')} adds each item, as printed on pages such as the ${h.src('lic_TX_0', 'Texas Parks and Wildlife Department license list')} and the ${h.src('lic_WI_0', 'Wisconsin DNR fee list')}.</p>
<p>For the base license of every state and the official store of each agency, see ${h.a('hunting-license', 'hunting license by state')}; for deer tags, ${h.a('hunting-tags', 'hunting tags by state')}; for combination licenses, ${h.a('hunting-and-fishing-license', 'hunting and fishing license by state')}. Two agencies have their own page: the ${h.a('washington-hunting-license', 'Washington hunting license')} (WDFW) and the ${h.a('nysdec-hunting-license', 'NYSDEC hunting license')} (New York).</p>
`,
  /** Folded sections (<details>, content kept in the HTML). */
  folds: [
    { id: 'zones', title: 'Zones, units and areas: why one state has many dates', html: (h: Helpers) => `
<p>Agencies set dates by zone because deer and bird populations, habitats and hunting traditions differ inside a state. Louisiana prints ten deer areas and opens gun hunting in Area 3 five weeks before Area 1. North Carolina staggers its gun opener across five zones from Oct. 17 to Nov. 28. Colorado issues licenses by game management unit (GMU) and season through a draw, so a date open in the plains may be closed to you if your license names a mountain season. Arkansas counts 17 deer zones.</p>
<p>On each state page, the table names the area of every period: read the row of your zone. When the agency printed one area as an example of several, as Alabama did with Zone A, the state page says so and links to the full regulations.</p>
<p>Counties also matter for antlerless deer, bag limits and special hunts. Ohio raised county bag limits to three deer in Defiance, Paulding and Warren counties. West Virginia opens antlerless days only in selected counties. Virginia sets firearms closing dates county by county. None of these change the opening day of the headline season, but they change what you may take.</p>
` },
    { id: 'methods', title: 'Archery, muzzleloader, gun and youth hunts', html: (h: Helpers) => `
<p>The checker classifies each period by the words the agency used. Archery covers bow, crossbow and archery periods; muzzleloader covers muzzleloader, blackpowder, primitive weapon and flintlock periods; gun covers firearms, rifle, shotgun, general, regular, holiday, heritage and antlerless gun periods; youth covers youth, junior, apprentice, veteran and disabled hunter periods. A period named for two methods, such as Mississippi's archery and primitive weapon days, is counted as muzzleloader, because a primitive weapon is allowed.</p>
<p>Youth seasons often come before the gun opener: Texas's youth weekend is Oct. 30 to Nov. 1, Alabama's youth gun days Nov. 13 to 16, Illinois's youth hunt Oct. 10 to 12. Choose "Youth and special hunts" in the method menu to see them.</p>
<p>Where the pages we read did not print a period for a method, as for muzzleloaders in Georgia and Missouri, the countdown says none was read: it does not mean the state has none. Missouri's alternative methods portion is counted as gun, under the name the agency gives it.</p>
` },
    { id: 'gaps', title: 'States not covered, and what this site does not do', html: (h: Helpers) => `
<p>${MISSING} are not covered: their agency sites refused automated readers, timed out, or did not have 2026-27 dates on a page we could open on ${K.day(K.READ)}. We did not use dates from blogs, apps or copied pages to fill them.</p>
<p>The site does not sell licenses, tags or applications, does not say where to hunt, and does not cover bag limits, legal weapons, hunting hours or land access beyond what a period name says. Fishing seasons are not covered; fishing license prices appear only where they were printed beside hunting fees. Read more on the ${h.a('method', 'method page')}.</p>
` },
  ],
  sources: ['st_TX_0', 'st_PA_0', 'st_WI_0', 'st_NC_0', 'usc_718a', 'cfr_20_20'],
};

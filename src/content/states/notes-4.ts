/** Handwritten notes, states 19 to 24 (TX, UT, VT, VA, WV, WI). Facts from src/data/seasons.json only. */
import type { StateNote } from '../../lib/state-pages';

export const NOTES_4: Record<string, StateNote> = {
  TX: {
    resume: `Texas gives deer hunters a long general season. It opens on Nov. 7, 2026 in both zones and closes on Jan. 3, 2027 in the North Zone and Jan. 17 in the South Zone; a special late season then follows in each zone for two more weeks. Archery comes first, Oct. 3 to Nov. 6, in 252 of the 254 counties, and youth hunters get an early weekend from Oct. 30 to Nov. 1. A muzzleloader-only season runs Jan. 4 to 17 in 90 counties. The Texas Parks and Wildlife Department (TPWD) prints all of these in the 2026-2027 Outdoor Annual, along with fall and spring turkey and three duck zones. A resident hunting license costs $25 and a nonresident general hunting license $315; deer tags come with the license.`,
    zones: `TPWD splits deer hunting into a North Zone and a South Zone, which share the Nov. 7 opener but close two weeks apart. Archery covers 252 of 254 counties and the muzzleloader-only season 90 counties, listed in the Outdoor Annual.`,
    check: `Check which zone your county is in before you plan a January hunt. Ducks follow their own zones, with the High Plains Mallard Management Unit opening first, on Oct. 24.`,
    faqs: [
      { q: 'When does deer season end in South Texas?', a: 'The general season in the South Zone ends Jan. 17, 2027, and the special late season there runs Jan. 18 to 31. In the North Zone, the general season ends Jan. 3 and the special late season runs Jan. 4 to 17.' },
      { q: 'Do I need a separate deer tag in Texas?', a: "No. TPWD says the resident hunting license ($25) and the non-resident general hunting license ($315) both cover deer, with tags. The deer hunt therefore costs the price of the license alone, before agent fees. Fishing is a separate purchase: the freshwater package costs $30 for a resident." },
    ],
  },
  UT: {
    resume: `Utah hunts general-season buck deer early: archery runs from Aug. 15 to Sept. 11, 2026, muzzleloader from Sept. 23 to Oct. 1, and the any legal weapon (rifle) hunt from Oct. 17 to 25, with an early rifle hunt from Oct. 7 to 11. General-season buck permits are drawn. Extended archery areas, where either-sex deer may be taken, stay open from Sept. 12 to Nov. 30 in Box Elder, Ogden, Uinta Basin, Utah Lake, Wasatch Front, West Cache and other areas; in Nine Mile, Sanpete Valley and South Wasatch, extended archery ends on Oct. 15. Limited-entry hunts have their own dates in the Big Game Application Guidebook. The dates here come from the 2026 Utah Field Regulations Guidebook of the Division of Wildlife Resources (DWR).`,
    zones: `The Utah DWR sets general-season dates for all general-season units and adds extended archery areas where bowhunting continues into late fall. Limited-entry hunts follow separate calendars.`,
    check: `A date open in the table is open to you only if your drawn permit covers that hunt. Extended archery ends on Oct. 15 in three areas, not Nov. 30.`,
    faqs: [
      { q: 'When is the Utah general rifle deer hunt in 2026?', a: "The any legal weapon hunt runs Oct. 17 to 25, 2026 on general-season units; an early rifle hunt runs Oct. 7 to 11. Both need a drawn general-season buck permit. Archery for general-season bucks ran Aug. 15 to Sept. 11 and muzzleloader Sept. 23 to Oct. 1." },
      { q: 'What is extended archery in Utah?', a: 'Areas where archery for either-sex deer continues after the general archery hunt: from Sept. 12 to Nov. 30, 2026 in areas such as Box Elder, Ogden, Uinta Basin and Wasatch Front, and to Oct. 15 in Nine Mile, Sanpete Valley and South Wasatch.' },
    ],
  },
  VT: {
    resume: `Vermont's rifle deer season is known by its length: the regular season runs 16 days, from Nov. 14 to Nov. 29, 2026. Archery is open from Oct. 1 to Dec. 15 statewide, after an expanded archery season in designated areas from Sept. 15 to 30. Muzzleloader hunters have two seasons, four days in October (Oct. 29 to Nov. 1) and two weeks in December (Nov. 30 to Dec. 13). Youth and novice hunters have their own weekend, Nov. 7 and 8. Vermont Fish and Wildlife also sets fall turkey: bow and arrow only from Oct. 1 to Nov. 13 everywhere, and shotgun or bow in October and early November in listed WMUs. The 2026 calendar we read still gave the spring 2026 turkey season, so spring 2027 dates are not shown here.`,
    zones: `Vermont deer dates are statewide, except expanded archery in designated areas. Fall turkey with shotguns is open only in listed wildlife management units (WMUs), and it closes on Nov. 1 in most of them and on Nov. 8 in WMUs F, K and N.`,
    check: `Novice hunters can use the youth and novice weekend, Nov. 7 and 8. For spring turkey 2027, wait for the next calendar from Vermont Fish and Wildlife.`,
    faqs: [
      { q: 'When is Vermont rifle deer season 2026?', a: "Nov. 14 to Nov. 29, 2026: the 16-day regular season, statewide. It follows the youth and novice weekend of Nov. 7 and 8, and the December muzzleloader season starts the next day, Nov. 30. Archery stays open from Oct. 1 to Dec. 15." },
      { q: 'How many muzzleloader seasons does Vermont have?', a: "Two in 2026: a four-day October season from Oct. 29 to Nov. 1, and a December season from Nov. 30 to Dec. 13, right after the rifle season. Both are statewide, according to the 2026 Vermont hunting and trapping seasons calendar." },
    ],
  },
  VA: {
    resume: `Virginia sets the firearms deer season by county. On private lands, it opens on Nov. 14, 2026 everywhere, but it closes on Dec. 12 in western counties such as Augusta, Rockbridge, Smyth and Washington and on Jan. 2, 2027 in eastern counties such as Caroline, Amelia, Cumberland and Gloucester. Early archery runs Oct. 3 to Nov. 13 statewide, early muzzleloader Oct. 31 to Nov. 13 where muzzleloaders are allowed, and late archery from Nov. 29 to Jan. 2. West of the Blue Ridge, a late muzzleloader season runs Dec. 12 to Jan. 2. Urban archery starts in September in participating cities and towns, and the youth and apprentice weekend falls on Sept. 26 and 27. A resident pays $28 for the license to hunt and $28 for the deer and turkey license.`,
    zones: `The Virginia Department of Wildlife Resources (DWR) sets the firearms closing date and the either-sex days county by county. Chesapeake, Suffolk east of the Dismal Swamp line and Virginia Beach have their own calendar.`,
    check: `Look up your county's closing date and either-sex days before you plan a December hunt. Late muzzleloader is open only west of the Blue Ridge.`,
    faqs: [
      { q: 'When does deer season end in eastern Virginia?', a: "On private lands in eastern counties such as Caroline, Amelia, Cumberland and Gloucester, the firearms season runs Nov. 14, 2026 to Jan. 2, 2027. Western counties such as Augusta, Rockbridge, Smyth and Washington close on Dec. 12. Late archery runs statewide to Jan. 2, with county exceptions." },
      { q: 'How much is a Virginia deer license for a nonresident?', a: "DWR lists $136 for the nonresident one-year license to hunt and $136 for the deer and turkey license: $272 in total before fees. A resident pays $28 and $28, so $56. Both licenses are for hunters 16 or older, according to the DWR license page." },
    ],
  },
  WV: {
    resume: `West Virginia's buck firearms season opens on the Monday of Thanksgiving week, Nov. 23, 2026, and runs two weeks, to Dec. 6. Archery and crossbow hunting are open from Sept. 26 to Dec. 31, and muzzleloader from Dec. 14 to 20. Antlerless deer have a split season in selected counties, in October, around the buck season and at the end of December. Youth hunters and Class Q and Class XS license holders have Oct. 17 and 18 and Dec. 26 and 27. The year closes with the Mountaineer Heritage season, Jan. 14 to 17, 2027, for deer, bear and turkey. The West Virginia Division of Natural Resources (WVDNR) also prints a fall turkey split season in select counties and spring 2027 dates: youth on Apr. 17 and 18, then Apr. 19 to May 23 for bearded birds.`,
    zones: `WVDNR keeps buck, archery and muzzleloader dates statewide. Antlerless and fall turkey seasons are open only in the counties it lists, and some fall-turkey counties run the second part to Nov. 15 instead of Nov. 1.`,
    check: `Antlerless hunting depends on your county: check the WVDNR list before taking a doe. Class Q and Class XS are special licenses for qualifying hunters.`,
    faqs: [
      { q: 'What is the Mountaineer Heritage season in West Virginia?', a: "A four-day season, Jan. 14 to 17, 2027, open for deer, bear and turkey, as listed in the WVDNR 2026-2027 season dates. It is the last deer period of the West Virginia year, after archery and crossbow close on Dec. 31." },
      { q: 'When is West Virginia buck season 2026?', a: "Nov. 23 to Dec. 6, 2026, statewide: two weeks starting on the Monday of Thanksgiving week. Muzzleloader follows from Dec. 14 to 20. Antlerless days in selected counties overlap the buck season from Nov. 23 to Dec. 6, and archery and crossbow hunting stays open from Sept. 26 to Dec. 31." },
    ],
  },
  WI: {
    resume: `Wisconsin's nine-day gun deer season opens the Saturday before Thanksgiving, Nov. 21, 2026, and runs to Nov. 29. A muzzleloader season follows from Nov. 30 to Dec. 9, then a statewide December antlerless-only hunt from Dec. 10 to 13 and, in select farmland (Zone 2) counties, an antlerless-only holiday hunt from Dec. 24 to Jan. 1, 2027. Archery and crossbow seasons run Sept. 12 to Jan. 3, and to Jan. 31 in metro sub-units and extended-archery counties. Youth and disabled hunters have a gun weekend on Oct. 10 and 11. The Wisconsin Department of Natural Resources (DNR) also sets a fall turkey season, Sept. 12 to Jan. 3, and three duck zones. A gun deer license costs $24 for a resident and $200 for a nonresident.`,
    zones: `Wisconsin DNR sets deer dates statewide, with two exceptions: extended archery runs to Jan. 31 in metro sub-units and listed counties, and the holiday hunt is open only in select Farmland (Zone 2) counties. Duck hunters choose among the Northern, Southern and Open Water zones.`,
    check: `For spring turkey 2027, the permit application deadline is Dec. 10; the spring periods were not yet posted when we read the page.`,
    faqs: [
      { q: 'When is Wisconsin gun deer season 2026?', a: "Nov. 21 to Nov. 29, 2026: the nine-day season opens the Saturday before Thanksgiving. Muzzleloader runs Nov. 30 to Dec. 9, then a December antlerless-only hunt Dec. 10 to 13. Archery and crossbow stay open from Sept. 12 to Jan. 3, 2027." },
      { q: 'When does duck season open in northern Wisconsin?', a: "In the Northern Duck Zone, Sept. 26, 2026, running to Nov. 24 without a break. The Southern zone opens Oct. 3 with a split (Oct. 3 to 11, then Oct. 17 to Dec. 6) and the Open Water zone runs Oct. 17 to Dec. 15." },
    ],
  },
};

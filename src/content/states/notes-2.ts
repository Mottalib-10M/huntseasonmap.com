/** Handwritten notes, states 7 to 12 (IA, LA, ME, MS, MO, MT). Facts from src/data/seasons.json only. */
import type { StateNote } from '../../lib/state-pages';

export const NOTES_2: Record<string, StateNote> = {
  IA: {
    resume: `Iowa holds its shotgun deer hunting in December: the first regular gun season runs five days, Dec. 5 to 9, 2026, and the second runs nine days, Dec. 12 to 20. Bowhunters start on Oct. 1 and hunt to Dec. 4, then come back from Dec. 21 to Jan. 10, 2027, the same dates as the late muzzleloader season. The early muzzleloader season is Oct. 17 to 25. Youth and disabled hunters have a long window first, from Sept. 19 to Oct. 4. Nonresidents get a holiday season from Dec. 24 to Jan. 2, and a January antlerless season runs Jan. 11 to 24 in counties where quotas remain. The Iowa DNR also prints fall turkey dates: archery only from Oct. 1, and gun or bow from Oct. 12 to Dec. 4. A resident pays $35 for the hunting license and habitat fee, plus $33 for an any-sex deer tag.`,
    zones: `The Iowa Department of Natural Resources (DNR) sets statewide dates for every method; what varies is the tag you hold and the county. The January antlerless season depends on county quotas that remain unfilled.`,
    check: `Read the season printed on your tag before you go. The nonresident any-sex and antlerless combination is drawn, and the holiday season is a nonresident season.`,
    faqs: [
      { q: 'When is shotgun season in Iowa in 2026?', a: "The first regular gun season runs Dec. 5 to 9, 2026 and the second Dec. 12 to 20. Both are statewide. Archery closes for them: it runs Oct. 1 to Dec. 4, then reopens Dec. 21 to Jan. 10, 2027, the same dates as the late muzzleloader season." },
      { q: 'How much does a nonresident pay to hunt deer in Iowa?', a: "The DNR lists $146 for the nonresident hunting license and habitat fee ($131 plus $15), and $498 for the any-sex and antlerless tag combination, which is drawn: $644 in total before vendor fees. A resident pays $35 for the license and habitat fee and $33 for an any-sex tag, $68 in total." },
    ],
  },
  LA: {
    resume: `Louisiana sets deer dates by area, ten in all, and the gap between them is wide. In Area 3, archery opens on Sept. 19, 2026 and gun hunting (still-hunt only) on Oct. 17; in Area 2, the still-hunt firearms season opens on Oct. 31; in Area 1, in the north-east parishes such as Tensas and Madison, it waits until Nov. 21. Each area then switches to firearms with or without dogs later in the season: from Nov. 30 in Area 3, Dec. 10 in Area 2, Dec. 12 in Area 1. Primitive firearms (muzzleloaders) get two short windows per area, and a youth and veterans week opens each area's calendar. The Louisiana Department of Wildlife and Fisheries (LDWF) printed these dates in its 2026-2027 regulations, updated on Oct. 16, 2026. A resident pays $20 for basic hunting plus $15 for the deer license.`,
    zones: `Area 1 covers Concordia, East Carroll, Franklin, Madison, Richland, Tensas and West Carroll parishes; Area 2 covers north-west parishes such as Caddo, Bossier and Natchitoches. The table gives Areas 1, 2 and 3; the other seven areas are in the LDWF regulations.`,
    check: `Find your parish on the LDWF area map before you plan: the same date can be open in Area 3 and closed in Area 1. Some periods are bucks only, and dogs are allowed only in the "with or without dogs" periods.`,
    faqs: [
      { q: 'When can you hunt deer with dogs in Louisiana?', a: "Only in the firearms periods marked \"with or without dogs\": from Nov. 30, 2026 in Area 3, from Dec. 10 in Area 2 and from Dec. 12 in Area 1. Earlier firearms periods in each of these areas are still-hunt only. The seven other Louisiana deer areas have their own dates in the LDWF regulations." },
      { q: 'What does the Louisiana deer license include?', a: "The LDWF license table says the deer license ($15 resident, $100 nonresident) includes the deer tags and covers archery and primitive firearms. It is bought on top of the basic hunting license ($20 resident, $200 nonresident), so a deer hunt costs a resident $35 and a nonresident $300 before fees." },
    ],
  },
  ME: {
    resume: `Maine forbids hunting on Sunday, so every Maine season below is open on its dates except Sundays. The firearms season for deer runs from Nov. 2 to Nov. 28, 2026 in all wildlife management districts (WMDs), and it is preceded by a day reserved to Maine residents on Saturday, Oct. 31. Regular archery runs Oct. 3 to 30, and expanded archery in designated areas runs much longer, from Sept. 12 to Dec. 12. Youth hunters have Oct. 23 and 24. After the rifle weeks, the muzzleloader season runs Nov. 30 to Dec. 5 statewide and a second week, Dec. 7 to 12, in WMDs 12 to 18 and 20 to 29. A hunter may take only one antlered deer a year in Maine. The fall turkey season, archery or shotgun, runs Sept. 14 to Nov. 7 in most districts.`,
    zones: `The Maine Department of Inland Fisheries and Wildlife (MDIFW) uses wildlife management districts (WMDs). The firearms and regular archery dates are the same in all of them; expanded archery and the second muzzleloader week depend on the district.`,
    check: `Leave Sundays out of your plans: the checker on this page shows a Sunday inside a Maine season as closed. Only one antlered deer may be taken a year, whatever the method.`,
    faqs: [
      { q: 'Is deer hunting allowed on Sunday in Maine?', a: "No. MDIFW states that hunting is prohibited on Sunday and that its season dates are inclusive except Sundays. The firearms season of Nov. 2 to 28, 2026 therefore has three closed Sundays, Nov. 8, 15 and 22. The checker on this page shows any Sunday inside a Maine season as closed." },
      { q: 'What is resident only day in Maine?', a: "The Saturday before the firearms season, Oct. 31, 2026, when only Maine residents may hunt deer with firearms in every wildlife management district. The season for everyone opens on Monday, Nov. 2, because Sunday, Nov. 1 is closed to hunting in Maine." },
    ],
  },
  MS: {
    resume: `Mississippi opens its deer year with a three-day archery velvet season, Sept. 11 to 13, 2026, for one legal buck with a permit. Regular archery follows on Oct. 1 in the Delta, North Central and Hills units and on Oct. 15 in the Southeast unit, and runs to Nov. 20. Gun hunting with dogs opens Nov. 21, runs to Dec. 1, and comes back from Dec. 24 to Jan. 20, 2027; between those blocks come a primitive weapon season, Dec. 2 to 15, and a gun season without dogs, Dec. 16 to 23. Youth hunters 15 and under have a long season from Nov. 7, on private land until Jan. 31. The Southeast unit adds Feb. 1 to 15 for legal bucks. The Department of Wildlife, Fisheries, and Parks (MDWFP) also prints spring 2027 turkey dates and the 2026-27 duck season.`,
    zones: `MDWFP divides the state into four deer units: Delta, North Central, Hills and Southeast. The first three share one calendar; the Southeast unit follows the same gun calendar but opens archery later and adds February days. Antler rules differ by unit.`,
    check: `Know whether a period allows dogs: Mississippi alternates gun seasons with and without dogs. Read the antler rule of your unit before taking a buck.`,
    faqs: [
      { q: 'What is the archery velvet season in Mississippi?', a: "A three-day archery season, Sept. 11 to 13, 2026, that needs a permit and allows one legal buck, at the time of year when antlers are still in velvet. Regular archery then opens on Oct. 1 in the Delta, North Central and Hills units and Oct. 15 in the Southeast unit." },
      { q: 'When does Mississippi deer season end?', a: "On Jan. 31, 2027 in the Delta, North Central and Hills units, with archery and primitive weapons from Jan. 21; gun hunting with dogs ends Jan. 20. In the Southeast unit, archery and primitive weapons continue for legal bucks to Feb. 15. The youth season on private land also runs to Jan. 31." },
    ],
  },
  MO: {
    resume: `Missouri's firearms deer season is cut into portions. The November portion, the one most hunters wait for, runs eleven days, Nov. 14 to 24, 2026, statewide. Youth portions come before and after it (Oct. 24 and 25, then Nov. 27 to 29), antlerless portions are open in select counties (Oct. 9 to 11 and Dec. 5 to 13), and an alternative methods portion runs from Dec. 26 to Jan. 5, 2027. Archery opens Sept. 15, pauses for the November portion, and reopens from Nov. 25 to Jan. 15. The Missouri Department of Conservation (MDC) sells deer permits without a separate base license: a resident pays $19.50 for the firearms any-deer permit and a nonresident $360. A resident fishing permit costs $14.`,
    zones: `MDC uses statewide dates for every portion except the antlerless ones, which are open only in the counties MDC lists.`,
    check: `Archers should note the break: archery is closed during the November firearms portion, from Nov. 14 to 24. Antlerless portions are open only in select counties.`,
    faqs: [
      { q: 'Can you bowhunt in Missouri during the November firearms portion?', a: "No. MDC closes archery deer hunting from Nov. 14 to 24, 2026, the eleven days of the November firearms portion. Archery runs Sept. 15 to Nov. 13, then reopens from Nov. 25 to Jan. 15, 2027, which overlaps the alternative methods portion of Dec. 26 to Jan. 5." },
      { q: 'What is the alternative methods portion in Missouri?', a: "A firearms portion from Dec. 26, 2026 to Jan. 5, 2027, limited to the alternative methods MDC lists on its deer season page. It is the last firearms portion of the Missouri season, after the November portion (Nov. 14 to 24) and the late youth and antlerless portions." },
    ],
  },
  MT: {
    resume: `Montana's general deer season, with rifles, runs five weeks: Oct. 24 to Nov. 29, 2026 in most hunting districts. Archery-only hunting comes first, from Sept. 5 to Oct. 18, and a two-day youth deer hunt falls on Oct. 15 and 16. Three backcountry districts, 150, 280 and 316, open their general season on Sept. 15. A muzzleloader season runs Dec. 12 to 20 statewide. Montana Fish, Wildlife & Parks (FWP) gives these dates as a general reference and adds shoulder seasons, between Aug. 15 and Feb. 15, in some districts. A nonresident deer combination license, which includes a general deer license, fishing and upland birds, costs $704; residents pay $16 for the general deer license on top of their base licenses.`,
    zones: `FWP sets general dates for most hunting districts and lists exceptions district by district: backcountry districts, shoulder seasons and limited permits. The district printed on your license or permit decides.`,
    check: `Read your district in the 2026 regulations before a shoulder-season hunt: shoulder seasons exist only in some districts.`,
    faqs: [
      { q: 'When does Montana rifle deer season open in 2026?', a: "The general season opens Oct. 24, 2026 and closes Nov. 29 in most hunting districts. In backcountry districts 150, 280 and 316 it opens earlier, on Sept. 15. Archery-only hunting runs Sept. 5 to Oct. 18 before it, and muzzleloader Dec. 12 to 20 after it." },
      { q: 'How much is a nonresident deer license in Montana?', a: "FWP lists the Nonresident Deer Combination, General, at $704. It includes a general deer license, fishing and upland birds. Residents pay $16 for the general deer license on top of the base licenses they need, which we did not add, so no resident total is shown on this site." },
    ],
  },
};

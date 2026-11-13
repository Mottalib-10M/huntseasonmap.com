/** Handwritten notes, states 13 to 18 (NC, ND, OH, OK, PA, SD). Facts from src/data/seasons.json only. */
import type { StateNote } from '../../lib/state-pages';

export const NOTES_3: Record<string, StateNote> = {
  NC: {
    resume: `North Carolina staggers its deer seasons from east to west. Archery opens statewide on Sept. 12, 2026, but gun season opens on Oct. 17 in the Northeastern and Southeastern zones, Nov. 14 in the Central zone, Nov. 21 in the Northwestern zone and Nov. 28 in the Western zone. Each zone has a two-week blackpowder (muzzleloader) season right before its gun opener, and archery stops when blackpowder starts. Every zone then hunts with guns until Jan. 1, 2027. Antlerless dates match the antlered ones in most counties but are shorter in several western mountain counties. The CWD management areas around Cumberland and Sampson, and Forsyth, Stokes, Surry, Wilkes and Yadkin counties, add an early season on Aug. 22 and 23. Spring 2027 turkey season runs Apr. 17 to May 15, after a youth weekend on Apr. 10 and 11.`,
    zones: `The Wildlife Resources Commission (NCWRC) uses five deer zones, printed in its season-dates sheet for July 1, 2026 to June 30, 2027. The Northeastern and Southeastern zones share one calendar; Central, Northwestern and Western each open later.`,
    check: `Check your county's zone before the gun opener: a five-week gap separates the eastern and western openers. Antlerless days are shorter in some mountain counties.`,
    faqs: [
      { q: 'When does gun season open in eastern North Carolina?', a: "On Oct. 17, 2026 in the Northeastern and Southeastern zones, after blackpowder from Oct. 3 to 16 and archery from Sept. 12 to Oct. 2. Gun season there runs to Jan. 1, 2027, eleven weeks, the longest gun season of the five North Carolina zones." },
      { q: 'What is the early CWD deer season in North Carolina?', a: "An added season on Aug. 22 and 23, 2026 in the chronic wasting disease (CWD) management areas: Cumberland and Sampson counties, and Forsyth, Stokes, Surry, Wilkes and Yadkin counties. It comes three weeks before archery opens statewide on Sept. 12." },
    ],
  },
  ND: {
    resume: `North Dakota's regular deer gun season runs Nov. 6 to 22, 2026, in all units. Bowhunting lasts four months, from Sept. 4, 2026 to Jan. 3, 2027, but nonresident bowhunters may hunt only on private land, not on PLOTS (Private Land Open To Sportsmen) tracts, during the first nine and a half days. The youth season, for residents only, runs Sept. 18 to 27, and the muzzleloader season for white-tailed deer runs Nov. 27 to Dec. 13. Gun and muzzleloader licenses are drawn by lottery. The North Dakota Game and Fish Department (NDGF) charges $35 for a resident gun or muzzleloader license and $350 for a nonresident, plus a fishing, hunting and furbearer certificate and a general game and habitat license.`,
    zones: `NDGF issues gun licenses by deer unit and type through the lottery, but the 2026 season dates are the same for every unit. Bow licenses are statewide.`,
    check: `Nonresident bowhunters: stay on private land outside PLOTS until the first nine and a half days of the season have passed. Gun hunters need a lottery license for the unit they hunt.`,
    faqs: [
      { q: 'When is North Dakota deer gun season 2026?', a: "Nov. 6 to Nov. 22, 2026, in all units, for hunters who drew a gun license in the lottery. The muzzleloader season for white-tailed deer follows from Nov. 27 to Dec. 13, and the bow season runs from Sept. 4, 2026 to Jan. 3, 2027." },
      { q: 'What does a North Dakota deer license cost in all?', a: 'NDGF lists $35 resident and $350 nonresident for the gun or muzzleloader license. The deer guide adds the fishing, hunting and furbearer certificate ($2 resident, $5 nonresident) and a general game and habitat license ($20) or a combination license. Nonresident gun applicants also pay a $5 application fee.' },
    ],
  },
  OH: {
    resume: `Ohio's deer gun season is a week and a weekend: Nov. 30 to Dec. 6, 2026, then Dec. 19 and 20. Youth hunters have the gun weekend before, Nov. 21 and 22, and muzzleloader hunters get four days in January, Jan. 2 to 5, 2027. Archery is the long season, Sept. 26 to Feb. 7, statewide. In the disease surveillance area, where Ohio tracks chronic wasting disease, archery opens two weeks early on Sept. 12 and an early gun season runs Oct. 10 to 12. Only one antlered deer may be taken in Ohio, whatever the method. County bag limits rose to three in Defiance, Paulding and Warren counties, and are two in Athens, Meigs and Washington. These dates were approved by the Ohio Wildlife Council and announced by the Department of Natural Resources (ODNR) on May 4, 2026.`,
    zones: `ODNR sets statewide dates, with two exceptions: the disease surveillance area, which opens archery and gun earlier, and the county bag limits, which change the number of deer you may take, not the dates.`,
    check: `Keep your one antlered deer in mind across all seasons. If you hunt in the disease surveillance area, the early archery and early gun dates apply there only.`,
    faqs: [
      { q: 'When is Ohio deer gun season 2026?', a: "Nov. 30 to Dec. 6, 2026, plus Dec. 19 and 20. The youth gun season is Nov. 21 and 22, and the muzzleloader season Jan. 2 to 5, 2027. In the disease surveillance area, an early gun season also runs Oct. 10 to 12." },
      { q: 'When is Ohio muzzleloader season?', a: "Jan. 2 to Jan. 5, 2027, statewide, according to the 2026-27 seasons approved by the Ohio Wildlife Council and announced on May 4, 2026. It comes after both parts of the gun season. Only one antlered deer may be taken in Ohio, whatever the method." },
    ],
  },
  OK: {
    resume: `Oklahoma's deer gun season runs 16 days, Nov. 21 to Dec. 6, 2026, statewide, and an antlerless holiday gun season follows from Dec. 18 to 31. Archery is open from Oct. 1, 2026 to Jan. 15, 2027; the youth deer gun weekend is Oct. 16 to 18 and muzzleloader Oct. 24 to Nov. 1. The Oklahoma Department of Wildlife Conservation (ODWC) also sets turkey and duck seasons on the same page: fall turkey with archery from Oct. 1 and with guns from Oct. 31 to Nov. 20, spring turkey from Apr. 16 to May 16, 2027, and duck season in zones 1 and 2 from Nov. 14 to Dec. 6 and Dec. 12 to Jan. 31. An adult resident pays $36 for the annual hunting license and $36 for the deer gun license; a nonresident pays $209 and $501.`,
    zones: `Deer and turkey dates are statewide in Oklahoma. Ducks are the exception: zones 1 and 2 share one split season, while the Panhandle runs a single long season from Oct. 10 to Jan. 13.`,
    check: `The deer gun license includes the season bag limit, so read what it covers before you buy. In the Panhandle, duck season opens five weeks before the rest of the state.`,
    faqs: [
      { q: 'When is Oklahoma rifle deer season 2026?', a: "Nov. 21 to Dec. 6, 2026, statewide, followed by the holiday antlerless gun season from Dec. 18 to 31. Muzzleloader runs earlier, Oct. 24 to Nov. 1, and youth hunters have Oct. 16 to 18. Archery stays open from Oct. 1 to Jan. 15, 2027." },
      { q: 'How much is a nonresident deer license in Oklahoma?', a: "ODWC lists $209 for the nonresident annual hunting license and $501 for the nonresident deer gun license, which includes the season bag limit: $710 in total before fees. A resident adult pays $36 and $36, so $72. These prices were read on the ODWC license fee page." },
    ],
  },
  PA: {
    resume: `Pennsylvania's regular firearms deer season opens on Saturday, Nov. 28, 2026, and runs to Dec. 13, for antlered and antlerless deer. For 2026-27 the Game Commission includes the Sundays that fall inside season dates, except for migratory game birds such as ducks. Archery runs Oct. 3 to Nov. 20 and Dec. 26 to Jan. 24, 2027; in Wildlife Management Units (WMUs) 2B, 5C and 5D it opens earlier, on Sept. 19, and runs to Nov. 27. The flintlock season follows from Dec. 26 to Jan. 24. Before the rifle weeks, an antlerless muzzleloader season runs Oct. 17 to 25 and special antlerless firearms days for junior, senior, disabled-permit and active-duty hunters Oct. 22 to 25. The general hunting license costs $20.97 for an adult resident and carries the antlered deer tag.`,
    zones: `The Pennsylvania Game Commission (PGC) sets most deer dates statewide and makes exceptions by WMU, mainly the early archery and extended antlerless firearms seasons in 2B, 5C and 5D. Fall turkey and duck dates depend on the WMU or zone.`,
    check: `Sundays inside a season are open for deer in 2026-27, but never for ducks or other migratory birds. Fall turkey is closed in WMUs 5C and 5D.`,
    faqs: [
      { q: 'Can you hunt deer on Sundays in Pennsylvania in 2026?', a: "Yes. The Game Commission says its 2026-27 seasons include the Sundays that fall within their dates, except for migratory game birds such as ducks. Deer, turkey and other game may therefore be hunted on a Sunday inside an open season, while duck seasons stay closed on Sundays." },
      { q: 'When is spring gobbler season in Pennsylvania in 2027?', a: "May 1 to May 31, 2027, statewide, after the junior and mentored youth hunt on Apr. 24 and 25. Hunting hours end at noon from May 1 to 15. Fall turkey dates for 2026 differ by Wildlife Management Unit, and WMUs 5C and 5D are closed to fall turkey." },
    ],
  },
  SD: {
    resume: `South Dakota opens the archery deer season on Sept. 1, 2026 and keeps it open to Jan. 1, 2027, and archery licenses stay on sale through the season. Firearm seasons differ by region: the Black Hills season runs all of November, the West River season Nov. 14 to 29, and the East River season Nov. 21 to Dec. 6. The muzzleloader season runs Dec. 1 to Jan. 1. Apprentice and mentored hunters have a season from Sept. 12 to Jan. 1. Firearm and muzzleloader licenses are drawn in June, so the dates matter only to hunters who hold one. South Dakota Game, Fish and Parks (GFP) also lists a fall prairie turkey season from Nov. 1 to Jan. 31. An archery license for one any deer costs $45 for a resident and $375 for a nonresident.`,
    zones: `GFP splits firearm deer hunting into three regions with their own dates: the Black Hills, West River and East River. Archery and muzzleloader dates are statewide.`,
    check: `Rifle hunters need a license drawn in June for one region. An archer can still buy a license during the season.`,
    faqs: [
      { q: 'When is East River deer season in South Dakota?', a: "Nov. 21 to Dec. 6, 2026. West River runs Nov. 14 to 29 and the Black Hills Nov. 1 to 30. All three need a firearm license drawn in June. The statewide muzzleloader season follows from Dec. 1, 2026 to Jan. 1, 2027." },
      { q: 'Can I still buy a South Dakota archery deer license in the fall?', a: "Yes. GFP says archery licenses stay on sale through the season, which runs Sept. 1, 2026 to Jan. 1, 2027. A resident license for one any deer costs $45 and a nonresident license $375. Firearm and muzzleloader licenses, by contrast, are drawn in June." },
    ],
  },
};

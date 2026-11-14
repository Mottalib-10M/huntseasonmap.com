/** Handwritten notes, states 1 to 6 (AL, AR, CO, CT, GA, IL). Facts from src/data/seasons.json only. */
import type { StateNote } from '../../lib/state-pages';

export const NOTES_1: Record<string, StateNote> = {
  AL: {
    resume: `Alabama runs one of the longest deer calendars in the country: in Zone A, bowhunters may stalk deer from Oct. 15, 2026 to Feb. 10, 2027, and the gun season on private or leased land opens on Nov. 21 and also closes on Feb. 10. Before that, a special youth gun weekend for hunters under 16 runs Nov. 13 to 16 across Zones A, B, C and the chronic wasting disease (CWD) management zone, followed by a muzzleloader and air rifle week from Nov. 16 to 20. Hunting deer with dogs is still allowed in parts of Zone A, from Nov. 21 to Jan. 15. The state splits deer hunting into five zones, A to E, so the first thing to read is the zone of the land you hunt. Turkey and duck dates for 2026-27 are on the same agency site and in the tables below.`,
    zones: `Outdoor Alabama prints separate calendars for Zones A, B, C, D, E and the CWD management zone. The checker at the top of this page gives Zone A; the other zones move the gun opener and the closing date. Public land with an open permit follows its own rules for bucks only and either-sex days.`,
    check: `Confirm your zone on the Outdoor Alabama map before planning a February hunt: the Feb. 10 closing date applies to Zone A. Dog deer hunting is allowed only where the agency lists it.`,
    faqs: [
      { q: 'Can you hunt deer with dogs in Alabama in 2026?', a: "Yes, in the parts of Zone A where Outdoor Alabama allows it. The dog deer season on private or leased land runs Nov. 21, 2026 to Jan. 15, 2027, alongside the stalk-hunting gun season that opens the same day. After Jan. 15, only stalk hunting with a gun continues, to Feb. 10. Other zones have their own dog-hunting dates, so check your zone first." },
      { q: 'How old do you have to be for the Alabama youth deer weekend?', a: "Under 16. The special youth gun season runs Nov. 13 to 16, 2026 in Zones A, B, C and the CWD management zone, the week before the general gun opener of Nov. 21. It is followed by the special muzzleloader and air rifle season from Nov. 16 to 20 in Zone A." },
    ],
  },
  AR: {
    resume: `Arkansas opens its deer year at the end of summer: an early buck-only archery season runs Aug. 29 to 31, 2026, then the regular archery season runs from Sept. 26 to Feb. 28, 2027, statewide. Gun hunters wait for the modern gun opener on Nov. 14 in Zone 1, which runs to Dec. 6 and reopens Dec. 26 to 28. Muzzleloader hunters get two windows in Zone 1: Oct. 17 to 25 and Dec. 12 to 14. Youth hunters have two weekends, Nov. 7 and 8 and Jan. 2 and 3. Arkansas counts 17 deer zones, and some of them close the November gun hunt on Nov. 22 while others run it to Dec. 13. A resident sportsman's license costs $25 and carries six deer tags; a nonresident all-game license costs $410.`,
    zones: `The Arkansas Game and Fish Commission (AGFC) splits the state into 17 deer zones. Archery and the youth hunts are statewide; the modern gun and muzzleloader dates in the table are those of Zone 1, and other zones end earlier or later.`,
    check: `Look up your zone before the November gun opener: some zones close on Nov. 22, others run to Dec. 13. Wildlife management areas (WMAs) can set their own youth dates.`,
    faqs: [
      { q: 'What is the early archery season in Arkansas?', a: "A three-day buck-only archery hunt from Aug. 29 to Aug. 31, 2026, statewide. The regular archery season then opens on Sept. 26 and runs all the way to Feb. 28, 2027, the longest closing date among the 24 states we read. Archery dates are the same in all 17 Arkansas deer zones." },
      { q: 'Do I need to buy deer tags separately in Arkansas?', a: "No. The AGFC fee list says the Resident Sportsman's License ($25) and the Nonresident Annual All Game Hunting License ($410) each come with six deer tags, so the total cost of a deer hunt is the license price alone, before agent fees." },
      { q: 'Is the Arkansas muzzleloader season the same in every zone?', a: "No. The dates read for Zone 1 are Oct. 17 to 25 and Dec. 12 to 14, 2026, under the name alternative firearms (muzzleloader). The AGFC sets muzzleloader and modern gun dates zone by zone across its 17 deer zones, so look up your zone on the AGFC deer seasons page before you plan." },
    ],
  },
  CO: {
    resume: `Colorado has no over-the-counter deer season: every deer license is limited and issued by game management unit (GMU) through the draw, and the dates come from the 2025-2029 Big Game Season Structure adopted by the Parks and Wildlife Commission. West of Interstate 25, archery runs Sept. 2 to 30, 2026 and muzzleloader Sept. 12 to 20. The rifle seasons are numbered: the second regular rifle season (deer and elk) runs Oct. 24 to Nov. 1, the third Nov. 7 to 15 and the fourth Nov. 18 to 22. East of Interstate 25 (I-25), plains rifle runs Oct. 24 to Nov. 3, and plains archery is split into three blocks from October to the end of December. The late plains rifle season, where offered, runs Dec. 1 to 14. Which of these you may hunt depends on the license you drew.`,
    zones: `Colorado Parks and Wildlife (CPW) sets dates for the mountains west of I-25 and for the plains to the east. Your license names a GMU and a season, and only that pairing is open to you; the high-country deer season (Sept. 12 to 20) is limited to select units.`,
    check: `Check the GMU and season printed on your license: a date being open in the table does not open it for you. Rifle seasons for deer and elk overlap west of I-25.`,
    faqs: [
      { q: 'Can I buy a deer license over the counter in Colorado?', a: "No. CPW issues every deer license through the limited draw, by game management unit and season, whether you hunt with a bow, a muzzleloader or a rifle. The dates on this page only tell you when each season runs. A season shown open is open to you only if your drawn license names that unit and season." },
      { q: 'Is there a first rifle season for deer in Colorado?', a: 'Under the 2025-2029 season structure, the first regular rifle season is an elk season in which deer hunting is optional: five days opening on the first Wednesday after Oct. 8, which by that rule is Oct. 14 to 18, 2026. The combined deer and elk seasons start with the second regular rifle season, Oct. 24 to Nov. 1.' },
    ],
  },
  CT: {
    resume: `Connecticut keeps deer archery open for a long stretch on private land: from Sept. 15 to Dec. 31, 2026, in every zone. On state land, archery stops on Nov. 17 for the firearms weeks and comes back from Dec. 23 to 31. The firearms season, with shotgun, rifle or revolver on private land and shotgun with a no-lottery permit on state land, runs Nov. 18 to Dec. 8. Muzzleloader hunters follow on private land from Dec. 9 to Dec. 31. Junior hunters have training days from Nov. 7 to 14. Sunday deer hunting is allowed on private land only, and never within 40 yards of a blazed public trail. The dates come from the 2026 Connecticut Hunting and Trapping Guide published by the Department of Energy and Environmental Protection (DEEP).`,
    zones: `Connecticut DEEP uses deer management zones, but the 2026 dates differ mostly by land type: private land, where archery and muzzleloader run longer, and state land, where archery pauses for the firearms weeks and shotgun needs a permit.`,
    check: `On a Sunday, stay on private land and at least 40 yards from blazed public trails. State land needs the right permit for the firearms season.`,
    faqs: [
      { q: 'Can you hunt deer on Sunday in Connecticut?', a: "Yes, on private land only, and not within 40 yards of blazed public trails, according to the 2026 Connecticut Hunting and Trapping Guide. State land stays closed to deer hunting on Sundays. The checker on this page does not apply that land rule, so a Sunday inside a season is shown as open." },
      { q: 'When is the Connecticut muzzleloader deer season?', a: "On private land, Dec. 9 to Dec. 31, 2026, right after the firearms season ends on Dec. 8. Archery on private land overlaps it, since it runs from Sept. 15 to Dec. 31. The dates come from the 2026 Connecticut Hunting and Trapping Guide published by DEEP." },
    ],
  },
  GA: {
    resume: `Georgia gives deer hunters one of the simplest calendars to read: archery opened statewide on Sept. 12, 2026 and the firearms season opened on Oct. 17, and both run to Jan. 10, 2027 for most hunters. Bows remain legal through the whole season. The Wildlife Resources Division (WRD) announced each opener in a news release, which is what this page cites; some counties have extended firearms or archery dates listed in the 2026-27 regulations guidebook. Georgia's season limit is 10 antlerless deer and 2 antlered deer, and one of the two bucks must carry at least four points of one inch or more on one side, or have an outside spread of 15 inches. Turkey and duck dates for Georgia were not on the pages we could read.`,
    zones: `Georgia sets one statewide framework. The exceptions are county by county: a few counties add archery or firearms days beyond Jan. 10, and the guidebook lists them.`,
    check: `Count your bucks: the second antlered deer must meet the four-point or 15-inch rule. Check the guidebook if your county is one of those with extended dates.`,
    faqs: [
      { q: 'When does Georgia deer season end in 2027?', a: "On Jan. 10, 2027 for most hunters, for both archery and firearms, according to Georgia WRD. Archery opened on Sept. 12, 2026 and firearms on Oct. 17. Some counties have extended firearms or archery dates listed in the 2026-27 regulations guidebook, so check your county before planning a hunt after Jan. 10." },
      { q: 'What is the buck limit in Georgia?', a: "Two antlered deer a season, one of which must have at least four points of one inch or more on one side, or a 15-inch outside spread. The antlerless limit is 10, for a total of 12 deer. The limits come from the Georgia WRD announcement of the 2026 firearms opener." },
    ],
  },
  IL: {
    resume: `Illinois packs its firearm deer hunting into two short seasons: the first runs three days, Nov. 20 to 22, 2026, and the second four days, Dec. 3 to 6. Archery opens on Oct. 1 and, in counties with a firearm season, pauses around those weekends: it runs Oct. 1 to Nov. 19, Nov. 23 to Dec. 2, and Dec. 7 to Jan. 17, 2027. In Cook, DuPage, Lake and east Kane counties, where there is no firearm season, archery runs straight through to Jan. 17. The youth deer hunt is Oct. 10 to 12, the muzzleloader-only season Dec. 11 to 13, and late-winter and CWD seasons in designated counties fall on Dec. 31 to Jan. 3 and Jan. 15 to 17. All dates come from the Illinois Department of Natural Resources (IDNR).`,
    zones: `IDNR publishes statewide dates for each method, and the difference comes from the county: archery breaks for firearm weekends where a firearm season exists, and late-winter and chronic wasting disease (CWD) hunts are open only in designated counties.`,
    check: `Bowhunters in a firearm county should mark the two archery pauses around Nov. 20 to 22 and Dec. 3 to 6. Late-winter and CWD dates apply only in the counties IDNR lists.`,
    faqs: [
      { q: 'Can you bowhunt during the Illinois firearm season?', a: 'Not in counties open to firearm deer hunting: archery closes Nov. 20 to 22 and Dec. 3 to 6, 2026. In Cook, DuPage, Lake and east Kane counties, archery runs without a break from Oct. 1 to Jan. 17, 2027.' },
      { q: 'How long is the second Illinois firearm season?', a: "Four days, Dec. 3 to Dec. 6, 2026. The first firearm season is three days, Nov. 20 to 22. Between the two, archery reopens from Nov. 23 to Dec. 2 in counties with a firearm season. A muzzleloader-only season follows on Dec. 11 to 13." },
    ],
  },
};

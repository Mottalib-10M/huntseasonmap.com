import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { lByCode, LREAD, ranked } from '../../lib/engine/licenses';

const N = lByCode('NY');
const more = N.more ?? [];
const m = (t: string) => { const x = more.find((y) => y.t.startsWith(t)); if (!x) throw new Error(`NY: ${t}`); return x; };
const bow = m('Bowhunting'), muz = m('Muzzleloading'), turkey = m('Turkey'), dmp = m('Deer Management'), duck = m('Federal Duck');
const hunt = N.hunt!, fish = N.fish!;
const deerRes = hunt.res! + bow.res! + muz.res!, deerNon = hunt.non! + bow.non! + muz.non!;
const rk = ranked('hunt', 'res').findIndex((x) => x.s.code === 'NY') + 1, n = ranked('hunt', 'res').length;
const c = (x: number | null) => (x === null ? 'not printed' : K.usd(x));

export default definePage({
  id: 'nysdec-hunting-license', group: 'licenses', order: 54, slug: 'nysdec-hunting-license',
  nav: 'NYSDEC hunting license', card: 'New York hunting license, bowhunting and muzzleloading privileges, turkey and deer management permits, as priced by NYSDEC.',
  title: 'NYSDEC Hunting License 2026: Fees, Privileges and Permits',
  description: 'NYSDEC hunting license fees for 2026-27: the New York annual hunting license, bowhunting and muzzleloading privileges, turkey permit and DMP, and where to buy.',
  h1: 'NYSDEC hunting license: New York fees and privileges',
  intro: `The NYSDEC annual hunting license costs ${K.usd(hunt.res!)} for a New York resident aged 16 to 69 and ${K.usd(hunt.non!)} for a nonresident; bowhunting and muzzleloading privileges are added on top. Pick your residency to compare.`,
  resume: `The New York State Department of Environmental Conservation (NYSDEC, or DEC) sells one Annual Hunting License that covers both small game and big game, ${K.usd(hunt.res!)} for a resident aged 16 to 69 and ${K.usd(hunt.non!)} for a nonresident, ${rk ? `the ${rk}${rk === 1 ? 'st' : rk === 2 ? 'nd' : rk === 3 ? 'rd' : 'th'} lowest resident price of the ${n} states priced on this site` : ''}. No separate bear tag is needed. This license must be bought before any privilege: the Bowhunting Privilege (${K.usd(bow.res!)} resident, ${K.usd(bow.non!)} nonresident), the Muzzleloading Privilege (${K.usd(muz.res!)} and ${K.usd(muz.non!)}) and the Turkey Permit (${K.usd(turkey.res!)} and ${K.usd(turkey.non!)}). Antlerless deer in select Wildlife Management Units need a Deer Management Permit, ${K.usd(dmp.res!)}, applied for separately. A resident who hunts deer in all three seasons pays ${K.usd(deerRes)}, a nonresident ${K.usd(deerNon)}. Prices read on the DEC hunting license page on ${K.day(LREAD)}, before agent fees.`,
  faqs: [
    { q: 'How much is a NYSDEC hunting license?', open: true, a: `${K.usd(hunt.res!)} for a resident aged 16 to 69 and ${K.usd(hunt.non!)} for a nonresident aged 16 and older, read on ${K.day(LREAD)}. Residents 70 and older and juniors 12 to 15 pay $5. Bowhunting, muzzleloading and turkey are extra privileges or permits.` },
    { q: 'Where do I buy a New York hunting license?', a: `${N.online ?? 'From DEC.'} Printing at an agent can cost $1 more; printing and mailing fees are avoided with e-licenses and e-tags in the HuntFishNY app, or by printing at home from your online account.` },
    { q: 'What do I need to show to buy a New York hunting license?', a: `${N.he ?? 'A hunter education certificate.'} Residents also show proof of New York residency once.` },
  ],
  body: (h) => `
<h2>NYSDEC hunting license and privileges, resident and nonresident</h2>
${h.table(['License, privilege or permit', 'Resident', 'Nonresident'], [[hunt.t, c(hunt.res), c(hunt.non)], ...more.map((x) => [x.t, c(x.res), c(x.non)]), [`Fishing: ${fish.t}`, c(fish.res), c(fish.non)]], `NYSDEC adult prices read on ${K.day(LREAD)}`, ['l', 'r', 'r'])}
<h2>What a New York deer hunter buys</h2>
<p>The Annual Hunting License alone covers the regular firearms season for deer and bear. To hunt with a bow, add the Bowhunting Privilege; for the muzzleloader season, the Muzzleloading Privilege. Antlerless deer outside those tags need a Deer Management Permit in the units where DEC offers them. Waterfowl hunters add the federal duck stamp, ${K.usd(duck.res!)}, and free HIP registration in New York.</p>
${h.mini('tags', { t: 'New York deer permit next to other states', p: ['who'], d: { st: 'NY', who: 'res' } })}
<h2>New York next to other states</h2>
<p>Every state with a price read is on the ${h.a('hunting-license', 'hunting license by state')} page; no hunting and fishing combination is printed on the DEC pages we read, so hunters who fish buy both licenses, see ${h.a('hunting-and-fishing-license', 'hunting and fishing license by state')}. New York season dates were not readable for this site; NYSDEC prints them on its hunting seasons pages.</p>
`,
  tool: 'buy', toolArg: { st: 'NY' },
  related: ['hunting-license', 'hunting-tags', 'washington-hunting-license', 'hunting-and-fishing-license'],
  sources: ['lj_NY_0', 'lj_NY_1', 'buy_NY', 'usc_718b'],
});

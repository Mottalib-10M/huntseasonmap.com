/** llms.txt (RECETTE §21), generated from the page registry. */
import { PAGES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`, '',
    `> Hunting season dates by state for 2026-27: deer seasons of 24 US states (archery, muzzleloader, gun and youth periods by zone), turkey seasons of 12 and duck seasons of 6, plus adult license prices in 12, as printed by each state wildlife agency and read on November 13, 2026. A checker says whether a season is open on any date. States whose agency pages could not be read are left out. Federal duck stamp and HIP rules from 16 U.S.C. 718a-718b (govinfo) and 50 CFR part 20 (eCFR). Independent site published by Radif Partners, not a government site. Last updated ${LAST_UPDATED}.`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label}`, ...PAGES.filter((p) => p.group === g.id).map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.card}`), '']),
    '## About', `- [How the dates were read](${SITE_URL}${route('method', 'en')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

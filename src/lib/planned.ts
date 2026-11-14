/** Every page id the site is meant to have. Content tests accept links to these ids while pages are being written. */
import D from '../data/seasons.json';
export const PLANNED_GUIDES = [
  'deer-season-by-state', 'archery-season-by-state', 'turkey-season-by-state', 'duck-season-by-state',
  'hunting-license-cost-by-state', 'days-until-deer-season',
  'hunting-license', 'hunting-tags', 'hunting-and-fishing-license', 'washington-hunting-license', 'nysdec-hunting-license',
];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, ...(D as { states: Array<{ slug: string }> }).states.map((s) => s.slug)]);

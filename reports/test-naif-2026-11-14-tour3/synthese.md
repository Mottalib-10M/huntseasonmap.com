# Synthèse du test naïf du 2026-11-14 (3e tour, corrigé au 4e passage) : huntseasonmap.com

Notes : testeur 1 6/7/7, testeur 2 7/7/8, testeur 3 7/7/6. Version testée : 19cc0dc. Corrections retenues par
l'éditeur pour ce tour : couverture réelle dans Google et à l'accueil (1), couverture dite en tête de chaque page
d'État (2), lien vers la page officielle de l'agence pour les zones et espèces absentes et pour trouver sa zone (3).
Les corrections des tours 1 et 2 sont gardées.

| # | Difficulté relevée | Testeurs | Décision | Raison / correction |
|---|---|---|---|---|
| 1 | Google promet « deer, turkey and duck seasons in 24 states » ; dinde lue dans 12 États, canard dans 6, dates fusil d'une seule zone en Alabama (A), Arkansas (1), Louisiane (aires 1 à 3) | 1, 2, 3 | **corrigé** | Title « Hunting Season Dates by State 2026-27: Deer in 24 States » ; description « deer in 24 states, turkey in 12, duck in 6 » ; chiffres et liste des États partiels calculés depuis `seasons.json` (`gunUnread`, `lib/engine/seasons.ts`). Ligne sous la phrase-réponse de l'accueil (« Covered: deer in 24 states, turkey in 12, duck in 6; Alabama, Arkansas, Louisiana: some gun zones only. »), puis le détail « On this site / Not on this site » sous le vérificateur (zones manquantes, 16 États non couverts). Même alignement dans la page 404 et la page widget. |
| 2 | Pages État : « every period, zone and opening day » promis, zones manquantes découvertes dans le détail | 1, 2, 3 | **corrigé** | H1 « <État> deer season 2026-27: dates and opening days » ; title et description sans « by Zone » pour les 3 États partiels (« Gun dates for Zone A only… ») ; encadré sous l'intro (`coverOf`, `ContentPage.astro`) : ce qui est sur le site (espèces, zones), ce qui n'y est pas (zones sans dates fusil, dinde, canard). |
| 3 | Zone inconnue ou non couverte : aucune aide pour la trouver | 1, 2, 3 | **corrigé** | Lien vers la page de l'agence lue (première source de l'État dans `seasons.json`, déjà citée) dans l'encadré de chaque page État et dans le résultat du vérificateur des États à zones (« Find your zone and its dates: <agence>, <page> ») ; la ligne des zones absentes renvoie à ce lien. Aucune date ajoutée. |
| 4 | Page arc : « Archery » choisi, l'aide parle de « Gun / rifle » | 1, 2, 3 | **corrigé** (défaut objectif) | L'aide suit la méthode (`dynHelp`) : « Archery: bow or crossbow periods. », etc. |
| 5 | Accueil : « 15 more states could not be read » alors que la liste en compte 16 | — | **corrigé** (défaut objectif trouvé en corrigeant) | Le décompte coupait la liste sur « , » seulement (« California and South Carolina » comptait pour un). |
| 6 | « Main gun season » finie au Colorado, « Other gun periods: none » en Arkansas (muzzleloader et youth non comptés) | 1, 2, 3 | **non retenu** | Hors des corrections validées par l'éditeur pour ce tour ; à proposer au prochain. |
| 7 | Formulaire de 6 champs avant la réponse | 2, 3 | **non retenu** | Hors des corrections validées ; structure du vérificateur de la trame. |
| 8 | Jargon des noms de périodes et sigles (Special late, GMU, WMU, AGFC, DEEP) ; lexique trop bas | 1, 2, 3 | **non retenu** | Hors des corrections validées ; noms de périodes de l'agence. Les nouveaux encadrés nomment l'agence en toutes lettres. |
| 9 | « Map » sans carte | 1, 2 | **non retenu** | Comme aux tours 1 et 2 : chantier à part. |
| 10 | Pas de liste des États ouverts sous la phrase-réponse ; accueil trop long | 1, 2 | **non retenu** | Hors des corrections validées ; la page arc donne déjà la liste. |
| 11 | Adresse en France | 2, 3 | **non retenu** | Identité légale réelle de l'éditeur (Radif Partners), obligatoire. |
| 12 | Phrase d'accroche trop dense | 1 | **non retenu** | Un seul testeur, hors des corrections validées. |
| 13 | « Next new period », « Paused, back » | 3 | **non retenu** | Un seul testeur ; « Paused, back » est cité en « À garder » par les deux autres. |
| 14 | États absents (Michigan…) non dits dans le menu | 3 | **corrigé** (en partie) | L'encadré de l'accueil cite le nombre d'États non couverts et renvoie à leur liste ; le menu (trame) n'est pas touché. |

## Défauts de trame signalés
- `SelectIn` n'avait qu'une aide fixe : ajout de `dynHelp` (aide qui suit les autres champs), lu par `SpecTool`.
- `ToolOut` n'avait pas de lien de sortie : ajout de `link` (page officielle), rendu sous les lignes du résultat.
- `PageDef` / `ContentPage` n'avaient pas de bloc « ce que la page couvre » : ajout de `cover`, rendu sous l'intro.

## Fraîcheur
`npm run update-data` n'existe pas sur ce site (le workflow quotidien ne fait que `npx vitest run` et `npm run build`) :
rien à casser ; les tests et le build passent, le workflow `.github` n'est pas touché.

# Synthèse du test naïf du 2026-11-14 : huntseasonmap.com

Notes : testeur 1 6/6/7, testeur 2 7/7/8, testeur 3 6/6/8.

| # | Difficulté relevée | Testeurs | Décision | Raison / correction |
|---|---|---|---|---|
| 1 | « Open period ends », « Last day » et « Next opening » se contredisent (Texas : fin Jan. 17 alors que la North Zone ferme le Jan. 3, « Next opening » Jan. 4 avant le « Last day » Jan. 17 ; Arkansas : Feb. 28 = arc, pas carabine ; Colorado : Nov. 30 = arc) | 1, 2, 3 | **corrigé** | Défaut de calcul : `statusOn` prenait la fin la plus tardive de toutes les périodes ouvertes, toutes zones et méthodes mêlées. Il rend maintenant une fin par période ouverte (`ends`), et le résultat affiche une ligne par période, nommée avec sa zone (« General (gun) · North Zone : open until Jan. 3, 2027 »). « Next opening » devient « Next new period », nommée avec sa zone ; « reopens » quand c'est la 2e tranche d'une période ouverte. Tests TX, AR, AL ajoutés. |
| 2 | Le gros « Open » vaut pour l'État entier, pas pour la méthode (Alabama : arc et fusil des moins de 16 ans seulement, le fusil ouvre dans 7 jours) | 1, 2, 3 | **corrigé** | La méthode est demandée d'emblée (« Your method », hors du repli), fusil par défaut. Alabama le 14 nov. : « Closed », « opens Nov. 21, 2026, in 7 days », et « Open that day for other methods only: Archery (stalk hunting); Special youth gun (under 16) ». |
| 3 | Bandeau « Example with typical figures — change any figure… » sur un outil de dates | 1, 2, 3 | **corrigé** | Défaut de trame : SpecTool et SpecMini passaient `texte`/`aide` à MentionExemple, qui ne lisait que `suppose`. MentionExemple lit maintenant les deux ; le bandeau dit « Shown for November 14, 2026 — pick your state, game, method or another date to check it ». |
| 4 | « Already filled in: method Any method » | 1, 2, 3 | **corrigé** | La méthode n'est plus repliée : le repli a disparu de ce vérificateur. |
| 5 | Libellés en doublon : « Open: Archery; Archery », « General (gun) (North Zone); General (gun) (South Zone) » répété sous le statut | 1, 2, 3 | **corrigé** | Chaque période est nommée avec sa zone (« Archery · Private land, all zones, until Dec. 31, 2026 ») ; la ligne « Open that day » qui répétait le sous-titre est retirée ; « none left » devient « no other archery period in 2026-27 ». |
| 6 | Tableau de l'accueil : Colorado « Oct. 24 to Nov. 1 » contredit la page Colorado (fusil ouvert le 14 nov.) | 1, 2, 3 | **corrigé** | Colonne renommée « Headline gun season (one zone) » et colonne « Other gun periods » (« 4 more », lien vers la page de l'État). L'intro des pages État dit « the headline gun season … one of 10 deer periods listed below ». |
| 7 | « Turkey: read / Duck: - » incompris | 1, 2, 3 | **corrigé** | « dates on the state page » / « not covered yet ». |
| 8 | Paragraphes repliés coupés en pleine phrase (« opens between Oct. », « on Nov. », « on Aug. ») | 1, 2, 3 | **corrigé** | Défaut de trame (lib/clamp.ts) : les mois abrégés « Oct. », « Nov. »… suivis d'un chiffre étaient pris pour des fins de phrase. Ajoutés aux abréviations. |
| 9 | Même liste deux fois sur chaque page État (statut, puis jours) | 1, 2, 3 | **corrigé** | Une seule liste : le tableau du vérificateur porte la colonne « Days » et liste toutes les méthodes ; le tableau cerf du corps est retiré (dinde et canard gardent le leur). |
| 10 | Sigles non expliqués (CMZ, CWD, WMDs, WMAs, GMU, I-25, WRD, FWP, PLOTS) | 1, 2, 3 | **corrigé** | Zones réécrites en clair dans les données (« chronic wasting disease (CWD) zone », « wildlife management districts », « West of Interstate 25 », « wildlife management areas ») et sigles développés dans les notes ; doubles parenthèses supprimées. |
| 11 | « Days from Labor Day » inutile en novembre | 1, 2, 3 | **corrigé** | Colonne remplacée par « Archery opens before gun » (jours d'avance de l'arc) ; le compte à rebours, lui, part d'aujourd'hui. |
| 12 | « 64 days after this one » / « 22 days after this one » | 2, 3 | **corrigé** | « last day Dec. 6, 2026, 22 more days after today », une ligne par période. |
| 13 | « Deer season by state » deux fois dans le menu | 1, 2, 3 | **non retenu** | Ce sont deux choses : la page de comparaison (lien) et la rubrique qui liste les 24 pages État. Le menu vient de la trame (`nav.ts`), signalé. |
| 14 | Seulement 24 États, et pas de carte malgré le nom « Map » | 1, 2 | **non retenu** | Ne rien inventer : les 16 autres États n'ont pas pu être lus sur le site de l'agence (dit dans la FAQ et le repli « States not covered »). L'aide du champ dit « 24 states covered so far (list in the menu) ». Une carte cliquable est un chantier à part. |
| 15 | Adresse en France (Clermont-Ferrand) pour un site américain | 2, 3 | **non retenu** | Identité légale réelle de l'éditeur (Radif Partners), obligatoire. |
| 16 | Page À propos : « 24+ agency sites » puis « fifty agency sites » | 2, 3 | **corrigé** | Le premier passage est réécrit sans chiffre ; reste « fifty agency sites » (la phrase-valeur). |
| 17 | « Season dates as read on 2026 », phrase bancale | 1, 2 | **corrigé** | « Hunting season dates 2026, sources last read on November 13, 2026 ». |
| 18 | Arkansas : muzzleloader « Not yet » alors que la 1re tranche est passée | 3 | **corrigé** (défaut objectif) | Nouvel état « Paused, back Dec. 12, 2026 » pour une période entre deux tranches. |
| 19 | Connecticut : journées junior du 7 au 14 nov. absentes du résultat | 2, 3 | **corrigé** | Période ajoutée aux données (dates déjà citées par la note CT, guide 2026 de CT DEEP), classée « youth ». |
| 20 | Colorado : le tirage au sort, capital, est caché dans un paragraphe replié | 1, 3 | **corrigé** | La 1re phrase de la note de l'État s'affiche dans le résultat du vérificateur (« All Colorado deer licenses are limited and issued … through the draw »), de même pour la zone A de l'Alabama et la zone 1 de l'Arkansas. |
| 21 | Codes d'États (AL, AR…) dans la page arc | 3 | **corrigé** | Noms complets. |
| 22 | Références de lois dans la phrase (« 16 U.S.C. 718a and 718b) and 50 CFR part 20 ») sur la page À propos | 3 | **corrigé** | Remplacées par « the federal rules on duck stamps and migratory bird hunting », sources sur la page canard. |
| 23 | Le compte à rebours arrive en bas des pages État | 1 | **corrigé** | Avec la méthode fusil par défaut, le vérificateur du haut donne déjà « opens Nov. 21, 2026, in 7 days » ; le mini compte à rebours reste en bas. |
| 24 | Pourquoi le Texas pré-rempli | 3 | **corrigé** | Intro : « The checker opens on Texas, gun deer season, today: pick your own state and method. » |
| 25 | Accueil long (13 écrans), tableau des 24 États sans recherche | 2 | **non retenu** | Le tableau est le contenu de la page pilier ; chaque nom d'État y est un lien vers sa page. |
| 26 | « Hunting license by state » à côté de « License cost by state » | 2 | **non retenu** | Deux pages distinctes (permis de base des 50 États / coût total d'une chasse au cerf). |
| 27 | Le gros « Open » derrière le menu ouvert (02-menu-suite1) | 3 | **non retenu** | Effet de la capture (page sous le menu), pas un défaut d'affichage du menu. |
| 28 | Agences en sigle (AGFC, CPW, CT DEEP) | 3 | **non retenu** | Chaque page État nomme l'agence en toutes lettres dans le résultat et dans le résumé ; le sigle n'est qu'un rappel. |

## Défauts de trame signalés
- `MentionExemple` ne lisait pas `texte`/`aide` passés par `SpecTool`/`SpecMini` : bandeau générique « typical figures » sur tous les outils.
- `lib/clamp.ts` coupait après les mois abrégés à l'américaine (« Oct. 3 ») : ajoutés aux abréviations.
- Menu : une rubrique de groupe qui porte le même nom qu'une page (« Deer season by state ») se lit comme un doublon.

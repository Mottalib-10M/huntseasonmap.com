# Test naïf du 2026-11-14 (tour3), testeur 2 : huntseasonmap.com
**Persona :** Américain(e) de 24 ans, très à l'aise avec les apps, impatient(e) : s'il/si elle ne comprend pas en quelques secondes ce que la page lui apporte, il/elle ferme et retourne sur Google. Il/elle a cliqué sur le résultat « Hunting Season Dates by State 2026-27: Deer, Turkey, Duck » parce qu'il/elle a cette question. Découvre le site sur son téléphone.

## 1. Concept

**Après 5 s :** « OK, c'est un site qui me dit si la chasse est ouverte aujourd'hui dans mon État. » Le titre « Hunting season dates by state: is it open today? » colle parfaitement au résultat Google, et la phrase dessous donne tout de suite un vrai chiffre daté : « On November 14, 2026, gun deer season is open, at least in some zones, in 13 of the 24 states ». La mention « Independent site: not a state wildlife agency » rassure : je sais que ce n'est pas le site officiel et qu'on ne va pas me vendre un permis.

**Après 2 min :** c'est un vérificateur « ouvert / fermé à telle date » pour le chevreuil (deer) dans 24 États, avec pour chaque État le détail de toutes les périodes (arc, poudre noire, fusil, jeunes), un compte à rebours jusqu'à l'ouverture, et des liens vers dinde/canard quand ils existent. Le bénéfice concret : ne pas avoir à fouiller le PDF de l'agence de mon État pour savoir si je peux sortir ce week-end.

**Clair ?** Oui pour le cœur (deer). Moins clair sur l'étendue réelle : le nom « Map » promet une carte que je ne vois nulle part, et la promesse « deer, turkey and duck seasons in 24 states » de Google se dégonfle en route (« turkey in 12, ducks in 6 », et beaucoup de « not covered yet »). **Pour qui ?** Un chasseur de chevreuil américain qui veut une réponse rapide, surtout s'il chasse dans la zone « principale » de son État.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour la réponse principale, non pour le détail.** Le gros verdict (« Open for gun hunters in both zones », « Closed for adult gun hunters in Zone A », « 7 days », « Open now ») se lit en une seconde. Ça décroche :
- dans les tableaux par période, remplis de jargon d'agence : « Special late », « Muzzleloader-only », « Third regular rifle (deer and elk) », « Gun, dog deer hunting, private or leased land », « Expanded archery · Designated areas only » ;
- quand je découvre que mon cas n'est pas couvert : « Zones B, C, D, E and the CWD zone — gun / rifle dates not on this site (Outdoor Alabama sets them) », ou pire, en Arkansas : « The other 16 zones — gun / rifle dates not on this site (AGFC sets them) » ;
- sur la ligne « Main gun season (one zone shown) » de l'accueil, qui ne correspond pas toujours à ce qui est ouvert aujourd'hui (Colorado).

Le petit lexique « Words you will meet: a muzzleloader is… antlerless deer are… a draw is a lottery… » est une bonne idée, mais il est caché sous le formulaire, dans un bloc de texte que personne d'impatient ne lira.

## 3. Parcours écran par écran

- **01-accueil-1** — Compris. Titre et première phrase parfaits. Les 4 boutons « Start from your question » sont tentants, mais 3 sur 4 parlent de permis (« What does a license cost a nonresident? », « Where do I buy a hunting license? », « Hunting tags: what a deer tag costs ») alors que je suis venu(e) pour les dates. Je ne sais pas encore où est l'outil : il commence en bas de l'écran (« State: Texas »).
- **01-accueil-suite1** — Coince un peu : 6 champs à empiler (State, Game, Your method, Your zone or area, Month, Day) avant de voir le moindre résultat. Le champ « Day » avec « 14 » aligné à droite et le sous-titre « Day of the month » fait formulaire administratif. Le bandeau jaune « Shown for November 14, 2026 — pick your state… » est utile : je comprends que c'est un exemple pré-rempli.
- **01-accueil-suite2** — Compris. « Open for gun hunters in both zones » + « North Zone open: General (gun) until Jan. 3, 2027 » = exactement ce que je voulais. Le paragraphe source (« Dates as published by the Texas Parks and Wildlife Department… read on November 13, 2026 ») rassure.
- **01-accueil-suite3 / suite4** — Compris mais long : la liste « Archery / Youth-only early / General (gun) / Special late / Muzzleloader-only » avec « Over / Open / Not yet » est claire. « 252 of 254 counties » et « 90 of 254 counties » : je ne sais pas si mon comté en fait partie.
- **01-accueil-suite5** — Texte « Reading the answer for your state » : bien intentionné, mais c'est un mode d'emploi après coup. La règle Maine / Pennsylvanie du dimanche est intéressante mais tombe de nulle part quand on regarde le Texas.
- **01-accueil-suite6** — Paragraphe utile (« deer in all 24, turkey in 12, ducks in 6, and license prices in 12 ») : c'est là que j'apprends que dinde et canard sont partiels. Puis titre « the 2026-27 deer calendar ».
- **01-accueil-suite7 à suite12** — Le tableau par État. Compris dans l'ensemble (« Gun hunting on Nov. 14, 2026 : Open / Closed, next opens… »). Coince : 
  - « Turkey: not covered yet / Duck: not covered yet » répété presque partout, ça sent le site inachevé ;
  - Colorado : « Open: Third regular rifle… until Nov. 15 » mais juste dessous « Main gun season (one zone shown): Oct. 24 to Nov. 1, 2026 » — pourquoi la « main » saison est-elle déjà finie alors que c'est ouvert ?
  - Montana : « Open… (Hunting districts 150, 280 and 316) » puis « Main gun season… Most hunting districts » — je ne comprends pas lequel concerne mon district ;
  - Arkansas : « Other gun periods: none », alors que la page Arkansas liste un « Alternative firearms (muzzleloader) » et un « Youth modern gun hunt ».
  - Pas de résumé « les 13 États ouverts sont : … » : il faut défiler 24 cartes pour le savoir.
- **02-menu-1 / suite1** — Compris : liste des 24 États sous « Deer season by state ». Coince : « Deer season by state » apparaît deux fois (lien dans « Seasons and licenses » et titre de section) ; « Hunting license by state » est replié et je ne sais pas ce qu'il contient ; pas de liste turkey/duck par État dans le menu.
- **03-en-about-1 à suite3** — Compris : qui fait le site, d'où viennent les dates, ce qui est exclu. Inquiète un peu : un site de chasse américain publié par « Radif Partners, 49 rue du Ressort, 63000 Clermont-Ferrand, France ». Un chasseur US peut trouver ça bizarre (« pourquoi une boîte française ? »). La section « What it leaves out » est honnête et appréciée.
- **04-en-alabama-deer-season-1 à suite6** — Compris : « Closed for adult gun hunters in Zone A » + « Open today for: Archery (stalk hunting), Special youth gun (under 16) », c'est excellent. Le mini-outil « How many days until your Alabama opener? » → « 7 days » est clair. Coince : « gun / rifle dates not on this site » pour 4 zones sur 5 ; « stalk hunting » répété partout ; l'accueil disait « Closed » pour l'Alabama alors qu'ici un fusil jeunes est ouvert (cohérent sur le fond, mais pas évident).
- **05-en-archery-season-by-state-1 à suite6** — Compris : « 19 of 24 » ouverts à l'arc aujourd'hui, liste « Open / Closed », « Next state to open: Missouri, Nov. 25 ». Très utile. **Bug visible** : méthode « Archery » sélectionnée, mais l'aide dessous dit « Gun / rifle: modern rifle or shotgun. » Les cellules « On that date » deviennent des pavés illisibles (Illinois, Utah, Pennsylvania : « Archery (antlered and antlerless) · Wildlife management units (WMUs) 2B, 5C and 5D, until Nov. 27, 2026 »).
- **06-en-arkansas-deer-season-1 à suite6** — Compris : « Open for gun hunters in Zone 1 » / « Also open today for: Archery ». « Paused, back Dec. 12, 2026 » est une jolie formulation. Coince fort : « Arkansas has 17 deer zones; the… dates on this site are those of Zone 1 » — si je chasse en zone 9, le site ne m'aide pas pour le fusil. Le texte mentionne « A resident sportsman's license costs $25… nonresident all-game license costs $410 » : utile, mais noyé dans un paragraphe.
- **07-en-colorado-deer-season-1 à suite6** — Compris : « Open in 1 of 2 areas for gun hunters » + l'avertissement « All Colorado deer licenses are limited… through the draw, a lottery » (très utile, ça évite une erreur). Coince : le chapeau dit « the headline gun season, second regular rifle, runs Oct. 24 to Nov. 1 », déjà terminé, alors que c'est la troisième qui est ouverte ; il faut lire en bas « the first one is an elk season » pour comprendre pourquoi il n'y a pas de « first ».
- **08-en-connecticut-deer-season-1 à suite6** — Compris : « Closed for adult gun hunters on both kinds of land » / « Open today for: Archery, Junior deer hunter training days », « 4 days ». Le sélecteur « All kinds of land, one line each » (au lieu de zones) est bien adapté. Le libellé « Shotgun (permit sold without a lottery) » est lourd.
- **09-en-days-until-deer-season-1 à suite6** — Compris : « Open now », « last day Jan. 3, 2027 (50 more days) », « Next new period… opens Jan. 4, 2027, in 51 days ». Le tableau des ouvertures par État est clair (« Archery opens before gun: 35 days »). Coince : le titre « countdown to your 2026 opener » à la mi-novembre, alors que la plupart des ouvertures sont passées ; « Muzzleloader opener: not in the dates read » sonne technique.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Vérificateur « ouvert à cette date » (accueil et pages État) | Oui, mais commence en bas du 1er écran | Oui, verdict en gros très lisible | Très | 4 |
| Tableau de toutes les périodes d'un État avec « Over / Open / Not yet » | Oui | Oui, sauf jargon des noms de périodes | Oui | 4 |
| Tableau 24 États sur l'accueil | Oui (en défilant beaucoup) | Plutôt, incohérences Colorado / Arkansas | Moyen : pas de résumé des États ouverts | 3 |
| Saison à l'arc par État (« 19 of 24 ») | Oui via le menu | Oui, malgré l'aide « Gun / rifle » erronée | Oui | 4 |
| Compte à rebours « Days until deer season » | Oui (menu + lien « Full calculator ») | Oui | Oui, gère bien « Open now » | 4 |
| Mini-compteur dans chaque page État | Oui | Oui (« 7 days », « 4 days ») | Oui | 4 |
| Boutons « Start from your question » (permis, tags) | Oui | Oui | Non testés ici ; hors de ma question | 3 |
| « Copy share link » / « Print » | Oui | Oui | Utile pour envoyer à un pote de chasse | 3 |
| « How this is computed » / sources | Oui | Oui | Rassurant | 3 |
| Une carte (« Map ») | **Non**, jamais vue | — | — | 0 |

## 5. Enchaînement et navigation

Le fil d'Ariane (« Home / Deer season by state / Alabama ») est clair. Le passage accueil → État par le nom souligné dans le tableau marche bien. Chaque page État a la même structure (chapeau, outil, tableau, texte, mini-compteur), donc après une page on sait lire les autres : bon point. Points faibles : le formulaire est répété en entier sur chaque page (6 champs) avant la réponse ; le menu est une longue liste sans recherche, avec « Deer season by state » en double ; rien ne permet de passer directement de « mon État deer » à « mon État turkey/duck » dans le menu ; l'accueil est très long (13 écrans de défilement) et le tableau 24 États n'a pas de raccourci (« jump to your state »).

## 6. Difficultés classées

1. **Couverture partielle découverte tard (pages État, accueil)** — Vécu : Google m'a promis « deer, turkey and duck seasons in 24 states » ; j'apprends ensuite « turkey in 12, ducks in 6 », je vois « not covered yet » partout, et en Arkansas « The other 16 zones — gun / rifle dates not on this site ». Si je ne chasse pas dans la zone affichée, je me sens trahi(e) et je retourne sur Google. Recommandation : annoncer la couverture dès le premier écran et dans la description Google, et dans le sélecteur de zone, marquer clairement les zones non couvertes avec un lien direct vers la page officielle. Texte proposé sous le titre : « Deer dates for 24 states (main zone of each), turkey for 12, duck for 6. Not your zone? We link to your state's official page. »
2. **Le nom « Map » sans carte (tous les écrans)** — Vécu : « Hunt Season Map », j'attends une carte des États colorés ouvert/fermé ; il n'y en a pas. Recommandation : ajouter une petite carte des États ouverts/fermés à la date choisie en haut de l'accueil, ou à défaut un résumé visuel. À défaut de carte, ne pas laisser le mot sans contrepartie.
3. **Pas de résumé des 13 États ouverts (01-accueil-1 / suite7+)** — Vécu : on me dit « open… in 13 of the 24 states » mais je dois défiler 24 cartes pour savoir lesquels. Recommandation : liste cliquable juste sous la phrase, comme sur la page arc. Texte : « Open today for gun: Arkansas, Colorado, Georgia, … — Closed: Alabama, Connecticut, … »
4. **Incohérences accueil / pages État (01-accueil-suite8, 06, 07)** — Vécu : Colorado « Main gun season: Oct. 24 to Nov. 1 » alors que c'est la 3e saison qui est ouverte ; Arkansas « Other gun periods: none » alors que la page liste muzzleloader et youth gun. Je doute des chiffres. Recommandation : afficher en « Main gun season » la période en cours ou la prochaine, et compter muzzleloader/youth dans « Other gun periods » (ou renommer la ligne). Texte : « Current or next gun period » au lieu de « Main gun season (one zone shown) ».
5. **Aide erronée sur la page arc (05-en-archery-season-by-state-1)** — Vécu : je choisis « Archery », l'aide dit « Gun / rifle: modern rifle or shotgun. » Ça fait bug. Recommandation : texte d'aide qui suit la méthode. Texte : « Archery: bow or crossbow, as your state allows. »
6. **Formulaire long avant la réponse (01-accueil-suite1, toutes les pages État)** — Vécu : 6 champs empilés, la réponse arrive au 2e écran. Recommandation : mettre le verdict juste sous « State » ou replier Month/Day derrière « Change date (today by default) ». Texte : « Today, Nov. 14 — change date ».
7. **Jargon des noms de périodes (tableaux État, page arc)** — Vécu : « Special late », « stalk hunting », « Expanded archery · Designated areas only », « Shotgun (permit sold without a lottery) » ; le lexique existe mais est enterré sur l'accueil. Recommandation : bulle « ? » à côté des termes, ou un sous-titre d'une ligne sous chaque période. Ex. sous « Special late » : « Late gun season with special rules (check bag limits). »
8. **Éditeur français pour un site de chasse US (03-en-about)** — Vécu : « Clermont-Ferrand, France » me fait hésiter sur la fiabilité. Recommandation : expliquer en une phrase pourquoi on peut faire confiance (sources liées, date de lecture), juste au-dessus de l'adresse. Texte : « We are based in France; every date links to the US state agency page it was copied from, so you can check it in one tap. »

## 7. À garder

- Le titre et la première phrase de l'accueil, avec la date du jour et un chiffre (« 13 of the 24 states »).
- Les verdicts en très gros : « Open for gun hunters in both zones », « Closed for adult gun hunters in Zone A », « Open in 1 of 2 areas », « 7 days », « Open now ».
- « Open today for: … » / « Also open today for: … » : ça répond à la vraie question « je peux chasser avec quoi aujourd'hui ? ».
- « Over / Open / Not yet / Paused, back Dec. 12, 2026 » : vocabulaire de statut parfait.
- L'avertissement Colorado sur le tirage au sort (« through the draw, a lottery: you apply and may or may not get a license »).
- La transparence : source nommée, « read on November 13, 2026 », « What it leaves out ».
- « Independent site… No license sold, no contact details asked. »
- Le compte à rebours qui bascule intelligemment sur « Open now » + « last day… (50 more days) ».
- La page arc « 19 of 24 » avec « Next state to open ».

## 8. Notes

Clarté : 7/10
Facilité : 7/10
Utilité : 8/10

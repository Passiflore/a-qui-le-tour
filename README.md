# À qui le tour ?

Une petite app à deux joueurs pour décider qui décide. À chaque tour, le serveur
désigne celui qui doit trancher — le restaurant, le film, la sortie du week-end —
puis enregistre sa décision et rend la main.

Le tirage est pondéré : sur les cinq dernières décisions acceptées, plus tu as
décidé, moins tu as de chances d'être redésigné. Mais rien n'empêche de tomber
deux fois de suite sur la même personne.

## Comment ça marche

1. Le premier joueur crée une partie et récupère un lien d'invitation.
2. Le second ouvre le lien, entre son prénom, et la partie démarre.
3. Le serveur désigne celui qui va décider.
4. **L'autre** choisit le sujet — « où on mange ? » — ou passe son tour.
5. Le joueur désigné écrit sa décision, avec un commentaire et une difficulté,
   tous deux facultatifs.
6. **L'autre** accepte ou refuse. S'il accepte, le serveur tire le joueur
   suivant. S'il refuse, la main revient à celui qui vient de décider.

Les écrans n'ont donc jamais la main en même temps : à chaque instant, l'un agit
et l'autre attend. Les deux interrogent le serveur toutes les 3 secondes, ce qui
suffit pour un jeu joué côte à côte, et chacun est redirigé automatiquement vers
l'écran qui le concerne.

Le joueur qui attend est prévenu de trois façons quand son tour arrive : le titre
de l'onglet, une sonnerie, et un écran d'annonce. Un badge indique la fraîcheur
de la dernière synchro, et affiche « connexion perdue » si le serveur ne répond
plus.

## Stack

- **Front** — React 19, TypeScript, Vite, React Router, CSS Modules
- **Serveur** — Express 5, TypeScript, `tsx` en développement
- **Stockage** — un fichier JSON, relu au démarrage du serveur

Les parties survivent donc à un redémarrage. Le fichier est écrit dans le dossier
depuis lequel le serveur est lancé, donc `server/data.json` en pratique, et il
n'est pas versionné.

## Démarrer

Le projet a besoin des deux processus. Dans un premier terminal :

```bash
cd server
npm install
npm run dev
```

Le serveur écoute sur le port 3000, ou sur `PORT` si la variable est définie.

Dans un second terminal, à la racine :

```bash
npm install
npm run dev
```

Vite sert le front et redirige `/api` vers `http://localhost:3000` en retirant le
préfixe, donc rien à configurer côté navigateur.

## Scripts

| Commande          | Effet                                     |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Lance Vite avec le rechargement à chaud   |
| `npm run build`   | Vérifie les types puis construit le front |
| `npm run lint`    | Passe ESLint sur tout le projet           |
| `npm run preview` | Sert le build de production en local      |

Côté `server/`, `npm run dev` relance le serveur à chaque modification et
`npm run build` compile vers `dist/`.

## Structure

```
src/
  api.ts          Appels au serveur, typés
  session.ts      Le joueur et la partie, dans le localStorage
  hooks/          useGamePolling, useElapsedSince, useDrawer
  pages/          Une page par écran du jeu
  components/     Éléments réutilisables, dont Drawers/
  layouts/        Le cadre commun aux pages
server/
  src/index.ts    Toutes les routes de l'API
  src/storage.ts  Lecture et écriture de data.json
```

## API

| Méthode | Route                            | Rôle                                                |
| ------- | -------------------------------- | --------------------------------------------------- |
| `GET`   | `/healthz`                       | Vérifier que le serveur répond                      |
| `POST`  | `/games`                         | Créer une partie                                    |
| `GET`   | `/invite/:token`                 | Vérifier qu'une invitation est valide               |
| `POST`  | `/invite/:token`                 | Rejoindre une partie                                |
| `GET`   | `/games/:gameId`                 | Lire l'état d'une partie                            |
| `POST`  | `/games/:gameId/subject`         | Fixer le sujet du tour, ou passer                    |
| `POST`  | `/games/:gameId/decision`        | Enregistrer une décision, en attente de validation   |
| `POST`  | `/games/:gameId/decision/review` | Accepter ou refuser la dernière décision             |
| `POST`  | `/games/:gameId/reset`           | Effacer l'historique de la partie                    |

Les routes qui agissent sur une partie en cours attendent le `playerId` dans le
corps et refusent le joueur qui n'a pas la main : `403` si ce n'est pas à lui
d'agir, `409` si l'étape ne correspond pas à l'état de la partie.

## Pas encore fait

- Rien ne sert le front en production : il n'y a ni script `start` côté serveur,
  ni URL d'API configurable. Le proxy Vite ne tourne qu'en développement.
- On ne peut pas quitter une partie : la session reste dans le `localStorage`
  même si la partie n'existe plus côté serveur.
- Aucun test. Le tirage pondéré et les règles d'accès aux routes ne sont
  vérifiés par rien.
- Les invitations ne périment pas et les parties abandonnées ne sont jamais
  purgées du fichier.

## Crédits

Son « Clochette #1 » par GlaneurDeSons —
<https://lasonotheque.org/clochette-1-s0292.html> — licence CC0 (équivalent
domaine public), récupéré le 09/09/2026.

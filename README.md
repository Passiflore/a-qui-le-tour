# À qui le tour ?

Une petite app à deux joueurs pour décider qui décide. À chaque tour, le serveur
désigne celui qui doit trancher — le restaurant, le film, la sortie du week-end —
puis enregistre sa décision et rend la main.

Le tirage est pondéré : plus tu as décidé récemment, moins tu as de chances
d'être redésigné. Mais rien n'empêche de tomber deux fois de suite sur la même
personne.

## Comment ça marche

1. Le premier joueur crée une partie et récupère un lien d'invitation.
2. Le second ouvre le lien, entre son prénom, et la partie démarre.
3. Le joueur désigné voit l'écran de décision, l'autre attend.
4. Une fois la décision enregistrée, le serveur tire le joueur suivant.

Les deux écrans interrogent le serveur toutes les 3 secondes, ce qui suffit pour
un jeu joué côte à côte. Le joueur qui attend est prévenu de trois façons quand
son tour arrive : le titre de l'onglet, une sonnerie, et un écran d'annonce.

## Stack

- **Front** — React 19, TypeScript, Vite, React Router, CSS Modules
- **Serveur** — Express 5, TypeScript, `tsx` en développement
- **Stockage** — en mémoire, dans le processus du serveur

Les parties disparaissent au redémarrage du serveur. C'est volontaire à ce stade
du projet.

## Démarrer

Le projet a besoin des deux processus. Dans un premier terminal :

```bash
cd server
npm install
npm run dev
```

Le serveur écoute sur le port 3000.

Dans un second terminal, à la racine :

```bash
npm install
npm run dev
```

Vite sert le front et redirige `/api` vers `http://localhost:3000`, donc rien à
configurer côté navigateur.

## Scripts

| Commande        | Effet                                          |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Lance Vite avec le rechargement à chaud         |
| `npm run build` | Vérifie les types puis construit le front       |
| `npm run lint`  | Passe ESLint sur tout le projet                 |
| `npm run preview` | Sert le build de production en local          |

Côté `server/`, `npm run dev` relance le serveur à chaque modification et
`npm run build` compile vers `dist/`.

## Structure

```
src/
  api.ts          Appels au serveur, typés
  hooks/          useGamePolling, useElapsedSince
  pages/          Une page par écran du jeu
  components/     Éléments réutilisables
  layouts/        Le cadre commun aux pages
server/
  src/index.ts    Toutes les routes de l'API
```

## API

| Méthode | Route                        | Rôle                              |
| ------- | ---------------------------- | --------------------------------- |
| `POST`  | `/games`                     | Créer une partie                  |
| `GET`   | `/invite/:token`             | Vérifier qu'une invitation est valide |
| `POST`  | `/invite/:token`             | Rejoindre une partie              |
| `GET`   | `/games/:gameId`             | Lire l'état d'une partie          |
| `POST`  | `/games/:gameId/decision`    | Enregistrer une décision et passer au tour suivant |

## Crédits

Son « Clochette #1 » par GlaneurDeSons —
<https://lasonotheque.org/clochette-1-s0292.html> — licence CC0 (équivalent
domaine public), récupéré le 09/09/2026.

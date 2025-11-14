# temp_react_native_supabase

Petit template React Native + Expo pré-configuré avec Supabase (auth), theming (light/dark), et quelques écrans (Home, Settings, Auth). Ce README donne l'essentiel pour démarrer rapidement.

## Prérequis
- Node 18+ / npm ou Yarn
- Expo CLI (optionnel) : npm install -g expo-cli
- Compte Supabase

## Installation
1. Cloner le repo
2. Installer les dépendances
   - npm install
   - ou yarn

## Variables d'environnement
Créez un fichier `.env` (ou configurez vos secrets selon votre flux CI) avec au minimum :
- SUPABASE_URL=https://your-project.supabase.co
- SUPABASE_ANON_KEY=your-anon-key

Ces variables sont utilisées par `src/utils/supabase`.

## Lancement en dev
- expo start
- ou npm run start / yarn start
Pour lancer sur un appareil : utilisez l'app Expo Go ou un simulateur.

## Authentification & OAuth (Google)
- Email/password : déjà géré par l'écran Auth (`src/app/auth/index.tsx`).
- Google OAuth : le bouton "Continuer avec Google" déclenche `supabase.auth.signInWithOAuth({ provider: "google" })`.
  - Dans le dashboard Supabase, activez Google sous Authentication > Providers.
  - Ajoutez les redirect URLs nécessaires (Expo : scheme://redirect, ou votre URL d'application).
  - En React Native + Expo, vous devrez parfois configurer `app.json` / `expo` scheme et `authSession` pour le flow OAuth selon votre setup.

## Thème
- Le contexte thème se trouve dans `src/contexts/theme-context.tsx`.
- Thèmes définis dans `src/theme/colors.ts`.
- Toggle thème disponible dans l'écran Settings et header de l'écran Auth.
- Le choix est sauvegardé dans AsyncStorage.

## Structure importante
- src/app — écrans (auth, home, settings, etc.)
- src/contexts — theme-context, auth-context, user-context
- src/theme — light/dark palettes
- src/utils/supabase — client Supabase
- src/components — (si présents) composants réutilisables

## Personnalisation rapide
- Couleurs : modifier `src/theme/colors.ts`.
- Auth flows : `src/app/auth/index.tsx` (email/password, OAuth).
- Ajouter écran : créer dossier/route dans `src/app`.

## Débogage / astuces
- Si OAuth ouvre une page blanche : vérifier redirect URI / scheme et la configuration dans Supabase.
- Problèmes d'apparence sur la status bar : tous les écrans utilisent SafeAreaInsets et le contexte theme.
- Vérifier la console Metro / logs pour erreurs runtime.

## Contribuer
- Fork → branch → PR. Garder les changements isolés (thème, auth, nouvelle feature).
- Respecter TypeScript et conventions du projet.


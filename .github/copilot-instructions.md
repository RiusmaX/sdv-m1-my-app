# Copilot Instructions - my-app

## Stack et architecture
- Projet Expo + React Native + Expo Router (routing file-based dans `app/`).
- TypeScript obligatoire pour tout nouveau code.
- Auth et session via Supabase (`lib/supabase.ts`).

## Règles de contribution
- Réutiliser les composants existants dans `components/` et `components/ui/` avant de créer de nouveaux composants.
- Conserver les conventions de routing existantes (`app/_layout.tsx`, `(tabs)`, pages par fichier).
- Préserver la logique de garde d’auth dans `app/_layout.tsx` (affichage `SignInScreen` vs stack principale).
- Éviter les refactors larges non demandés.

## UI et UX
- Respecter le système de thème existant (`hooks/use-color-scheme.ts`, `hooks/use-theme-color.ts`).
- Pour les images, privilégier `expo-image`.
- Pour les interactions, privilégier `Pressable`.
- Respecter les safe areas avec `react-native-safe-area-context`.

## Performance
- Stabiliser callbacks et props des composants fréquemment rendus.
- Éviter objets/fonctions inline dans les listes.
- Pour les animations, privilégier `transform` et `opacity`.

## Sécurité et configuration
- Ne jamais hardcoder de secrets.
- Utiliser uniquement les variables d’environnement (`EXPO_PUBLIC_*`) pour la configuration publique.
- Utiliser le client Supabase existant au lieu de créer des clients ad hoc.

## Qualité
- Proposer des changements ciblés, lisibles et testables.
- Exécuter ou recommander `npm run lint` après modifications.
- Signaler explicitement les vérifications non exécutées.

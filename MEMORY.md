# Instructions IA du projet

## Contexte
- Projet mobile et web avec Expo + React Native + Expo Router (routing file-based dans `app/`).
- TypeScript activé.
- Auth gérée avec Supabase via `lib/supabase.ts`.
- Thème et mode clair/sombre gérés via hooks custom (`hooks/use-color-scheme.ts`, `hooks/use-theme-color.ts`).

## Objectif des contributions IA
- Produire du code lisible, maintenable et cohérent avec l’architecture existante.
- Réutiliser les composants existants avant d’en créer de nouveaux.
- Minimiser les changements non liés à la demande utilisateur.

## Conventions techniques
- Langage: TypeScript strict, types explicites quand utile.
- Navigation: utiliser Expo Router (`app/_layout.tsx`, groupes `(tabs)`, routes par fichier).
- UI: privilégier les composants déjà présents dans `components/` et `components/ui/`.
- Images: privilégier `expo-image` quand un affichage d’image est requis.
- Interactions tactiles: préférer `Pressable` aux anciens composants touchables.
- Safe area: respecter `react-native-safe-area-context` pour tout nouvel écran.

## Authentification et session
- Toute logique d’accès utilisateur doit passer par le client Supabase existant (`lib/supabase.ts`).
- Ne jamais hardcoder de secrets; utiliser les variables d’environnement Expo (`EXPO_PUBLIC_*`).
- Lors d’évolutions auth, conserver la logique de garde d’écran (connexion vs app principale) déjà en place dans `app/_layout.tsx`.

## Style de code
- Éviter les effets de bord cachés et les abstractions prématurées.
- Ajouter des commentaires seulement si une section est non triviale.
- Conserver les noms de fichiers et conventions de routing existants.
- Ne pas introduire de dépendance supplémentaire sans justification claire.

## Performance React Native
- Pour les listes volumineuses, privilégier des patterns performants (virtualisation, memo, callbacks stables).
- Éviter les objets/fonctions inline coûteux dans les rendus fréquents.
- Pour les animations, privilégier `transform` et `opacity`.

## Qualité et validation
- Après modification, vérifier au minimum:
	- `npm run lint`
	- compilation TypeScript implicite via l’outillage Expo/TS du projet.
- Si un test ou une vérification ne peut pas être exécuté, l’indiquer explicitement.

## Règles de modification
- Ne pas refactorer massivement sans demande explicite.
- Ne pas casser les API publiques des composants existants sans nécessité.
- Préférer des patchs ciblés et atomiques.

## Modèle de réponse attendu de l’IA
- Commencer par la solution appliquée.
- Donner ensuite les fichiers touchés et le pourquoi des choix.
- Mentionner les validations exécutées et limites éventuelles.

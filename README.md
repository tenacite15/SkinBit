# SkinBit

Application mobile de gestion de patients en dermatologie, développée avec React Native et Expo.

---

## Démarrage du projet

### Prérequis

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Un simulateur iOS (Xcode) ou Android (Android Studio), ou l'application [Expo Go](https://expo.dev/client) sur un appareil physique

### Installation

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd SkinBit

# Installer les dépendances
npm install
```

### Lancer l'application

```bash
# Démarrer le serveur de développement Expo
npm start

# Ouvrir directement sur iOS
npm run ios

# Ouvrir directement sur Android
npm run android

# Ouvrir dans le navigateur web
npm run web
```

Une fois le serveur lancé, scannez le QR code affiché dans le terminal avec l'application **Expo Go** sur votre appareil, ou appuyez sur `i` pour iOS / `a` pour Android dans le terminal.

---

## Fonctionnalités principales

- **Liste de patients** — Affichage de tous les patients avec leurs informations clés (âge, condition, dernière visite) sous forme de cartes extensibles.
- **Dossier patient** — Vue détaillée avec l'ensemble des diagnostics associés à un patient.
- **Fiches diagnostics** — Chaque diagnostic présente une image, la zone corporelle concernée, le niveau d'évolution (diminution / stable / augmentation) et le niveau de risque (faible / moyen / élevé), le tout avec un code couleur visuel.
- **Annotations sur image** — Depuis la modal d'un diagnostic, il est possible de cliquer sur l'image pour placer un marqueur positionnel et y associer une note textuelle.
- **Gestion des annotations** — Les notes peuvent être confirmées, supprimées et sauvegardées dans le store global.
- **Interface en français** — Toute l'interface est localisée en français via un système i18n.

---

## Architecture et répartition des composants

```
SkinBit/
├── App.tsx                        # Point d'entrée : initialise i18n et le navigateur
├── app/
│   ├── navigation/
│   │   └── AppNavigator.tsx       # Stack navigator (Home → PatientFile)
│   ├── screens/
│   │   ├── Home.tsx               # Liste des patients
│   │   └── PatientFile.tsx        # Dossier patient et diagnostics
│   ├── components/
│   │   ├── Header.tsx             # En-tête avec logo SkinBit
│   │   ├── PatientListItem.tsx    # Carte patient extensible (liste)
│   │   ├── PatientInfos.tsx       # Bloc d'informations générales du patient
│   │   ├── PatientDiagnostics.tsx # Carte diagnostic extensible
│   │   ├── Modal.tsx              # Modal plein écran pour les annotations
│   │   ├── ImageClick.tsx         # Image interactive avec marqueurs cliquables
│   │   └── Separator.tsx          # Séparateur visuel réutilisable
│   ├── store/
│   │   ├── useAppStore.ts         # Store Zustand (patients + saveNotes)
│   │   └── types.ts               # Types TypeScript (Patient, Diagnostic, Note)
│   ├── constants/
│   │   ├── theme.ts               # Couleurs, espacements, polices, rayons
│   │   ├── evolution.ts           # Mapping évolution → couleur + label
│   │   └── risk.ts                # Mapping risque → couleur + label
│   ├── i18n/
│   │   ├── index.ts               # Configuration i18next
│   │   └── locales/fr.json        # Traductions françaises
│   └── patients.ts                # Données mockées (3 patients, 6 diagnostics)
└── assets/images/                 # Images de diagnostics et logo
```

### Flux de navigation

```
Home (liste patients)
  └── PatientFile (dossier patient)
        └── Modal (annotation sur image)
```

---

## Librairies principales

| Librairie                          | Usage                                                               |
| ---------------------------------- | ------------------------------------------------------------------- |
| **Expo** (~54)                     | Framework React Native managé, simplifie le build iOS/Android/Web   |
| **React Native** (0.81)            | Framework mobile multi-plateforme                                   |
| **@react-navigation/native-stack** | Navigation en stack avec animations natives fluides                 |
| **Zustand** (^5)                   | Gestion d'état global, minimaliste et sans boilerplate              |
| **i18next + react-i18next**        | Internationalisation, permets d'ajouter facilement d'autres langues |
| **lucide-react-native**            | Icônes cohérentes et légères (chevrons, maximize, croix)            |
| **react-native-gesture-handler**   | Gestion avancée des gestes tactiles (requis par React Navigation)   |
| **react-native-reanimated**        | Animations performantes (préparé pour des transitions futures)      |
| **react-native-safe-area-context** | Adaptation aux encoches et zones système (iPhone, Android)          |
| **TypeScript** (~5.9)              | Typage statique pour fiabilité et maintenabilité du code            |

---

## Améliorations possibles

### Données et backend

- Remplacer les données mockées par une vraie API REST
- Ajouter une authentification (médecin / praticien) avec gestion de session
- Persister les annotations localement avec `AsyncStorage` ou une véritable base de données

### Fonctionnalités

- Ajout / modification / suppression de patients et de diagnostics
- Système de filtres et de recherche sur la liste des patients
- Historique d'évolution d'un diagnostic sur un graphique temporel
- Notifications pour les rendez-vous ou les suivis à planifier
- Signature et validation de compte-rendus médicaux

### UX / UI

- Mode sombre (dark mode) complet
- Animations de transition entre les écrans
- Support du mode paysage pour les écrans de diagnostic
- Accessibilité renforcée (lecteur d'écran, contrastes WCAG)

### Technique

- Tests unitaires et d'intégration (Jest + React Native Testing Library)
- Internationalisation multilingue (anglais, espagnol...)
- CI/CD avec EAS Build pour les builds automatisés
- Gestion des erreurs et états de chargement (loading, error, empty states)

# TripVision Stabilization & Refactoring Plan

## 1. Architectural Strategy: Classic Expo + React Navigation

**Decision**: We will strictly enforce **React Navigation (v7)** and remove `expo-router`.
**Reasoning**:

* The codebase already uses a robust `App.tsx` with `createBottomTabNavigator`.

* `expo-router` is currently an unused dependency creating "architectural drift".

* Converting to file-based routing would require a rewrite of the navigation logic and file structure, which contradicts the goal of "Stabilization" and risk-minimization.

* **Action**: Uninstall `expo-router` and formalize the existing React Navigation setup.

## 2. Dependency Cleanup & Installation

We will clean the `apps/mobile/package.json` to remove conflicts and unused packages.

* **Remove**:

  * `expo-router` (Conflicting routing strategy)

  * `react-native-web` (Only if not explicitly needed, but user mentioned "Web is secondary/preview", so we keep it for now but ensure it doesn't break mobile)

* **Upgrade/Align**:

  * Ensure `expo` SDK 54 (or latest stable) compatibility.

  * Align `@react-navigation/*` versions.

  * Ensure `react-native-google-mobile-ads` is compatible with the RN version.

## 3. Modernization & Refactoring

We will restructure the application to separate concerns and improve maintainability.

### A. Folder Structure Normalization

We will create a `src/navigation` folder to decouple routing from `App.tsx`.

```
apps/mobile/src/
├── navigation/       # NEW: AppNavigator, LinkingConfiguration
│   └── AppNavigator.tsx
├── screens/          # Existing screens
├── services/         # API, Auth, Ads
├── theme/            # Theme definitions
├── components/       # Reusable UI
└── i18n/             # Localization
```

### B. App.tsx Refactor

* Move `Tab.Navigator` logic to `src/navigation/AppNavigator.tsx`.

* Keep `App.tsx` clean: It will only handle **Providers** (Theme, SafeArea, etc.) and initialization (Ads, I18n).

### C. TypeScript & Config Improvements

* Update `tsconfig.json`:

  * Switch `moduleResolution` to `"bundler"` (Standard for Expo 50+).

  * Simplify path aliases (e.g., `@/*` -> `src/*`).

* Fix any `any` types found during the move.

## 4. Execution Steps

1. **Clean Dependencies**: Uninstall `expo-router`, reinstall core libraries.
2. **Create Navigation Layer**: Extract routing logic to `src/navigation`.
3. **Update Configuration**: Fix `tsconfig.json` and `app.json`.
4. **Verify**: Run `tsc` (Typecheck) and start the Expo server.


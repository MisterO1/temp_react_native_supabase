// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AppStore = {
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      userEmail: null,
      setUserEmail: (email) => set({ userEmail: email }),
    }),
    {
      name: "akane-app-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// interface AppState {
//   userGroupsZus: Group[];
//   completionsZus: Record<string, completion[]>;
//   setUserGroupsZus: (groups: Group[]) => void;
//   setCompletionZus: (completionsZus: Record<string, completion[]>) => void;
//   reset: () => void;
// }

// const zusVersion = 1;
// const zusName= "app-storage";

// // --- 🏪 Store Zustand avec persistance ---

// export const useAppStore = create(
//   persist<AppState>(
//     (set) => ({
//       userGroupsZus: [],
//       completionsZus: {},
//       setUserGroupsZus: (groups) => set( () => ({ userGroupsZus: [...groups] })),
//       setCompletionZus: (completions) => set({ completionsZus: completions }),
//       reset: () =>
//         set({
//           userGroupsZus: [],
//           completionsZus: {},
//         }),
//     }),
//     {
//       name: zusName,// key for the storage
//       storage: createJSONStorage(() => AsyncStorage),
//       version: zusVersion,
//       migrate: (persistedState, version) => {
//         if (version < zusVersion) {
//           console.log("⚠️ Ancien cache détecté, reset du store...");
//           const emptyState: AppState = {
//             userGroupsZus: [],
//             completionsZus: {},
//             setUserGroupsZus: () => {},
//             setCompletionZus: () => {},
//             reset: () => {},
//           };
//           return emptyState;
//         }

//         // Sinon, on garde les données existantes
//         return persistedState as AppState;
//       }
//     }
//   )
// );

// // --- 🧹 Fonction utilitaire : reset complet du cache ---
// export const clearAppStore = async () => {
//   try {
//     await AsyncStorage.removeItem(zusName); // supprime le cache persistant
//     useAppStore.getState().reset() // reset en mémoire
//     console.log("🧼 Cache Zustand supprimé avec succès !");
//   } catch (e) {
//     console.error("❌ Erreur lors de la suppression du cache :", e);
//   }
// };

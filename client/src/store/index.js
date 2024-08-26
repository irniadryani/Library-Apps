import { create } from "zustand";  
import { authStore } from "./authStore";  
import { globalStore } from "./globalStore";  
import { persist, createJSONStorage } from "zustand/middleware";  

// Create a Zustand store with persistence
const useStore = create(
  persist(
    (...state) => ({
      ...authStore(...state), // Spread authStore slice into the state
      ...globalStore(...state) // Spread globalStore slice into the state
    }),
    {
      name: "global-state", // Name of the storage key in sessionStorage
      getStorage: () => createJSONStorage(() => sessionStorage) // Use sessionStorage to persist the state
    }
  )
);

export default useStore;

import { create } from "zustand";  
import { authStore } from "./authStore";  
import { globalStore } from "./globalStore";  
import { persist, createJSONStorage } from "zustand/middleware";  

const useStore = create(
  persist(
    (...state) => ({
      ...authStore(...state), 
      ...globalStore(...state) 
    }),
    {
      name: "global-state",  
      getStorage: () => createJSONStorage(() => sessionStorage) 
    }
  )
);

export default useStore;


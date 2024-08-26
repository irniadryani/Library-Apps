// Function to create an authentication store
export const authStore = (set) => ({
  authUser: null,
  userSession: null,

  setUserSession: (session) => {
    set((state) => ({
      ...state,
      userSession: session,
    }));
  },

  setAuthUser: (user) => {
    set((state) => ({
      ...state,
      authUser: user,
    }));
  },

  logout: () => {
    set((state) => ({
      authUser: null,
      userSession: null,
    }));
    sessionStorage.clear(); 
  }
});

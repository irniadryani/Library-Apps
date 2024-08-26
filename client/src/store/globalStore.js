// Function to create a global store
export const globalStore = (set) => ({
  requestLoading: false,

  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
});

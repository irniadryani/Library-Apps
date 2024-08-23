export const globalStore = (set) => ({
  requestLoading: false,

  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
});

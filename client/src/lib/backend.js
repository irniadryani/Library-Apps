// Function to get the backend host URL
export function getBackendHost() {
  return (
    import.meta.env.VITE_BACKEND_HOST?.replace(/\/$/, "") ||
    window.location.origin
  );
}

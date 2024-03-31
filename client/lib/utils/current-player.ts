export function getCurrentPlayerToken() {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("currentPlayer") ?? undefined;
  }
  return undefined;
}

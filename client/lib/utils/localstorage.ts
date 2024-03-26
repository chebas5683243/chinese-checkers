export function getNicknameFromLocalStorage() {
  if (typeof window === "undefined") {
    return "";
  }
  console.log("getNicknameFromLocalStorage");
  return localStorage.getItem("nickname");
}

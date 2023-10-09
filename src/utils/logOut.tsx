export function logOut() {
  // @ts-ignore
  window.location = "/auth/login";
  localStorage.clear();
}

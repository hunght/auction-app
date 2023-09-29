const TOKEN_KEY = "token";

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(value: string) {
  localStorage.setItem(TOKEN_KEY, value);
}

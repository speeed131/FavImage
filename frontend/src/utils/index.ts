export const utils = {
  getLocalToken: () => localStorage.getItem("token"),
  saveLocalToken: (token: string) => localStorage.setItem("token", token),
  removeLocalToken: () => localStorage.removeItem("token"),
};

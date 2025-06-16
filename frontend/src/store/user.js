import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  login: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useUserStore;

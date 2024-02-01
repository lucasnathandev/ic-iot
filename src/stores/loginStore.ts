import { defineStore } from "pinia";
import { authAPI } from "../lib/axios";

export const useLoginStore = defineStore("login", {
  actions: {
    async login(payload: { email: string; password: string }) {
      const response = await authAPI.post("/login", {
        email: payload.email,
        password: payload.password,
      });
      const { token } = response.data;
      if (token) localStorage.setItem("jwt", token);
    },

    logout() {
      localStorage.removeItem("jwt");
    },
  },
});

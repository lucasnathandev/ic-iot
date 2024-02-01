import { defineStore } from "pinia";
import { customerAPI } from "../lib/axios";

export const useCustomerStore = defineStore("customer", {
  actions: {
    async create(payload: {
      name: string;
      age: number;
      cpf: string;
      email: string;
      password: string;
    }) {
      const response = await customerAPI.post("/create", payload);
      if (response.status === 201) return true;
    },
  },
});

import { authAPI, boxAPI } from "../lib/axios";
import { defineStore } from "pinia";
import { useSocket } from "../lib/socket-io";
import { ref } from "vue";

export const useBoxDataStore = defineStore("box-data", {
  state() {
    const boxes = ref();
    return { boxes };
  },
  actions: {
    async sendBoxData(payload: any) {
      const socket = useSocket();
      socket.emit("box-data", payload);
    },

    async getBoxData(payload: { id: string }) {
      const { id } = payload;
      const socket = useSocket();
      this.$state.boxes = socket.emit("box-data", { id });
    },
  },
});

export const useIotBoxStore = defineStore("iot-box", () => {
  const boxes = ref<any[]>([]);

  async function loadBox(id: string): Promise<any> {
    const response = await boxAPI.get(id);
    return response.data;
  }

  async function loadAllBoxes(): Promise<void> {
    const response = await boxAPI.get("");
    boxes.value = response.data;
  }

  return {
    boxes,
    loadAllBoxes,
    loadBox,
  };
});

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

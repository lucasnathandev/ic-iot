import { authAPI, boxAPI } from "../lib/axios";
import { defineStore } from "pinia";
import { useSocket } from "../lib/socket-io";
import { ref } from "vue";
import { ISensorFields } from "../interfaces/sensor-fields.interface";

export const useBoxDataStore = defineStore("box-data", {
  state() {
    const boxDataList = ref<
      {
        id: string;
        battery: number;
        date: Date;
        time: string;
        sensors: ISensorFields;
        boxId: string;
        readonly customerId?: string;
      }[]
    >([]);
    const socket = useSocket();

    socket.on("send-box-data", (boxData) => {
      console.log(boxData);
    });

    socket.on("get-box-data", (data) => {
      boxDataList.value =
        data.length > 20
          ? Array.from(data).filter((_, index) => index >= data.length - 20)
          : data;
    });

    return { boxDataList, socket };
  },
  actions: {
    async sendBoxData(payload: any) {
      const socket = this.$state.socket;

      socket.emit("send-box-data", payload);
    },

    async getBoxData(id: string) {
      const socket = this.$state.socket;
      socket.emit("get-box-data", id);
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

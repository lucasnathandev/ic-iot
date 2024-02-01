import { defineStore } from "pinia";
import { ref } from "vue";
import { ISensorFields } from "../interfaces/sensor-fields.interface";
import { useSocket } from "../lib/socket-io";

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

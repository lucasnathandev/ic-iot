import { defineStore } from "pinia";
import { boxAPI } from "../lib/axios";
import { ref } from "vue";

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

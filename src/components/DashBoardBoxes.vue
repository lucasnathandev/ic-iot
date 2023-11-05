
<script setup lang="ts">


import { onBeforeMount } from 'vue';
import { useIotBoxStore } from '../stores';
import { useRouter } from 'vue-router';


const iotBoxStore = useIotBoxStore()



async function loadBoxes() {

  await iotBoxStore.loadAllBoxes()
}

async function handleBoxDataRoute(id: string) {
  useRouter().push('/iot-box/' + id)
}

onBeforeMount(loadBoxes)

</script>
<template>
  <q-list bordered separator>
    <q-item @click="async () => await handleBoxDataRoute(iotBox.id)" v-for="iotBox in iotBoxStore.boxes" :key="iotBox.id"
      clickable v-ripple>
      <q-item-section>{{ iotBox.name }}</q-item-section>
    </q-item>
  </q-list>
</template>
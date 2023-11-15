
<script setup lang="ts">


import { onBeforeMount } from 'vue';
import { useIotBoxStore } from '../stores';



const iotBoxStore = useIotBoxStore()



async function loadBoxes() {

  await iotBoxStore.loadAllBoxes()
}

onBeforeMount(loadBoxes)

</script>
<template>
  <div class="text-h4 text-center q-py-md">
    Lista de IotBox
  </div>
  <q-list bordered separator>
    <q-item class="bg-dark text-white">
      <q-item-section>Nome da IotBox</q-item-section>
      <q-item-section>ID do Proprietário</q-item-section>
    </q-item>
    <q-item :to="'/iot-box/' + iotBox.id" v-for="iotBox in iotBoxStore.boxes" :key="iotBox.id" clickable v-ripple>
      <q-item-section>{{ iotBox.name }}</q-item-section>
      <q-item-section>{{ iotBox.customerId }}</q-item-section>
      <q-tooltip :delay="300">Clique para monitorar a IotBox</q-tooltip>
    </q-item>
  </q-list>
</template>
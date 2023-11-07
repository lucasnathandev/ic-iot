
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
  <q-list bordered separator>
    <q-item :to="'/iot-box/' + iotBox.id" v-for="iotBox in iotBoxStore.boxes" :key="iotBox.id" clickable v-ripple>
      <q-item-section>{{ iotBox.name }}</q-item-section>
    </q-item>
  </q-list>
</template>
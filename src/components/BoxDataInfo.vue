
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { boxAPI } from '../lib/axios';
import { BoxDataProps } from '../interfaces/box-data-props.interface';

const data: BoxDataProps = await requestBoxData();



async function requestBoxData() {
  const response = await boxAPI.get<BoxDataProps>('/box-data/' + useRoute().params.id)
  return response.data
}




</script>

<template>
  <q-list bordered separator class="q-pt-xl q-pb-xl">
    <q-item class="bg-dark text-white"><q-item-section>Sensores</q-item-section></q-item>
    <q-item v-for="sensor in Object.entries(data.sensors)">
      <q-item-section>{{ sensor[0].toUpperCase() }}</q-item-section>
      <q-item-section v-if="sensor[0] === 'gps'">{{ sensor[1].latitude }}</q-item-section>
      <q-item-section v-if="sensor[0] === 'gps'">{{ sensor[1].longitude }}</q-item-section>
      <q-item-section v-else>{{ sensor[1] }}</q-item-section>
    </q-item>
  </q-list>
</template>


<style scoped>
.fullsize {
  width: 100%;
  height: 100%;
}
</style>
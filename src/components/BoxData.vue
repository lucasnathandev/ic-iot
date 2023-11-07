<script setup lang="ts">

import { ISensorFields } from '../interfaces/sensor-fields.interface'


const { boxData } = defineProps<{
  boxData: {
    id: string
    battery: number;
    date: Date;
    time: string;
    sensors: ISensorFields;
    boxId: string;
    customerId?: string;
  }
}>(
)

const date = new Date(boxData.date).toLocaleDateString()

</script>

<template>
  <q-item :to="'/box-data/' + boxData.id">
    <q-item-section>{{ boxData.battery }}</q-item-section>
    <q-item-section>{{ date }}</q-item-section>
    <q-item-section>{{ boxData.time }}</q-item-section>
    <q-item-section><q-item-section>
        {{ boxData.sensors.gps.latitude }}
      </q-item-section>
      <q-item-section>
        {{ boxData.sensors.gps.longitude }}
      </q-item-section></q-item-section>
    <!-- <q-item-section v-for="data in boxData.sensors">{{ data }}</q-item-section> -->

  </q-item>
</template>

<style scoped></style>
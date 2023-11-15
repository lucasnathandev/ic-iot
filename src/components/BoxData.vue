<script setup lang="ts">

import { BoxDataProps } from '../interfaces/box-data-props.interface';



const { boxData } = defineProps<{
  boxData: BoxDataProps
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
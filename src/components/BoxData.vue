<script setup lang="ts">

import { useRoute } from 'vue-router';
import { ISensorFields } from '../interfaces/sensor-fields.interface'
import { useBoxDataStore } from '../stores';
import { onBeforeMount } from 'vue';

const props = defineProps<{
  battery: number;
  date: Date;
  time: string;
  sensors: ISensorFields;
  boxId: string;
  readonly customerId?: string;
}>(
)

const routeParams = useRoute().params

const store = useBoxDataStore()

onBeforeMount(() => getBoxData(routeParams.id instanceof Array ? routeParams.id[0] : routeParams.id))

async function getBoxData(id: string) {
  const socket = await store.getBoxData({ id })
  return socket
}

</script>

<template>
  <q-list bordered separator>
    <q-item v-for="boxData in store.boxes">
      <q-item-section>
        {{ JSON.stringify(boxData) }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style scoped></style>
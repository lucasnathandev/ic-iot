<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import BoxData from '../components/BoxData.vue'
import { useBoxDataStore } from '../stores';
import { onBeforeMount, onMounted } from 'vue';
import { faker } from '@faker-js/faker'


const store = useBoxDataStore()

const routeParams = useRoute().params

onBeforeMount(async () => await getBoxData(resolveRouteParam('id')))

function resolveRouteParam(propertyToResolve: string) {

  const param = routeParams[propertyToResolve]

  return param instanceof Array ? param[0] : param
}

async function getBoxData(id: string) {

  await store.getBoxData(id)
}

const fakeCustomerId = faker.string.uuid()
let intervalId: NodeJS.Timeout

onMounted(() => {
  intervalId = setInterval(async () => {
    await store.sendBoxData({
      battery: faker.number.float({ min: 0.01, max: 1 }),
      date: new Date(),
      sensors: { acceleration: 20, gps: { latitude: faker.location.latitude(), longitude: faker.location.longitude() } },
      boxId: resolveRouteParam('id'),
      customerId: fakeCustomerId
    })

    await store.getBoxData(resolveRouteParam('id'))

  }, 5000)
})

onBeforeRouteLeave(() => clearInterval(intervalId))


</script>

<template>
  <q-item class="fixed-top bg-dark text-blue-1">
    <q-item-section>Bateria</q-item-section>
    <q-item-section>Data</q-item-section>
    <q-item-section>Horário</q-item-section>
    <q-item-section>GPS</q-item-section>
  </q-item>
  <q-list bordered separator class="q-pt-xl">
    <BoxData ref="boxDataListRef" v-for="(boxData, index) in store.boxDataList" :boxData="boxData" :key="index" />
    <div class="row justify-center">
      <q-spinner-puff color="green-8" size="3em" />
    </div>
  </q-list>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import DashBoardBoxes from '../components/DashBoardBoxes.vue';
import { useLoginStore } from '../stores';


const store = useLoginStore()



function logout() {
  store.logout()

  useRouter().push('/')
}

</script>

<template>
  <nav class="column q-py-md q-px-md items-end">
    <q-btn class="bg-deep-orange-6 text-white" label="Logout" @click="logout"></q-btn>
  </nav>
  <DashBoardBoxes></DashBoardBoxes>
</template>


<style scoped></style>
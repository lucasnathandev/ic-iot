
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLoginStore } from '../stores';

const router = useRouter()
const store = useLoginStore()



function logout() {
  store.logout()

  router.push('/')
}
</script>


<template>
  <nav class="column q-py-md q-px-md items-end">
    <q-btn class="bg-deep-orange-6 text-white" label="Logout" @click="logout"></q-btn>
  </nav>
</template>

<style scoped></style>
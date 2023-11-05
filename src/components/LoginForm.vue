<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useLoginStore } from '../stores';
import { useRouter } from 'vue-router';

const email = ref<string>('')

const password = ref<string>('')

const store = useLoginStore()

function isAuthenticated() {
  return !!localStorage.getItem('jwt')
}

onBeforeMount(() => {
  if (isAuthenticated()) useRouter().push('/dashboard')
})


async function onSubmit() {
  await store.login({ email: email.value, password: password.value })
  useRouter().push('/dashboard')
}


function onReset() {
  email.value = ''
  password.value = ''
}

</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md column justify-center">

    <q-input class="row-3" filled v-model="email" label="Email" hint="e.g. youremail@email.com" lazy-rules
      :rules="[val => /^[\w\d\.\_]+@\w+\.\w{2,}$/.test(val) || 'Por favor coloque um email valido']"></q-input>
    <q-input class="row-3" filled v-model="password" type="password" label="Password" hint="e.g yourpassword" lazy-rules
      :rules="[val => /^.{7,}$/.test(val) || 'Por favor coloque uma senha com no mínimo 8 caractéres']"></q-input>
    <q-btn class="row-6" type="submit" color="primary" label="Sign In"></q-btn>

  </q-form>
</template>

<style scoped></style>

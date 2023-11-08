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

const submitting = ref<boolean>(false)

async function onSubmit() {
  submitting.value = true
  await store.login({ email: email.value, password: password.value }).catch(e => {

    alert('Credenciais inválidas')
    onReset()
  })

  useRouter().push('/dashboard')
}


function onReset() {
  submitting.value = false
  email.value = ''
  password.value = ''
}

</script>

<template>
  <div class="container">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md column justify-center">

      <q-input class="row-3" filled v-model="email" label="Email" hint="e.g. youremail@email.com" lazy-rules
        :rules="[val => /^[\w\d\.\_]+@\w+\.\w{2,}$/.test(val) || 'Por favor coloque um email valido']"></q-input>
      <q-input class="row-3" filled v-model="password" type="password" label="Password" hint="e.g yourpassword" lazy-rules
        :rules="[val => /^.{7,}$/.test(val) || 'Por favor coloque uma senha com no mínimo 8 caractéres']"></q-input>
      <q-btn class="row-6" type="submit" color="primary" label="Sign In"></q-btn>

      <div class="q-pa-md flex flex-center">
        <q-circular-progress v-if="submitting" indeterminate rounded size="50px" color="lime" class="q-ma-md" />
      </div>
    </q-form>
  </div>
</template>

<style scoped>
div.container {
  display: flex;
  min-width: 300px;
  width: 50vw;
  min-height: 400px;
  height: 70vh;
  position: relative;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
}

div.container>form {
  width: 100%;
  height: 100%;
}
</style>

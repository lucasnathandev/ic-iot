<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useLoginStore } from '../stores';
import { useRouter } from 'vue-router';

const router = useRouter()

const email = ref<string>('')

const password = ref<string>('')

const store = useLoginStore()

const isAuthenticated = ref<Storage>(localStorage)

onBeforeMount(() => {
  if (isAuthenticated.value.getItem('jwt')) useRouter().push('/dashboard')
})

const submitting = ref<boolean>(false)

async function onSubmit() {
  submitting.value = true
  await store.login({ email: email.value, password: password.value }).catch(() => {

    alert('Credenciais inválidas')
    submitting.value = false; onReset()
  })

  router.push('/dashboard')
}


function onReset() {

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
      <div class="btn-container">
        <q-btn class="q-mx-sm" type="submit" color="primary" label="Entrar na conta"></q-btn>
        <q-btn class="q-mx-sm" type="reset" color="white" text-color="black" label="Limpar Formulário"></q-btn>
      </div>

      <div class="q-pa-md flex flex-center">
        <q-circular-progress v-if="submitting" indeterminate rounded size="50px" color="lime" class="q-ma-md" />
      </div>
      <q-btn to="/new-account" color="secondary">Criar uma conta</q-btn>
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

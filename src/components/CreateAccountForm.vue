

<script setup lang="ts">

import { ref } from 'vue'
import { useCustomerStore } from '../stores'
import { useRouter } from 'vue-router';
import { CPF } from '../lib/CPF';

const submitting = ref<boolean>(false)

const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')
const name = ref<string>('')
const age = ref<number>(0)
const cpf = ref<string>('')


const store = useCustomerStore()


async function onSubmit() {
  submitting.value = true
  const created = await store.create({ name: name.value, age: age.value, cpf: cpf.value, email: email.value, password: password.value }).catch(() => {
    submitting.value = false; onReset()
  })
  console.log(created, router);

  if (created) router.push('/')
}


function onReset() {
  name.value = ''
  age.value = 0
  email.value = ''
  password.value = ''
}
</script>

<template>
  <div class="container">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md column self-center justify-center">
      <q-input required filled v-model="name" label="Nome completo" hint="Seu Nome Completo" lazy-rules
        :rules="[val => /^[a-zA-Z\s]{5,150}$/g.test(val) || 'Por favor coloque um nome válido']"></q-input>
      <q-input filled v-model="age" label="Sua idade" hint="Sua idade" type="number" lazy-rules
        :rules="[val => /\d{1,2}/g.test(val) || 'Digite uma idade valida']"></q-input>
      <q-input filled v-model="cpf" label="CPF" hint="Formato: xxx.xxx.xxx-xx ou xxxxxxxxxxx" lazy-rules
        :rules="[val => new CPF(val).validateCpf(CPF.unMaskCpf(val)) || 'Por favor coloque um CPF valido']"></q-input>
      <q-input filled v-model="email" label="Email" hint="seuemail@email.com" lazy-rules
        :rules="[val => /^[\w\d\.\_]+@\w+\.\w{2,}$/.test(val) || 'Por favor coloque um email valido']"></q-input>
      <q-input filled v-model="password" type="password" label="Senha" hint="suasenha" lazy-rules
        :rules="[val => /^.{7,}$/.test(val) || 'Por favor coloque uma senha com no mínimo 8 caractéres']"></q-input>
      <div class="btn-container">
        <q-btn class="row-6 q-mx-sm" type="submit" color="primary" label="Cadastrar"></q-btn>
        <q-btn class="row-6 q-mx-sm" type="reset" color="white" text-color="black" label="Limpar formulário"></q-btn>
      </div>

      <div class="q-pa-md flex flex-center">
        <q-circular-progress v-if="submitting" indeterminate rounded size="50px" color="lime" class="q-ma-md" />
      </div>
    </q-form>
  </div>
</template>

<style scoped></style>
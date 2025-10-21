<template>
  <div>
    <p v-if="mostrarMensagem">Bem-vindo ao Vue.js!</p>
    <button @click="mostrarMensagem = !mostrarMensagem">Alternar mensagem</button>
  </div>
</template>

<script>
export default {
  name: 'ExercicioUm',
  data(){
    return {
      mostrarMensagem: true
    }
  }
}
</script>

<style scoped>
  
</style>

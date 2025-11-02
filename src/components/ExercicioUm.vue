<template>
  <div class="divExercicios">
    <p v-if="mostrarMensagem">Bem-vindo ao Vue.js!</p>
    <button class="botaoExercicios" @click="mostrarMensagem = !mostrarMensagem">Alternar mensagem</button>
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
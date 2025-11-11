<template>
  <section>
    <div class="divExercicios">
      <p v-if="mostrarMensagem">Bem-vindo ao Vue.js!</p>
      <button @click="mostrarMensagem = !mostrarMensagem">Alternar mensagem</button>
    </div>
  </section>
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

<style>
button{
  background-color:rgb(85, 85, 85);
  color: rgb(255, 255, 255);
  border-radius: 8px;
  text-decoration: none;
  border: none;
  width: 120px;
  height: 45px;
  font-size: 12pt;
  margin: 8px;
}
button:hover{
  background-color: rgb(171, 169, 169);
}
p{
  color: rgb(100, 100, 100);
  font-family: Arial, Helvetica, sans-serif;
}
div {
  text-align: center;
  padding: 8px; 
}
section { 
  background: white;
  border-radius: 10px;
  padding: 15px;
  width: 900px;
  margin: auto;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.367);
  text-align: center;
  margin-top: 28px;
}
</style>
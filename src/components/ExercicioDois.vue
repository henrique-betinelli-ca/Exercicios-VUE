<template>
  <div>
    <ul>
      <li v-for="fruta in frutas" :key="fruta">{{ fruta }}</li>
    </ul>

    <input type="text" id="novaFruta">
    <button @click="adicionarNovaFruta()" >Adicionar</button>
  </div>
</template>

<script>
export default {
  name: 'ExercicioDois',
  data(){
    return {
      frutas: ['Maçã', 'Banana', 'Laranja']
    }
  }, 
  methods: {
    adicionarNovaFruta(){
      let novaFruta = document.getElementById("novaFruta").value
      if(!this.frutas.includes(novaFruta)){
        this.frutas.push(novaFruta)
      } 

      document.getElementById("novaFruta").value = ''
    }
  }
}
</script>

<style scoped>
  
</style>

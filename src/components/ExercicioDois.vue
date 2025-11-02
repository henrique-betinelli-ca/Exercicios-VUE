<template>
  <div class="divExercicios">
    <ul>
      <li v-for="fruta in frutas" :key="fruta">{{ fruta }}</li>
    </ul>

    <input type="text" v-model="novaFruta">
    <button class="botaoExercicios" @click="adicionarNovaFruta()" >Adicionar</button>
  </div>
</template>

<script>
export default {
  name: 'ExercicioDois',
  data(){
    return {
      frutas: ['Maçã', 'Banana', 'Laranja'],
      novaFruta: '',
    }
  }, 
  methods: {
    adicionarNovaFruta(){
      if(!this.frutas.includes(this.novaFruta) && this.novaFruta.trim()){
        this.frutas.push(this.novaFruta)
      } 

      this.novaFruta = ''
    }
  }
}
</script>

<style scoped>
  input{
    width: 120px;
    border: 2px solid;
    border-color: rgb(194, 192, 192);
    border-radius: 8px;
    padding: 8px;
  }
</style>
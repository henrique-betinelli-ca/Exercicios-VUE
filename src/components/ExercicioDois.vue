<template>
  <div>
    <ul>
      <li v-for="fruta in frutas" :key="fruta">{{ fruta }}</li>
    </ul>

    <input type="text" v-model="novaFruta">
    <button @click="adicionarNovaFruta()" >Adicionar</button>
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
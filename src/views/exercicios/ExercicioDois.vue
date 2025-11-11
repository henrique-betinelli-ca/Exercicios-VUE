<template>
  <section>
    <div class="divExercicios">
      <ul>
        <li v-for="fruta in frutas" :key="fruta">{{ fruta }}</li>
      </ul>
      <input type="text" v-model="novaFruta">
      <button @click="adicionarNovaFruta()" >Adicionar</button>
    </div>
  </section>
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
  ul{
    list-style-position: inside;
    text-align: left;
    padding: 10px;
    color: rgb(171, 169, 169);
  }
  li{
    padding: 3px;
    color: rgb(100, 100, 100);
    font-size: 12pt;
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
  input{
    width: 120px;
    border: 2px solid;
    border-color: rgb(194, 192, 192);
    border-radius: 8px;
    padding: 8px;
  }
</style>
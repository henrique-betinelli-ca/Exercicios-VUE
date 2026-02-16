<template>

  <section>
    <h1>Exercicios Vue.js</h1>
    <hr>
    <button v-for="(exercico, index) in exercicios" :key="exercico" @click="irParaExercicio(exercico)">Exercício {{ index + 1 }}</button>
  </section>

</template>

<script>

  export default {
    name: 'PaginaInicial',
    data() {
      return {
        exercicios: [
          'ExercicioUm',
          'ExercicioDois',
          'ExercicioTres',
          'ExercicioQuatro',
          'ExercicioCinco',
          'ExercicioSeis',
          'ExercicioSete',
          'ExercicioOito',
          'ExercicioNove',
        ]
      }
    },
    methods: {
      irParaExercicio(exercicio) {
        this.$router.push(`/${exercicio}`)
      }
    }
  }

</script>

<style scoped>
  #app {
    body {
      background: rgb(202, 212, 201);
      font: normal 12pt Arial;
    }
    h1{
      color: rgb(91, 91, 91);
      font-family: Arial, Helvetica, sans-serif;
    }
    h2{
      font-family: Arial, Helvetica, sans-serif;
      color: rgb(91, 91, 91);
    }
    h3{
      font-family: Arial, Helvetica, sans-serif;
      color: rgb(91, 91, 91);
    }
    h4{
      font-size: 13pt;
      font-family: Arial, Helvetica, sans-serif;
      color: rgb(91, 91, 91);
    }
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
    table{
      width: 500px;
      border-collapse: collapse;
      border: 3px solid rgb(176, 176, 176);
      color: rgb(91, 90, 90);
    }
    td, th{
      text-align: center;
      border: 2px solid rgb(194, 192, 192);
      color: rgb(194, 192, 192);
    }
    div {
      text-align: center;
      padding: 8px; 
    }
    select{
      border: 2px solid;
      border-color: rgb(194, 192, 192);
      border-radius: 8px;
      padding: 8px;
      color: rgb(91, 90, 90);
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
  }
</style>
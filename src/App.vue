<template>

  <section v-for="(exercico, index) in exercicios" :key="exercico" class="sectionExercicios">
    <h1>Exercicio {{ index + 1 }}</h1>
    <hr>
    <component :is="exercico" />
  </section>

</template>

<script>
  import ExercicioUm from './components/ExercicioUm.vue'
  import ExercicioDois from './components/ExercicioDois.vue'
  import ExercicioTres from './components/ExercicioTres.vue'
  import ExercicioQuatro from './components/ExercicioQuatro.vue'
  import ExercicioCinco from './components/ExercicioCinco.vue'
  import ExercicioSeis from './components/ExercicioSeis/ExercicioSeis.vue'

  export default {
    name: 'App',
    components: {
      ExercicioUm,
      ExercicioDois,
      ExercicioTres,
      ExercicioQuatro,
      ExercicioCinco,
      ExercicioSeis,
    },
    data() {
      return {
        exercicios: [
          'ExercicioUm',
          'ExercicioDois',
          'ExercicioTres',
          'ExercicioQuatro',
          'ExercicioCinco',
          'ExercicioSeis',
        ]
      }
    },
  }
</script>

<style>
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
    }
    h4{
      font-size: 13pt;
      font-family: Arial, Helvetica, sans-serif;
      color: rgb(91, 91, 91);
    }
    .botaoExercicios{
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
    .botaoExercicios:hover{
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
    .divExercicios {
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
    .sectionExercicios { 
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
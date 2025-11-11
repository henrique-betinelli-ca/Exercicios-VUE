<template>
  <section>
    <div class="divExercicios">
      <ul>
        <li v-for="link in links" :key="link.nome"><a :href="link.url">{{ link.nome }}</a></li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ExercicioTres',
  data(){
    return {
      links: [
        { nome: 'Google', url: 'https://google.com' },
        { nome: 'Vue.js', url: 'https://vuejs.org' },
        { nome: 'Youtube', url: 'https://www.youtube.com'}
      ]
    }
  }
}
</script>

<style>
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
</style>
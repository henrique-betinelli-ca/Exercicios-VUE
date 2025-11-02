<template>
  <div class="divExercicios">
    <ul>
      <li v-for="link in links" :key="link.nome"><a :href="link.url">{{ link.nome }}</a></li>
    </ul>
  </div>
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
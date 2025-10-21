<template>
  <div>
    <ul>
      <template v-for="usuario in usuarios" :key="usuario.nome">
        <li v-if="usuario.ativo">{{ usuario.nome }}</li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ExercicioQuatro',
  data(){
    return {
      usuarios: [
        { nome: 'Ana', ativo: true },
        { nome: 'Carlos', ativo: false },
        { nome: 'Beatriz', ativo: true }
      ]
    }
  }
}
</script>

<style scoped>
  
</style>

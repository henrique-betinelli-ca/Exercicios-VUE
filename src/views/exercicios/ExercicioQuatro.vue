<template>
  <section>
    <div class="divExercicios">
      <ul>
        <template v-for="usuario in usuarios" :key="usuario.nome">
          <li v-if="usuario.ativo">{{ usuario.nome }}</li>
        </template>
      </ul>
    </div>
  </section>
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
<template>
  <section>
    <div v-for="produto in produtos" :key="produto.nome" class="divExercicios">
      <p>{{ produto.nome }} - R${{ produto.preco }}</p>
      <p v-show="produto.mostrar">{{ produto.descricao }}</p>
      <button @click="produto.mostrar = !produto.mostrar" >Mostrar Descrição</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ExercicioCinco',
  data(){
    return {
      produtos: [
        { id: 1, nome: 'Mouse', preco: 59.90, descricao: 'Mouse sem fio', mostrar: false },
        { id: 2, nome: 'Teclado', preco: 129.00, descricao: 'Teclado mecânico', mostrar: false }
      ]
    }
  }
}
</script>

<style>
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
<template>
  <div v-for="produto in produtos" :key="produto.nome" class="divExercicios">
    <p>{{ produto.nome }} - R${{ produto.preco }}</p>
    <p v-show="produto.mostrar">{{ produto.descricao }}</p>
    <button class="botaoExercicios" @click="produto.mostrar = !produto.mostrar" >Mostrar Descrição</button>
  </div>
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
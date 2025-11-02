<template>

  <FormularioCards 
    :CardParaEdicao="cardParaEdicao" 
    @enviarNovoCards="passarNovoCard"
    @cancelarEdicaoDoCard="cardParaEdicao = null"
    @salvarEdicaoCard="passarCardEditado"
  />

  <ColunasCards 
    :card="card" 
    :cardEditado="cardEditado"
    @passarDadosDoCardParaEditar="passarDadosDoCardParaEditar"
  />

</template>

<script>

  import FormularioCards from './FormularioCards.vue'
  import ColunasCards from './ColunasCards.vue'

  export default {
    name: 'ExercicioSeis',
    components: {
      FormularioCards,
      ColunasCards,
    },
    data() {
      return {
        card: {},
        cardParaEdicao: {},
        cardEditado: null,
      }
    },
    methods: {
      passarNovoCard(novoCard){
        this.card = novoCard
      },

      passarDadosDoCardParaEditar(dadosDoCard){
        this.cardParaEdicao = dadosDoCard
      },

      passarCardEditado(novoCard){ 
        this.cardEditado = {
          original: this.cardParaEdicao, 
          novo: novoCard               
        }

        this.cardParaEdicao = null
      }
    }
  }
</script>
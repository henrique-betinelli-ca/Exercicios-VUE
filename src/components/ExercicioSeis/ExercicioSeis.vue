<template>

  <FormularioCards 
    :cardParaEdicao="cardParaEdicao" 
    @novo-card="passarNovoCard"
    @edicao-cancelada="cardParaEdicao = null"
    @card-atualizado="passarCardEditado"
  />

  <ColunasCards 
    :card="card" 
    :cardEditado="cardEditado"
    @card-passado-para-edicao="passarDadosDoCardParaEditar"
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
        this.cardEditado = novoCard

        this.cardParaEdicao = null
      }
    }
  }
</script>
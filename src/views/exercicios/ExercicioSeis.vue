<template>

  <section>
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
  </section>
  
</template>

<script>

  import FormularioCards from '../../components/ExercicioSeis/FormularioCards.vue'
  import ColunasCards from '../../components/ExercicioSeis/ColunasCards.vue'

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

<style scoped>
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
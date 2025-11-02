<template>
    <button class="botaoExercicios" v-show="!mostrarFormularioParaAdicionarCard && !mostrarFormularioParaDditarDadosCard" @click="mostrarFormularioParaAdicionarCard = true">Novo item</button>
    <form v-show="mostrarFormularioParaAdicionarCard || mostrarFormularioParaDditarDadosCard" class="formularioNovoCard">
      <div class="campoGrupo">
        <h2>Titulo</h2>
        <input type="text" class="campoTexto" v-model="cardPrincipalSendoUtilizado.titulo">
      </div>

      <div class="campoGrupo">
        <h2>Descrição</h2>
        <input type="text" class="campoTexto" v-model="cardPrincipalSendoUtilizado.descricao">
      </div>

      <div class="campoGrupo">
        <h2>Coluna</h2>
        <div class="opcaoRadio">
          <input type="radio" class="campoRadio" name="colunaCard" value="Backlog" v-model="cardPrincipalSendoUtilizado.coluna">
          <label>Backlog</label>
        </div>
        <div class="opcaoRadio">
          <input type="radio" class="campoRadio" name="colunaCard" value="Doing" v-model="cardPrincipalSendoUtilizado.coluna">
          <label>Doing</label>
        </div>
        <div class="opcaoRadio">
          <input type="radio" class="campoRadio" name="colunaCard" value="Done" v-model="cardPrincipalSendoUtilizado.coluna">
          <label>Done</label>
        </div>
      </div>
      
      <div class="campoGrupo">
        <h2>Prioridade</h2>
        <div class="opcaoRadio">
          <input type="radio" class="campoRadio" name="PrioridadeCard" value="Alta" v-model="cardPrincipalSendoUtilizado.prioridade">
          <label>Alta</label>
        </div>
        <div class="opcaoRadio">
          <input type="radio" class="campoRadio" name="PrioridadeCard" value="Média" v-model="cardPrincipalSendoUtilizado.prioridade">
          <label>Média</label>
        </div>
        <div class="opcaoRadio">
          <input type="radio" class="campoRadio" name="PrioridadeCard" value="Baixa" v-model="cardPrincipalSendoUtilizado.prioridade">
          <label>Baixa</label>
        </div>
      </div>

      <div class="campoGrupo">
        <h2>Responsável</h2>
        <input type="text" class="campoTexto" v-model="cardPrincipalSendoUtilizado.Responsavel">
      </div>

      <div class="campoGrupo">
        <h2>Prazo</h2>
        <input type="date" class="campoTexto" v-model="cardPrincipalSendoUtilizado.Prazo">
      </div>

      <div v-if="mostrarFormularioParaAdicionarCard">
        <button class="btnCriarNovoCard" @click.prevent="adicionarNovoCard()">Criar Card</button>
        <p class="mensagemErro"> {{ mensagemErroParaAdicionarCard }}</p>
      </div>
      <div v-if="mostrarFormularioParaDditarDadosCard" class="botoesParaEdicaoDeCard">
        <button class="btnSalvarDadosDoCard" @click.prevent="salvarNovosDadosDoCard()">Salvar</button>
        <button class="btnCancelarEdicaoDoCard" @click.prevent="cancelarEdicaoDoCard()">Cancelar</button>
        <p class="mensagemErro"> {{ mensagemErro }}</p>
      </div>
    </form>

</template>

<script>

export default {
  name: 'FormularioCards',
  props: {
    CardParaEdicao: {}
},
  data() {
    return {
      mostrarFormularioParaAdicionarCard: false,
      mostrarFormularioParaDditarDadosCard: false,
      mensagemErroParaAdicionarCard: '',
      cardParaEdicao: {},
      cardPrincipalSendoUtilizado: {
        titulo: '',
        descricao: '',
        coluna: '', 
        prioridade: '',
        Responsavel: '', 
        Prazo: '',
      }
    }
  },
  watch: {
    CardParaEdicao: {
      handler(novoCard) {
        if (novoCard){
          this.cardParaEdicao = novoCard
          this.cardPrincipalSendoUtilizado = {...this.cardParaEdicao}
          this.mostrarFormularioParaDditarDadosCard = true
          this.mostrarFormularioParaAdicionarCard = false
        } else {
          this.mostrarFormularioParaDditarDadosCard = false
        }
      },
    }
  },
  methods: {

    verificarCamposFormulario(){
      if (!this.cardPrincipalSendoUtilizado.titulo || !this.cardPrincipalSendoUtilizado.coluna || !this.cardPrincipalSendoUtilizado.prioridade || !this.cardPrincipalSendoUtilizado.Responsavel || !this.cardPrincipalSendoUtilizado.Prazo) {
        this.mensagemErroParaAdicionarCard = 'Por favor, preencha os campos anteriores para criar o card.'
        return false
      } else {
        this.mensagemErroParaAdicionarCard = ''
        return true
      }
    },

    limparCamposDoCardPrincipalSendoUtilizado(){
      this.cardPrincipalSendoUtilizado = {
        titulo: '',
        descricao: '',
        coluna: '',
        prioridade: '',
        Responsavel: '',
        Prazo: ''
      }
    },

    adicionarNovoCard() {
      if (!this.verificarCamposFormulario()){
        return
      }

      this.$emit('enviarNovoCards', {...this.cardPrincipalSendoUtilizado})

      this.limparCamposDoCardPrincipalSendoUtilizado()

      this.mostrarFormularioParaAdicionarCard = false
    },
    
    cancelarEdicaoDoCard() {
      if (!this.verificarCamposFormulario()){
        return
      }

      this.$emit('cancelarEdicaoDoCard')

      this.limparCamposDoCardPrincipalSendoUtilizado()

      this.mostrarFormularioParaDditarDadosCard = false
    },

    salvarNovosDadosDoCard(){
      if (!this.verificarCamposFormulario()){
        return
      }

      this.$emit('salvarEdicaoCard', {...this.cardPrincipalSendoUtilizado})

      this.limparCamposDoCardPrincipalSendoUtilizado()

      this.mostrarFormularioParaDditarDadosCard = false

    }
  }
}
</script>

<style scoped>
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
  .formularioNovoCard {
    font-family: Arial, Helvetica, sans-serif;
    background-color: white;
    text-align: left;
    border-radius: 10px;
    padding: 15px;
    width: 600px;
    max-width: 90%;
    margin: 28px auto;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.367);
    box-sizing: border-box;
  }

  .formularioNovoCard .campoTexto {
    width: 100%;
    border: 2px solid rgb(194, 192, 192);
    border-radius: 8px;
    padding: 8px;
    color: rgb(91, 90, 90);
    font-size: 12pt;
    font-family: Arial, Helvetica, sans-serif;
    box-sizing: border-box;
  }

  .formularioNovoCard .btnCriarNovoCard {
    background-color: rgb(85, 85, 85);
    color: rgb(255, 255, 255);
    border-radius: 8px;
    text-decoration: none;
    border: none;
    width: 100%;
    height: 50px;
    font-size: 12pt;
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 10px;
  }

  .formularioNovoCard .botoesParaEdicaoDeCard {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
  }

  .formularioNovoCard .btnSalvarDadosDoCard, .formularioNovoCard .btnCancelarEdicaoDoCard {
    flex: 1;
    background-color: rgb(85, 85, 85);
    color: rgb(255, 255, 255);
    border-radius: 8px;
    text-decoration: none;
    border: none;
    width: 45%;
    height: 40px;
    font-size: 12pt;
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 10px;
  }

  .formularioNovoCard .btnCriarNovoCard:hover, .formularioNovoCard .btnSalvarDadosDoCard:hover, .formularioNovoCard .btnCancelarEdicaoDoCard:hover {
  background-color: rgb(171, 169, 169);
}

  .formularioNovoCard .mensagemErro {
    color: #626262;
    font-size: 12pt;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    margin-top: 10px;
  }

  .formularioNovoCard .campoGrupo {
    margin-bottom: 1rem;
    text-align: left;
  }

  .formularioNovoCard .opcaoRadio {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .formularioNovoCard .opcaoRadio label {
    color: rgb(100, 100, 100);
    font-size: 12pt;
    font-family: Arial, Helvetica, sans-serif;
    margin-left: 8px;
    cursor: pointer;
  }

  .formularioNovoCard .campoRadio {
    accent-color: rgb(85, 85, 85);
    width: 16px;
    height: 16px;
  }
  .formularioNovoCard .campoGrupo h2 {
    text-align: left;
    margin: 0 0 0.5rem 0;
    font-family: Arial, Helvetica, sans-serif;
    color: rgb(91, 91, 91);
  }

</style>

<template>
    <section class="titulos">
        <div v-for="coluna in colunas" :key="coluna" class="areaNomeColunaCards">
            <h1>{{ coluna }}</h1>
        </div>
    </section>


    <section class="colunas">
        <div v-for="colunas in cardsPorColuna" :key="colunas.nome" class="areaColunaCards">
            <p v-show="colunas.cards.length === 0" class="MensagemDeColunaVazio">Nada aqui ainda.</p>
            <div v-for="card in colunas.cards" :key="card.titulo" class="card" :class="{ 'card-done': card.coluna === 'Done' }">
                <div class="cabecarioDoCard" :style="{ backgroundColor: card.prioridade === 'Alta' ? '#34516f' : card.prioridade === 'Média' ? '#517dac' : '#95b8dd', justifyContent: card.coluna === 'Backlog' ? 'flex-end' : 'space-between'}">
                    <button class="btnVoltarCard" v-show="card.coluna != 'Backlog' && card.coluna != 'Done'" @click="moverCard(card, -1)">←</button>
                    <button class="btnAvancarCard" v-show="card.coluna != 'Done'" @click="moverCard(card, +1)">→</button>
                    <button class="btnRestaurarCard" v-show="card.coluna == 'Done'" @click="restaurarCard = card.coluna = 'Backlog'">Reabrir</button>
                </div>
                <div class="corpoDoCard">
                    <div class="primeiraColunaDoCard">
                        <div>
                            <h1>{{ card.titulo }}</h1>
                            <p v-if="!card.descricao == ''">{{ card.descricao }}</p>
                        </div>
                        <div>
                            <button class="btnEditarCard" @click="editarDadosDoCard(card)">Editar</button>
                            <button class="btnExcluirCard" @click="excluirCard(card)">Excluir</button>
                        </div>
                    </div>
                    <div class="segundaColunaDoCard">
                        <div>
                            <h2>{{ card.responsavel }}</h2>
                        </div>
                        <div class="dataCard">
                            <p v-show="new Date(card.prazo) <= dataAtual && card.coluna != 'Done'" class="alertaAtencaoPrazo" >Atenção ao Prazo!</p>
                            <h3>{{ card.prazo }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>

    export default {
        name: 'ColunasCards',
        props: {
            card: {},
            cardEditado: {},
        },

        data(){
            return {
                todosOsCards: [],
                colunas: ['Backlog', 'Doing', 'Done'],
                dataAtual: new Date()
            }
        },
        watch: {
            card: {
                handler(novoCard) {
                    if (novoCard) {
                        this.todosOsCards.push(novoCard);
                    }
                }
            },
            cardEditado: {
                handler(novoCard) { 
                    if(novoCard) {
                        const index = this.todosOsCards.findIndex(c => c.id === novoCard.id) 

                        if(index !== -1) {
                            this.todosOsCards.splice(index, 1, {...novoCard})
                        }
                    }
                },
                deep: true
            }
        },
        computed: {
            cardsPorColuna(){
                return this.colunas.map(nomeColuna => {
                    return {
                        nome: nomeColuna,
                        cards: this.cardsOrdenados.filter(card => card.coluna === nomeColuna)
                    }
                })
            },
            
            cardsOrdenados(){
                const prioridadePeso = {'Alta': 3, 'Média': 2, 'Baixa': 1}

                return this.todosOsCards.slice().sort((cardA, cardB) => {
                    if(cardA.prazo < this.dataAtual && cardB.prazo > this.dataAtual){
                        return -1
                    } 
                    if(cardA.prazo > this.dataAtual && cardB.prazo < this.dataAtual){
                        return 1
                    }

                    if(prioridadePeso[cardA.prioridade] > prioridadePeso[cardB.prioridade]){
                        return -1
                    }
                    if(prioridadePeso[cardA.prioridade] < prioridadePeso[cardB.prioridade]){
                        return 1
                    }

                    return cardA.titulo.localeCompare(cardB.titulo)
                })
            }
        },
        methods: {
            moverCard(card, direcao) {
                const fluxo = ['Backlog', 'Doing', 'Done']
                const indexAtual = fluxo.indexOf(card.coluna)
                const novoIndex = indexAtual + direcao

                if (novoIndex >= 0 && novoIndex < fluxo.length) {
                    card.coluna = fluxo[novoIndex]
                }
            },

            editarDadosDoCard(card){
                if(card.coluna !== 'Done') this.$emit('card-passado-para-edicao', card)
            },

            excluirCard(card) {

                const confirmar = confirm(`Deseja realmente excluir o card "${card.titulo}"?`)
                if (!confirmar){
                    return
                }

                const index = this.todosOsCards.indexOf(card)
                if (index !== -1) {
                this.todosOsCards.splice(index, 1)
                }
            }
        }
    }

</script>

<style scoped>
    .titulos, .colunas {
        display: flex;
        font-family: Arial, Helvetica, sans-serif;
        gap: 20px;
        width: 90%;
        max-width: 1400px;
        margin-left: auto;
        margin-right: auto;
    }
    .titulos {
        margin-top: 28px;
    }
    .colunas {
        margin-bottom: 28px;
        align-items: flex-start;
    }
    .MensagemDeColunaVazio{
        opacity: 0.7;
    }
    .areaNomeColunaCards {
        flex: 1;
        background: white;
        border: 2px solid rgb(194, 192, 192);
        border-radius: 10px;
        padding: 10px;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.367);
        text-align: center;
    }
    .areaNomeColunaCards h1 {
        font-size: 16pt;
        color: rgb(91, 91, 91);
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
    }
    .areaColunaCards {
        flex: 1;
        background: white;
        border: 2px solid rgb(194, 192, 192);
        border-radius: 10px;
        padding: 15px;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.367);
        height: 500px;
        box-sizing: border-box;
    }
    .card {
        margin-top: 6px;
        background: #f5f5f5;
        border-radius: 10px;
        overflow: hidden; 
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
        box-shadow: 3px 3px 10px rgba(53, 53, 53, 0.367);
    }
    .card.card-done {
        opacity: 0.6;
    }
    .card.card-done:hover {
        opacity: 1;
    }
    .cabecarioDoCard {
        display: flex;
        align-items: center;
        padding: 6px 12px;
    }
    .cabecarioDoCard button {
        background: none;       
        border: none;         
        padding: 0;    
        color: #ffffff;   
        font-size: 24px;     
        font-weight: bold;
    }
    .cabecarioDoCard button:hover {
        color: rgb(204, 204, 204);
    }
    .corpoDoCard{
        display: flex;
        flex-direction: row;
    }
    .primeiraColunaDoCard{
        width: 50%;
        text-align: start;
        padding: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .primeiraColunaDoCard, h1 {
        font-size: 14pt;
        color: #222;
    }
    .primeiraColunaDoCard p{
        font-size: 9pt;
        color: #222;
    }
    .segundaColunaDoCard{
        width: 50%;
        text-align: end;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .segundaColunaDoCard h2 {
        font-size: 10pt;
    }
    .dataCard p {
        font-size: 8pt;
        margin: 1;
    }
    .dataCard h3 {
        font-size: 11pt;
        margin-top: 0;
        padding: 2px 8px;
        color: rgb(236, 236, 236);
        background-color: rgb(85, 85, 85);
        border-radius: 8px;
    }
    .btnEditarCard, .btnExcluirCard{
        background-color: rgb(85, 85, 85);
        color: rgb(236, 236, 236);
        border-radius: 8px;
        text-decoration: none;
        border: none;
        width: 50%px;
        height: 23px;
        font-size: 10pt;
    }
    .btnEditarCard:hover, .btnExcluirCard:hover{
        background-color: rgb(151, 150, 150);
    }
</style>
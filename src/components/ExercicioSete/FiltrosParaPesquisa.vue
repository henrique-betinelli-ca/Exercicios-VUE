<template>
    <v-row class="d-flex justify-center align-center" no-gutters>
        <v-col
            class="d-flex justify-center"
        >
            <v-text-field
                v-model="filtroNome"
                label="Pesquisar"
                :error-messages="mensagemErro" 
                @input="campoDeTexto"
            >
                <template #append-inner>
                    <v-btn @click="passarFiltroNome" >
                        Buscar
                    </v-btn>
                </template>

            </v-text-field>
        
        </v-col>
        <v-col
            class="d-flex justify-center"
        >
            <v-btn-toggle
                v-model="filtroGenero"
                rounded
                group
            >
                <v-btn value="male">
                    Masculino
                </v-btn>

                <v-btn value="female">
                    Feminino
                </v-btn>
            </v-btn-toggle>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'FiltrosParaPesquisa',
    data() {
        return{
            filtroGenero: null,
            filtroNome: null,
            mensagemErro: null,
        }
    }, 
    methods: {
        passarFiltroNome(){
            if (this.filtroNome.trim() === "") {
                this.mensagemErro = "Preencha este campo primeiro!"
                return
            }

            this.mensagemErro = ""
            this.$emit('nome-para-busca', this.filtroNome)
        },
        
        campoDeTexto(){
            if (this.filtroNome.trim() != "") {
                this.mensagemErro = ""
            } else {
                this.$emit('nome-para-busca-cancelado')
            }
        }
    },
    watch: {
        filtroGenero: {
            handler(genero){
                if(genero != ""){
                    this.$emit('genero-para-busca', this.filtroGenero)
                }
            }
        }
    }
}
</script>
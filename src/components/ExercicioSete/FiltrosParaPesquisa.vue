<template>
    <v-row class="d-flex justify-center align-center" no-gutters>
        <v-col class="d-flex justify-center">
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
        <v-col class="d-flex justify-center">
            <v-btn-toggle
                v-show="!buscandoPorNome"
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
            filtroGenero: "",
            filtroNome: "",
            mensagemErro: "",
            buscandoPorNome: false,
        }
    }, 

    methods: {
        setarMensagemDeErro(valor) {
            this.mensagemErro = valor;
        },

        passarFiltroNome(){
            if (this.filtroNome.trim() === "") {
                this.setarMensagemDeErro("Preencha este campo primeiro!")
                return
            }

            this.mensagemErro = ""
            this.buscandoPorNome = true
            this.$emit('nome-para-busca-preenchido', this.filtroNome)

        },
        
        campoDeTexto(){
            if (this.filtroNome.trim() != "") {
                this.setarMensagemDeErro("")
            } else {
                this.buscandoPorNome = false
                this.$emit('nome-para-busca-cancelado')
            }
        }
    },
    watch: {
        filtroGenero: {
            handler(genero){
                if(genero != ""){
                    this.$emit('genero-para-busca-adicionado', this.filtroGenero)
                }
            }
        }
    }
}
</script>
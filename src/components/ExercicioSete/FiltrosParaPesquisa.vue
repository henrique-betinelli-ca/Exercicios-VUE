<template>
    <v-row class="d-flex justify-center align-center" no-gutters>
        <v-col class="d-flex justify-center">
            <v-text-field
                v-model="filtroNome"
                label="Pesquisar"
                :error-messages="mensagemDeRetorno" 
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
    import * as service from "../../services/ExercicioSete/Service.js"

    export default {
        name: 'FiltrosParaPesquisa',
        data() {
            return{
                filtroGenero: "",
                filtroNome: "",
                mensagemDeRetorno: "",
                buscandoPorNome: false,
            }
        }, 

        methods: {
            setarMensagemDeRetorno(valor) {
                this.mensagemDeRetorno = valor;
            },

            passarFiltroNome(){
                if (this.filtroNome.trim() === "") {
                    this.setarMensagemDeRetorno(service.pegarMensagensDeRetorno().preencherCampo)
                    return
                }

                this.setarMensagemDeRetorno(service.pegarMensagensDeRetorno().limpo)
                this.buscandoPorNome = true
                this.$emit('nome-para-busca-preenchido', this.filtroNome)

            },
            
            campoDeTexto(){
                if (this.filtroNome.trim() != "") {
                    this.setarMensagemDeRetorno(service.pegarMensagensDeRetorno().limpo)
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
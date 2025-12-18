<template>
    <v-container class="d-flex flex-column align-center">

        <p v-show="mensagemDeRetorno" >{{ mensagemDeRetorno }}</p>
        <br>
        <v-progress-circular 
            v-show="carregandoUsuarios"
            indeterminate
        ></v-progress-circular>

        <v-card 
            v-for="usuario in usuariosDaPaginaAtual"
            :key="usuario.login.uuid"
            :title="`${usuario.name.first} ${usuario.name.last}`" 
            variant="tonal"
            class="ma-4 w-75"
            rounded="lg"
            elevation="2"
        >

            <template #append>
                <v-btn
                    :icon="usuarioSelecionado === usuario ? iconeVisualizacaoUsuario.visualizando : iconeVisualizacaoUsuario.fechado"
                    variant="text"
                    class="ml-4"
                    @click="verDetalheDoUsario(usuario)"
                ></v-btn>
            </template>
                
            <v-row v-show="usuarioSelecionado == usuario">
                <v-col>
                    <DetalhesUsuarios
                        :dadosParaExibicaoDeUsuario="usuario"
                    />
                </v-col>
            </v-row>
                
        </v-card>
    </v-container>
</template>

<script>
    import DetalhesUsuarios from './DetalhesUsuarios.vue'
    import * as service from "../../services/ExercicioSete/Service.js"

    export default {
        name: 'ListaUsuarios',
        components: {
            DetalhesUsuarios
        },
        props: {
            nomeParaBusca: {
                type: String
            },
            generoParaBusca: {
                type: String
            },
            numeroDeUsuariosPorPagina: {
                type: Number
            },
            paginaAtual: {
                type: Number
            }
        },
        data() {
            return {
                usuariosDaPaginaAtual: [],
                usuarioSelecionado: null,
                mensagemDeRetorno: '',
                carregandoUsuarios: false,
                iconeVisualizacaoUsuario: service.pegarIconeVisualizacaoUsuario()
            }
        },
        mounted() {
            this.carregarUsuariosDaPagina()
        },
        computed: {
            camposParaCarregarUsuarios() {
                return [
                    this.numeroDeUsuariosPorPagina,
                    this.paginaAtual,
                    this.generoParaBusca,
                    this.nomeParaBusca,
                ]
            }
        },
        methods: {
            async carregarUsuariosDaPagina(){
                this.setarMensagemDeRetorno(service.pegarMensagensDeRetorno().carregamento)
                this.usuariosDaPaginaAtual.length = 0
                this.carregandoUsuarios = true
                try{
                    this.usuariosDaPaginaAtual = await service.manipularUsuariosDaPagina(this.nomeParaBusca, this.generoParaBusca, this.paginaAtual, this.numeroDeUsuariosPorPagina)

                    this.setarMensagemDeRetorno(service.pegarMensagensDeRetorno().limpo)
                    if(this.usuariosDaPaginaAtual.length == 0) this.setarMensagemDeRetorno(service.pegarMensagensDeRetorno().usuarioNaoEncotrado)

                } catch{
                    this.setarMensagemDeRetorno(service.pegarMensagensDeRetorno().falhaAoCarregarUsuarios)
                }
                this.carregandoUsuarios = false
            },

            verDetalheDoUsario(usuario){
                if(this.usuarioSelecionado == usuario){
                    this.usuarioSelecionado = null
                } else {
                    this.usuarioSelecionado = usuario
                }
            },

            setarMensagemDeRetorno(valor){
                this.mensagemDeRetorno = valor
            }
        },
        watch: {
            camposParaCarregarUsuarios: {
                handler() {
                    this.carregarUsuariosDaPagina()
                }
            }
        }
    }
</script>
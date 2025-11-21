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
                    :icon="usuarioSelecionado === usuario ? 'mdi-chevron-up' : 'mdi-chevron-down'"
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
            this.setarMensagemDeRetorno("Carregando...")
            this.carregandoUsuarios = true
            try{
                const data = await this.buscarUsuarios()
                this.processarUsuarios(data)
            } catch{
                this.setarMensagemDeRetorno("Ops, estamos com problema ao carregar os usuários. Tente novamente mais tarde!")
            }
            this.carregandoUsuarios = false
        },

        async buscarUsuarios(){
            this.usuariosDaPaginaAtual.length = 0
            if(this.nomeParaBusca){
                const resp = await fetch('https://randomuser.me/api/?seed=abc&page=1&results=100')
                return resp.json()
            }

            const resp = await fetch(`https://randomuser.me/api/?seed=abc&page=${this.paginaAtual}&results=${this.numeroDeUsuariosPorPagina}`)
            return resp.json()
        },

        processarUsuarios(data) {
            if(this.nomeParaBusca){
                this.setarMensagemDeRetorno("")
                this.usuariosDaPaginaAtual = data.results.filter(usuario => {
                    const nomeCompleto = `${usuario.name.first} ${usuario.name.last}`
                    return nomeCompleto.includes(this.nomeParaBusca)
                })

                if(this.usuariosDaPaginaAtual.length == 0) this.setarMensagemDeRetorno("Nenhum usuário com esse nome encontrado!")
            
            } else{
                this.setarMensagemDeRetorno("")
                if(this.generoParaBusca){
                    this.usuariosDaPaginaAtual = data.results.filter(usuario => usuario.gender == this.generoParaBusca)
                } else{
                    this.usuariosDaPaginaAtual = data.results
                }
            }
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
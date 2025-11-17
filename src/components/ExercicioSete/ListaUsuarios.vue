<template>
    <v-container class="d-flex flex-column align-center">
        <p v-if="mensagemDeRetorno">{{ mensagemDeRetorno }}</p>
        <v-card 
            v-for="usuario in usuariosDaPaginaAtual"
            :key="usuario.login.uuid"
            :title="`${usuario.name.first} ${usuario.name.last}`" 
            variant="tonal"
            class="ma-4 w-75 mx-auto"
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
                    <DetalheUsuarios
                        :dadosParaExibicaoDeUsuario="usuario"
                    />
                </v-col>
            </v-row>
                
        </v-card>
    </v-container>
</template>

<script>
import DetalheUsuarios from './DetalheUsuarios.vue'

const mensagemDeErroAoCarregarUsuarios = 'Ops, estamos com problema ao carregar os usuários. Tente novamente mais tarde!'

export default {
    name: 'ListaUsuarios',
    components: {
        DetalheUsuarios
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
        carregarUsuariosDaPagina() {
            if(this.nomeParaBusca){
                this.usuariosDaPaginaAtual.length = 0
                fetch('https://randomuser.me/api/?seed=abc&page=1&results=100')
                    .then(resp => resp.json())
                    .then(data => {
                        this.mensagemDeRetorno = ''
                        this.usuariosDaPaginaAtual = data.results.filter(usuario => {
                            const nomeCompleto = `${usuario.name.first} ${usuario.name.last}`
                            return nomeCompleto.includes(this.nomeParaBusca)
                        })
                        if(this.usuariosDaPaginaAtual.length == 0) this.mensagemDeRetorno = 'Nenhum usuário com esse nome encontrado!'
                    })
                    .catch(() => this.mensagemDeRetorno = mensagemDeErroAoCarregarUsuarios )

            } else{
                fetch(`https://randomuser.me/api/?seed=abc&page=${this.paginaAtual}&results=${this.numeroDeUsuariosPorPagina}`)
                    .then(resp => resp.json())
                    .then(data => {
                        this.mensagemDeRetorno = ''
                        if(this.generoParaBusca){
                            this.usuariosDaPaginaAtual = data.results.filter(usuario => usuario.gender == this.generoParaBusca)
                        } else{
                            this.usuariosDaPaginaAtual = data.results
                        }
                    })
                    .catch(() => this.mensagemDeRetorno = mensagemDeErroAoCarregarUsuarios )
            } 
        },
        verDetalheDoUsario(usuario){
            if(this.usuarioSelecionado == usuario){
                this.usuarioSelecionado = null
            } else {
                this.usuarioSelecionado = usuario
            }
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
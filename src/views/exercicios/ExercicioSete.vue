<template>
    <v-app justify="center">
        <v-container class="pt-8" style="max-width: 100%">
            <v-row justify="center">
                <v-col cols="12" md="10">
                    <FiltrosParaPesquisa 
                        @nome-para-busca="passarNomeParaBusca"
                        @genero-para-busca="passarGeneroParaBusca"
                        @nome-para-busca-cancelado="nomeParaBusca = null"
                    />
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="12" md="10">
                    <ListaUsuarios 
                        :nomeParaBusca="nomeParaBusca"
                        :generoParaBusca="generoParaBusca"
                        :numeroDeUsuariosPorPagina="numeroDeUsuariosPorPagina"
                        :paginaAtual="paginaAtual"
                    />
                </v-col>
            </v-row>
            <v-row row justify="center" class="mt-8">
                <v-col v-col cols="12" md="8" v-show="!nomeParaBusca">
                    <OrganizadorDePagina 
                        @resultados-por-pagina="passarNumeroDeUsuariosPorPagina"
                        @pagina="passarPaginaAtual"
                    />
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>

    import OrganizadorDePagina from '../../components/ExercicioSete/OrganizadorDePagina.vue'
    import ListaUsuarios from '../../components/ExercicioSete/ListaUsuarios.vue'
    import FiltrosParaPesquisa from '../../components/ExercicioSete/FiltrosParaPesquisa.vue'
    
    export default{
        name: 'ExercicioSete',
        components: {
            FiltrosParaPesquisa,
            ListaUsuarios,
            OrganizadorDePagina,
        },
        data() {
            return {
                nomeParaBusca: null,
                generoParaBusca: null,
                numeroDeUsuariosPorPagina: 12,
                paginaAtual: 1,
            }
        },
        methods: {
            passarNomeParaBusca(nome){
                if(nome != '') this.nomeParaBusca = nome
            },

            passarGeneroParaBusca(genero){
                this.generoParaBusca = genero
            },

            passarNumeroDeUsuariosPorPagina(numeroDeResultados){
                this.numeroDeUsuariosPorPagina = numeroDeResultados
            },

            passarPaginaAtual(pagina){
                this.paginaAtual = pagina
            }
        }
    }
</script>
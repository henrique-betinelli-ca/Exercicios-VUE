<template>
    <v-row justify="center">
        <v-col cols="12" sm="6" class="d-flex justify-center">
            <v-select
                style="max-width: 200px"
                label="Quantidade por Página"
                :items="numeroDeExebicoes"
                v-model="numeroDeExebicaoPorPagina"
            ></v-select>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex justify-center">
            <v-pagination 
                class="w-100"
                :length="3"
                v-model="paginaAtual"
            ></v-pagination>
        </v-col>
    </v-row>
</template>

<script>

export default{
    name: 'OrganizadorDePagina',
    data() {
        return {
            numeroDeExebicoes: [6, 12, 24],
            numeroDeExebicaoPorPagina: 12,
            paginaAtual: 1,
        }
    },
    watch: {
        numeroDeExebicaoPorPagina: {
            handler(numeroExebicao){
                if(numeroExebicao) this.$emit('resultados-por-pagina-escolhido', this.numeroDeExebicaoPorPagina)
            }
        },

        paginaAtual: {
            handler(paginaAtual){
                if(paginaAtual) this.$emit('pagina-escolhida', paginaAtual)
            }
        }
    }
}
</script>
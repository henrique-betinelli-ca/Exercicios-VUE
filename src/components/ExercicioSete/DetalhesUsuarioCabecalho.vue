<template>
    <v-row>
        <v-col>
            <v-img
                :width="230"
                aspect-ratio="1"
                cover
                class="rounded-circle mb-3 shadow-sm mx-auto"
                :src="dadosParaExibicaoDeUsuario.picture.large"
            />
            <h3 class="text-h6 font-weight-medium">
                {{ dadosParaExibicaoDeUsuario.name.first }} {{ dadosParaExibicaoDeUsuario.name.last }}
            </h3>
    
            <v-divider class="my-5"/>
        </v-col>
    </v-row>
    
</template>

<script>

    export default {
        name: 'DetalhesUsuariosCabecalho',
        props: {
            dadosParaExibicaoDeUsuario: {
                type: Object
            },
        },
    }
</script>
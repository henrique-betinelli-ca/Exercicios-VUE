<template>
    <v-row justify="center" class="mt-6">
        <v-col cols="12" class="text-center">
            <DetalhesUsuariosCabecalho
                :dadosParaExibicaoDeUsuario="dadosParaExibicaoDeUsuario"
            />
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-col>
            <DetalhesUsuarioCorpo
                :dadosParaExibicaoDeUsuario="dadosParaExibicaoDeUsuario"
            />
        </v-col>
    </v-row>
</template>

<script>
    import DetalhesUsuariosCabecalho from './DetalhesUsuarioCabecalho.vue'
    import DetalhesUsuarioCorpo from './DetalhesUsuarioCorpo.vue'

    export default {
        name: 'DetalhesUsuarios',
        components: {
            DetalhesUsuariosCabecalho,
            DetalhesUsuarioCorpo
        },
        props: {
            dadosParaExibicaoDeUsuario: {
                type: Object
            },
        },
    }
</script>
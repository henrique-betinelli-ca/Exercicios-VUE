<template>
    <v-row justify="center" class="mt-6">
        <v-col cols="12" class="text-center">
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
    <v-row justify="center">
        <v-col>
            <ul class="ma-10 pa-0" style="list-style: none;">
                <li><strong>Gênero:</strong> {{ formatarGenero(dadosParaExibicaoDeUsuario.gender) }}</li>
                <li><strong>Idade:</strong> {{ dadosParaExibicaoDeUsuario.dob.age }}</li>
                <li><strong>Nascimento:</strong> {{ formatarData(dadosParaExibicaoDeUsuario.dob.date) }}</li>
                <li><strong>Telefone:</strong> {{ dadosParaExibicaoDeUsuario.phone }}</li>
                <li><strong>E-mail:</strong> {{ dadosParaExibicaoDeUsuario.email }}</li>
                <li><strong>Endereço:</strong> {{ dadosParaExibicaoDeUsuario.location.street.name }} {{ dadosParaExibicaoDeUsuario.location.street.number }}, {{ dadosParaExibicaoDeUsuario.location.city }}, {{ dadosParaExibicaoDeUsuario.location.country }}</li>
            </ul>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'DetalheUsuarios',
    props: {
        dadosParaExibicaoDeUsuario: {
            type: Object
        },
    },
    methods: {
        formatarData(data) {
            return new Date(data).toLocaleDateString('pt-BR');
        },
        formatarGenero(genero){
            if(genero == 'male') return 'Masculino'
            return 'Feminino'
        }
    },
}
</script>
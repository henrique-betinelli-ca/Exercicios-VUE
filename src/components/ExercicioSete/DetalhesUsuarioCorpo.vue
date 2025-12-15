<template>
    <v-row>
        <v-col>
            <ul 
                class="ma-10 pa-0" 
                style="list-style: none;"
            >
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
    import * as service from "../../services/ExercicioSete/Service.js"

    export default {
        name: 'DetalhesUsuarioCorpo',
        props: {
            dadosParaExibicaoDeUsuario: {
                type: Object
            },
        },
        computed: {
            formatarData() {
                return (data) => {
                    return new Date(data).toLocaleDateString('pt-BR')
                }
            },

            formatarGenero() {
                return (genero) => {
                    return genero === 'male' ? service.pegarGeneros().masculino : service.pegarGeneros().feminino
                }
            }
        }
    }
</script>
import  { buscarUsuarios }  from "./Resource.js";
import { MENSAGENS_DE_RETORNO, GENEROS } from "./Constants.js";

export function pegarMensagensDeRetorno() {
    return MENSAGENS_DE_RETORNO;
}
export function pegarGeneros() {
    return GENEROS;
}

export async function manipularUsuariosDaPagina(nomeParaBusca, generoParaBusca, paginaAtual, numeroDeUsuariosPorPagina) {    
    const data = await buscarUsuarios(nomeParaBusca, paginaAtual, numeroDeUsuariosPorPagina);
    return processarUsuarios(data, nomeParaBusca, generoParaBusca);
}
function processarUsuarios(data, nomeParaBusca, generoParaBusca) {
    if (nomeParaBusca) {
        const usuariosFiltrados = data.results.filter(usuario => {
            const nomeCompleto = `${usuario.name.first} ${usuario.name.last}`;
            return nomeCompleto.includes(nomeParaBusca);
        })

        return usuariosFiltrados;
    }

    if (generoParaBusca) {
        return data.results.filter(usuario => usuario.gender === generoParaBusca);
    }

    return data.results;
}
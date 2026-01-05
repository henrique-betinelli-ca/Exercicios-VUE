export async function buscarUsuarios(nomeParaBusca, paginaAtual, numeroDeUsuariosPorPagina){
    if(nomeParaBusca){
        const resp = await fetch('https://randomuser.me/api/?seed=abc&page=1&results=100');
        return resp.json();
    }
    const resp = await fetch(`https://randomuser.me/api/?seed=abc&page=${paginaAtual}&results=${numeroDeUsuariosPorPagina}`);
    return resp.json();
}
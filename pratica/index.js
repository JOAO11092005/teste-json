async function puxarApi(){
    const link = 'https://joao11092005.github.io/teste-json/filme.json'

    const resultado = await fetch(link)

    const acesso = await resultado.json()

    console.log(acesso)
}

puxarApi()


function exibirNaPagina(){
    const titulo = document.getElementById('titulo');
    const descricao = document.getElementById('descricao');
}
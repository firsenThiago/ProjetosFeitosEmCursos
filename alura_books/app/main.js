let livros = []
const endpointDaApi = "https://guilhermeonrails.github.io/casadocodigo/livros.json"

getBuscarLivros ()

const elementoParaInserirLivros = document.getElementById("livros")

async function getBuscarLivros(){ 
    const res = await fetch(endpointDaApi)
    livros = await res.json()
    let livrosComDesconto = aplicarDesconto (livros)
    exibirOsLivrosNaTela(livrosComDesconto)
}

//FOR EACH
function exibirOsLivrosNaTela (listaDeLivros){ 
    valor_total_livros_disponiveis.innerHTML = ""
    listaDeLivros.forEach(livro => {
        let disponibilidade = livro.quantidade > 0 ? "livro_imagens" : "livro_imagens indisponivel"
        elementoParaInserirLivros.innerHTML += `<div class="livro">
        <img class="${disponibilidade}" src="${livro.imagem}" alt="${livro.alt}" />
        <h2 class="livro__titulo">
          ${livro.titulo}
        </h2>
        <p class="livro__descricao">${livro.autor}</p>
        <p class="livro__preco" id="preco">R$ ${livro.preco.toFixed(2)}</p>
        <div class="tags">
          <span class="tag">${livro.categoria}</span>
        </div>
      </div>`
    });
}


//MAP
function aplicarDesconto (livros){ 
    const desconto = 0.3
    livrosComDesconto = livros.map(livro => { 
        return {...livro, preco: livro.preco - (livro.preco * desconto)}

    })
    return livrosComDesconto
}

//FILTER

const botoes = document.querySelectorAll(".btn")

botoes.forEach(botao=> botao.addEventListener("click",filtrarlivros))


function filtrarlivros() { 
    elementoParaInserirLivros.innerHTML = ""
    const elementoBtn = document.getElementById(this.id)
    const categoria = elementoBtn.value 
    let livrosFiltrados = categoria == "disponivel" ? filtrarPorDisponibilidade() : filtrarPorCategoria(categoria)
    exibirOsLivrosNaTela(livrosFiltrados)
    if (categoria == "disponivel"){ 
        const valorTotal = calcularValorTotalDeLivrosDisponiveis(livrosFiltrados)
        exibirValorTotalDosLivrosDisponiveis(valorTotal)
    }

}

//SORT

let btnOrdenarPorPreco = document.getElementById("btnOrdenarPorPreco")

btnOrdenarPorPreco.addEventListener("click",ordenarLivrosPorPrecos)


function filtrarPorCategoria(categoria) {
    return livros.filter(livro => livro.categoria == categoria)
}

function filtrarPorDisponibilidade() {
    return livros.filter(livro => livro.quantidade > 0)
}

function ordenarLivrosPorPrecos () { 
    let livrosOrdenados = livros.sort((a,b) => a.preco - b.preco)
    exibirOsLivrosNaTela(livrosOrdenados)
}

//REDUCE 

const valor_total_livros_disponiveis = document.getElementById("valor_total_livros_disponiveis")

function exibirValorTotalDosLivrosDisponiveis (valorTotal) { 
    valor_total_livros_disponiveis.innerHTML = `<div class="livros__disponiveis">
    <p>Todos os livros disponíveis por R$ <span id="valor">R$ ${valorTotal}</span></p>
  </div>`
}

function calcularValorTotalDeLivrosDisponiveis(livros) {
    return livros.reduce((acc,livro) => acc + livro.preco, 0).toFixed(2)

}
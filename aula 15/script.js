// Função para abrir o formulário 
function abrirFormulario() { 
 document.querySelector("#modalCadastroProduto").style.display = "block" 
} 

// Função para fechar o formulário 
function fecharFormulario() { 
 document.querySelector("#modalCadastroProduto").style.display = "none" 
} 

window.onclick = function (evento) { 
 if (evento.target == document.querySelector("#modalCadastroProduto")) 
    fecharFormulario();
}

// Função para consumir os dados
async function carregarProdutos (){
    const gradeItens = document.querySelector('.grade-itens')
    const url = "https://68670986e3fefb261edd90fc.mockapi.io/api/produtos"
    const resposta = await fetch(url)
    const dados = await resposta.json()
    console.log(dados)

    dados.forEach(produto => {
        let numero = Number(produto.preco)
        numero = numero.toFixed(2)
        numero = String(numero).replace('.', ',')
        gradeItens.innerHTML += 
        `<section class="cartao-item"> 
            <img src="${produto.Imagem}" alt="Item 1" /> 
            <h3>"${produto.nome}"</h3> 
            <p class="preco-item">R$${numero}</p> 
            <button class="botao-comprar">Comprar</button> 
        </section>`
    })
}

carregarProdutos()
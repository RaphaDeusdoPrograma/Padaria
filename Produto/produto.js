// Dados dos produtos
const produtos = [
{
    titulo: "Bolo de Chocolate",
    descricao: "Bolo fofinho com cobertura de chocolate.",
    preco: 20.00,
    imagem: "Imagens/bolo-chocolate.jpg"
},
{
    titulo: "Sonho",
    descricao: "Massa macia e recheio cremoso, o doce perfeito para o seu café.",
    preco: 4.50,
    imagem: "Imagens/sonho.jpg"
},
{
    titulo: "Torta de Morango",
    descricao: "Torta com morangos frescos e creme de baunilha.",
    preco: 25.00,
    imagem: "Imagens/torta-morango.jpg"
},
{
    titulo: "Pastel de Nata",
    descricao: "Tradicional doce português com creme de nata.",
    preco: 5.00,
    imagem: "Imagens/pastel-nata.jpg"
},
    {
        titulo: "Pão Fresco",
        descricao: "Um pão macio e fresquinho, feito todas as manhãs.",
        preco: 3.00,
        imagem: "Imagens/pao-fresco.jpeg"
     },
     {
        titulo: "Croissant",
        descricao: "Feito com manteiga de qualidade, com massa folhada leve e crocante.",
        preco: 6.00,
        imagem: "Imagens/croissant.jpeg"
    },
    {
    titulo: "Sanduíche",
        descricao: "Melhor sanduíche natural da região.",
        preco: 6.00,
        imagem: "Imagens/sanduiche.jpg"
     },
     {
        titulo: "Pão de Queijo",
            descricao: "Tradicional pão de queijo, quentinho e saboroso.",
            preco: 6.00,
            imagem: "Imagens/pao-queijo.jpg"
         }     
];

// Seleciona os elementos do modal
const modal = document.getElementById('product-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const closeButton = document.querySelector('.close-button');
const carrinho = [];

// Função para abrir o modal com as informações do produto
function openModal(produto) {
    modalImage.src = produto.imagem;
    modalTitle.textContent = produto.titulo;
    modalDescription.textContent = produto.descricao;
    modalPrice.textContent = `Preço: R$ ${produto.preco.toFixed(2)}`;
    modal.style.display = 'block';

    // Define a função do botão de adicionar ao carrinho no modal
    document.getElementById('adicionar-carrinho').onclick = function () {
        adicionarAoCarrinho(produto);
        closeModal(); // Fecha o modal após adicionar ao carrinho
    };
}

// Função para fechar o modal
function closeModal() {
    modal.style.display = 'none';
}

// Adiciona um evento de clique para cada item de produto
document.querySelectorAll('.product-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        openModal(produtos[index]);
    });
});

// Fecha o modal ao clicar no botão de fechar
closeButton.addEventListener('click', closeModal);

// Fecha o modal ao clicar fora do conteúdo do modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Função para alterar a quantidade do produto
function alterarQuantidade(id, delta) {
    const input = document.getElementById(id);
    const valorAtual = parseInt(input.value);
    const novoValor = valorAtual + delta;

    // Limita a quantidade entre 1 e 50
    if (novoValor >= 1 && novoValor <= 50) {
        input.value = novoValor;
    }
}

// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(produto) {
    const itemCarrinho = carrinho.find(item => item.titulo === produto.titulo);

    if (itemCarrinho) {
        itemCarrinho.quantidade += 1;
    } else {
        carrinho.push({
            titulo: produto.titulo,
            preco: produto.preco,
            quantidade: 1
        });
    }
    atualizarCarrinho();
}

// Função para atualizar o carrinho de compras
function atualizarCarrinho() {
    const carrinhoElement = document.getElementById('carrinho-itens');
    carrinhoElement.innerHTML = '';

    let total = 0;

    carrinho.forEach(item => {
        const itemTotal = item.preco * item.quantidade;
        total += itemTotal;
        carrinhoElement.innerHTML += `
            <li>${item.titulo} x${item.quantidade} - R$ ${itemTotal.toFixed(2)}</li>
        `;
    });

    document.getElementById('total-carrinho').textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Função para finalizar a compra
function finalizarCompra() {
    if (carrinho.length > 0) {
        alert('Compra finalizada com sucesso!');
        carrinho.length = 0;
        atualizarCarrinho();
        // Redireciona para a página de confirmação de compra
        window.location.href = "/CompraFinalizada/compra.html";
    } else {
        alert('Seu carrinho está vazio!');
    }
}

// Adiciona os eventos de clique para os botões de quantidade
document.querySelectorAll('.quantidade-btn').forEach(button => {
    button.addEventListener('click', function () {
        const idProduto = button.previousElementSibling.id;
        const delta = button.textContent === '+' ? 1 : -1;
        alterarQuantidade(idProduto, delta);
    });
});




    
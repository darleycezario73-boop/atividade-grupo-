let total = 0;

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function atualizar(){

  const lista = document.getElementById("lista-carrinho");

  lista.innerHTML = "";

  total = 0;

  carrinho.forEach((item,index)=>{

    total += item.preco;

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="item-carrinho">
        <span>${item.nome} - R$ ${item.preco}</span>

        <button class="remover-btn" onclick="remover(${index})">
          🗑️
        </button>
      </div>
    `;

    lista.appendChild(li);

  });

  document.getElementById("total").innerText = total;

  document.getElementById("contador").innerText = carrinho.length;

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

}

function adicionar(nome, preco){

  carrinho.push({
    nome,
    preco
  });

  atualizar();

  mostrarMensagem(nome + " adicionado ao carrinho!");

}

function remover(index){

  carrinho.splice(index,1);

  atualizar();

}

function abrirCarrinho(){

  document.getElementById("carrinho").classList.add("ativo");

}

function fecharCarrinho(){

  document.getElementById("carrinho").classList.remove("ativo");

}

function finalizar(){

  if(carrinho.length === 0){

    alert("Seu carrinho está vazio!");

    return;

  }

  alert("Compra finalizada com sucesso!");

  carrinho = [];

  atualizar();

  fecharCarrinho();

}

const pesquisa = document.querySelector(".search");

pesquisa.addEventListener("keyup", ()=>{

  let valor = pesquisa.value.toLowerCase();

  let cards = document.querySelectorAll(".card");

  cards.forEach((card)=>{

    let nome = card.querySelector("h3").innerText.toLowerCase();

    if(nome.includes(valor)){

      card.style.display = "block";

    }else{

      card.style.display = "none";

    }

  });

});

const links = document.querySelectorAll(".menu a");

links[0].addEventListener("click",(e)=>{
  e.preventDefault();

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

});

links[1].addEventListener("click",(e)=>{
  e.preventDefault();

  let nome = prompt("Digite seu nome:");

  if(nome){

    alert("Bem-vindo " + nome);

  }

});

links[2].addEventListener("click",(e)=>{
  e.preventDefault();

  abrirCarrinho();

});

links[3].addEventListener("click",(e)=>{
  e.preventDefault();

  alert("Contato: suporte@shopapp.com");

});

function mostrarMensagem(texto){

  const msg = document.createElement("div");

  msg.innerText = texto;

  msg.style.position = "fixed";
  msg.style.bottom = "100px";
  msg.style.right = "20px";
  msg.style.background = "#2d63e2";
  msg.style.color = "white";
  msg.style.padding = "12px 20px";
  msg.style.borderRadius = "10px";
  msg.style.zIndex = "9999";
  msg.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";

  document.body.appendChild(msg);

  setTimeout(()=>{

    msg.remove();

  },2000);

}

atualizar();

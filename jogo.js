import { criaTerreno } from "./terreno.js";
import { criarJogador } from "./jogador.js";
import { clicaSlot } from "./clicaSlot.js";
import { criarLoja } from "./loja.js";
import { avancaTempoSlot } from "./avancatempo.js";
//...........................................................................................
//Pablo Rachid de Bem --- 202365126AC
//o que falta:
//1. imagens
//2. colocar preços nas sementes
//3. colocar opcao de venda das plantas (crescidas), com botao de venda, contador e preço
const jogo = document.querySelector("#jogo");
const terreno = criaTerreno();
const jogador = criarJogador();
const loja = criarLoja();

iniciaJogo(jogo, terreno, jogador, loja);

function iniciaJogo(jogo, terreno, jogador, loja) {
  base(jogo);
  desenhaTerreno(terreno, jogo);
  desenhaBarraFerramentas(jogo);
  desenhaSilo(jogador, loja, jogo);
  desenhaSiloEstoque(jogador, loja, jogo);
  desenhaBarraStatus(jogo, jogador, terreno);
}

function base(jogo) {
  const fundoTerreno = document.createElement("div");
  //classlist espera uma string
  fundoTerreno.classList.add("terreno");

  const fundoBarraAtividades = document.createElement("div");
  fundoBarraAtividades.classList.add("barraAtividades");

  const barraFerramentas = document.createElement("div");
  barraFerramentas.classList.add("barraFerramentas");

  const barraStatus = document.createElement("div");
  barraStatus.classList.add("barraStatus");

  const silo = document.createElement("div");
  silo.classList.add("silo");

  const siloEstoque = document.createElement("div");
  siloEstoque.classList.add("siloEstoque");

  //adiciona os compoentes da barra de atividades
  fundoBarraAtividades.append(barraStatus);
  fundoBarraAtividades.append(barraFerramentas);
  fundoBarraAtividades.append(silo);
  fundoBarraAtividades.append(siloEstoque);
  //adiciona os fundos ao jogo
  jogo.append(fundoTerreno);
  jogo.append(fundoBarraAtividades);
}

function desenhaTerreno(terreno, jogo) {
  const fundoTerreno = jogo.querySelector(".terreno");
  terreno.forEach((slot) => desenhaSlot(fundoTerreno, slot));
}

function desenhaSlot(fundoTerreno, slot) {
  const divSlot = document.createElement("div");
  //classe slot
  divSlot.classList.add("slot");
  // seta id, estddo e planta comoa atributos do slot
  divSlot.setAttribute("id", slot.id);
  divSlot.setAttribute("estado", slot.estado);
  if (slot.planta.plantado) {
    divSlot.setAttribute("planta", slot.planta.plantado);
  }
  if (slot.controleTempo) divSlot.setAttribute("controleTempo", "true");
  //adiciona o slot ao terreno
  fundoTerreno.append(divSlot);
  divSlot.addEventListener("click", cliqueTerreno);
}

function cliqueTerreno(evento) {
  //pega o slot html
  const slotClicado = evento.target;
  // pega o id para identificar o slot no array terreno
  const id = slotClicado.getAttribute("id");
  //altera o array terreno
  const slot = terreno[id];
  const plantaNome = slot.planta.plantado;
  clicaSlot(slot, jogador);
  //atualiza a parte visual 
  const idPlantas = {
    cenoura: 500,
    batata: 1000,
    tomate: 1500,
  };
  atualizaSlot(slotClicado, slot);
  if (jogador.controle.acao === "plantar") {
    const sementeNome = jogador.controle.semente;
    atualizaSemente(sementeNome, jogador);
  }
  if (jogador.controle.acao === "colher") {
    const ide = idPlantas[plantaNome];
    atualizaPlanta(plantaNome, jogador, ide);
  }
  //atualizaBarraAtividades(jogador);
}

function desenhaBarraStatus(jogo, jogador, terreno) {
  //tempo (botao pra avancar o tempo) e dinheiro
  //dinheiro + tempo(exibidor + botao)
  const barraStatus = jogo.querySelector(".barraStatus");
  const dinheiroHtml = document.createElement("div");
  dinheiroHtml.classList.add("dinheiro");
  //https://developer.mozilla.org/pt-BR/docs/Web/HTML/Reference/Elements/img
  const dinheiroIcone = document.createElement("img");
  dinheiroIcone.src = '../imagens/moeda2.png';
  dinheiroIcone.setAttribute("tipo", "dinheiroIcone");
  const dinheiroTexto = document.createElement( "div");
  dinheiroTexto.textContent=`${jogador.dinheiro}`;
  dinheiroTexto.setAttribute("tipo", "dinheiroTexto");
  dinheiroHtml.append(dinheiroIcone);
  dinheiroHtml.append(dinheiroTexto);

  

  //${variavel} dentro de '' faz aparecer o valor da variável no texto
 // dinheiroHtml.textContent = `Dinheiro: $${jogador.dinheiro}`;

  const tempoHtml = document.createElement("div");
  tempoHtml.classList.add("tempo");
  const tempoExibidor = document.createElement("div");
  tempoExibidor.setAttribute("id", "tempoExibidor");
  tempoExibidor.textContent = `Semana: ${jogador.semana}`;

  const tempoBotao = document.createElement("button");
  tempoBotao.setAttribute("id", "tempoBotao");
  tempoBotao.textContent = "Avançar";
  // função sem parametros definida aqui mesmo para usar jogador e terreno
  tempoBotao.addEventListener("click", () => {
    // passar tempo
    passaTempo(jogador, terreno);

    //atualiza a parte visual do contador de tempo
    document.querySelector(
      "#tempoExibidor"
    ).textContent = `Semana: ${jogador.semana}`;
  });

  tempoHtml.append(tempoExibidor);
  tempoHtml.append(tempoBotao);

  barraStatus.append(dinheiroHtml);
  barraStatus.append(tempoHtml);
}

function desenhaBarraFerramentas(jogo) {
  const ferramentas = ["ancinho", "regador", "mao", "lixo", "pá"];
  const acoes = ["arar", "regar", "colher", "arrancar", "limpar"];
  const barraFerramentas = jogo.querySelector(".barraFerramentas");
  for (let i = 0; i < ferramentas.length; i++) {
    //para cada ferramenta, cria um botao, adiiona texto e um evento ao clicar
    //cria os botões das ferramentas
    const ferramenta = document.createElement("button");
    ferramenta.classList.add("ferramenta");
    ferramenta.textContent = ferramentas[i];
    ferramenta.setAttribute("acao", acoes[i]);
    //adiciona o botão na barra de ferramentas
    barraFerramentas.append(ferramenta);
    ferramenta.addEventListener("click", cliqueFerramenta);
  }
}

function desenhaSilo(jogador, loja, jogo) {
  const silo = jogo.querySelector(".silo");
  const sementes = ["cenoura", "batata", "tomate"];
  //para cada semente, cria um botão, adiciona texto e um evento ao clicar
  for (let i = 0; i < sementes.length; i++) {
    const sementeNome = sementes[i];

    const semente = document.createElement("div");
    //const exibidorSemente = document.createElement("div");
    const botaoSemente = document.createElement("button");
    const botaoSementeComprar = document.createElement("button");

    semente.classList.add("semente");
    botaoSemente.classList.add("botaoSemente");
    botaoSemente.setAttribute("id", sementeNome);
    //exibidorSemente.classList.add("exibidorSemente");
    //exibidorSemente.setAttribute("id", sementeNome);
    botaoSementeComprar.classList.add("botaoSementeComprar");

    const auxQuantidade = jogador.siloSementes[sementeNome];

    //exibidorSemente.textContent = `quant. ${auxQuantidade}`;
    botaoSemente.textContent = `${sementes[i]} (${auxQuantidade})`;
    const auxPreco = loja.valorSementes[sementeNome];
    botaoSementeComprar.textContent = `Comprar ($${auxPreco})`;

    botaoSemente.setAttribute("acao", "plantar");
    botaoSemente.setAttribute("tipoSemente", sementes[i]);

    //adiciona o botão no silo / barra de atividades
    semente.append(botaoSemente);
    //semente.append(exibidorSemente);
    semente.append(botaoSementeComprar);
    silo.append(semente);

    botaoSemente.addEventListener("click", (evento) => {
      //pega o botao
      const botao = evento.target;
      //pega a semente
      const tipoSemente = botao.getAttribute("tipoSemente");
      cliqueSemente(tipoSemente, jogador, botao);
    });
    botaoSementeComprar.addEventListener("click", () => {
      sementeComprar(jogo, jogador, loja, sementeNome);
    });
  }
}

function sementeComprar(jogo, jogador, loja, semente) {
  if (loja.valorSementes[semente] <= jogador.dinheiro) {
    jogador.siloSementes[semente]++;
    jogador.dinheiro = jogador.dinheiro - loja.valorSementes[semente];
  }

  atualizaSemente(semente, jogador);
  atualizaDinheiro(jogo, jogador);
}

function atualizaSemente(semente, jogador) {
  const botao = document.getElementById(semente);
  const auxQuantidade = jogador.siloSementes[semente];
  botao.textContent = `${semente}(${auxQuantidade})`;
}

function atualizaDinheiro(jogo, jogador) {
  const dinheiroExibidor = jogo.querySelector(".dinheiro div");
  dinheiroExibidor.textContent = `${jogador.dinheiro}`;
}

function cliqueSemente(tipoSemente, jogador, botao) {
  //atualiza o controle
  if (jogador.siloSementes[tipoSemente] === 0) {
    alert("Você não tem sementes suficientes!");
    return;
  }

  /* jogador.siloSementes[tipoSemente]--; */
  /*console.log(jogador.siloSementes[tipoSemente]); */

  jogador.controle.acao = "plantar";
  jogador.controle.semente = tipoSemente;
  //efeito visual do clique (atualiza a classe do botão)
  // .barraAtividades button seleciona todos os botões dentro da barra de atividades
  const botoes = document.querySelectorAll(".barraAtividades button");
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].classList.remove("selecionado");
  }
  botao.classList.add("selecionado");
}

// plano inicial era fazer uma aba com o estoque, mas reli as instruçõs do trabalho e não vai ter essa aba;
// no lugar vamos fazer a operação de venda junto com a de colher (ele colhe e automaticamente vende e cai o dinheiro)
function desenhaSiloEstoque(jogador, loja, jogo) {
  const siloEstoque = jogo.querySelector(".siloEstoque");
  const plantas = ["cenoura", "batata", "tomate"];
  //para cada planta, cria um div(identificar com o nome da planta), adiciona contador, e um botao de venda
  // cria id para as plantas
  const idPlantas = {
    cenoura: 500,
    batata: 1000,
    tomate: 1500,
  };
  for (let i = 0; i < plantas.length; i++) {
    const plantaNome = plantas[i];

    const planta = document.createElement("div");
    const exibidorPlanta = document.createElement("div");
    //const identificadorPlanta = document.createElement("div");
    const botaoPlantaVender = document.createElement("button");

    planta.classList.add("planta");
    botaoPlantaVender.classList.add("botaoPlantaVender");
    const id = idPlantas[plantaNome];
    exibidorPlanta.classList.add("exibidorPlanta");
    exibidorPlanta.setAttribute("id", id);
    // exibidorPlanta.setAttribute("id", plantaNome); daria id repetido com as sementes
    botaoPlantaVender.classList.add("botaoPlantaVender");

    const auxQuantidade = jogador.siloEstoque[plantaNome];

    exibidorPlanta.textContent = ` ${plantaNome}s: ${auxQuantidade}`;
    //identificadorPlanta.textContent = plantas[i];

    const auxPreco = loja.valorPlantas[plantaNome];
    botaoPlantaVender.textContent = `Vender ($${auxPreco})`;
    botaoPlantaVender.setAttribute("tipoPlanta", plantaNome);

    //adiciona o botão no silo / barra de atividades
    // planta.append(identificadorPlanta);
    planta.append(exibidorPlanta);
    planta.append(botaoPlantaVender);
    siloEstoque.append(planta);

    botaoPlantaVender.addEventListener("click", () => {
      plantaVender(jogo, jogador, loja, plantaNome, id);
    });
  }
}

function plantaVender(jogo, jogador, loja, planta, id) {
  if (jogador.siloEstoque[planta] > 0) {
    jogador.siloEstoque[planta]--;
    jogador.dinheiro = jogador.dinheiro + loja.valorPlantas[planta];
  }

  atualizaPlanta(planta, jogador, id);
  atualizaDinheiro(jogo, jogador);
}

function atualizaPlanta(planta, jogador, id) {
  const exibidor = document.getElementById(id);
  const auxQuantidade = jogador.siloEstoque[planta];
  exibidor.textContent = `${planta}s: ${auxQuantidade}`;
}

function cliqueFerramenta(evento) {
  const botao = evento.target;
  //pega a acao
  const acao = botao.getAttribute("acao");
  // efeito do clique (atualiza o controle)
  jogador.controle.acao = acao;

  //efeito visual do clique
  const botoes = document.querySelectorAll(".barraAtividades button");
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].classList.remove("selecionado");
  }
  botao.classList.add("selecionado");
}

function atualizaSlot(slotHtml, slot) {
  //atualiza o estado do slot
  slotHtml.setAttribute("estado", slot.estado);
  //se tem planta, pode ser removido; se não tem, pode ser colocado
  // de todo modo, plantado é atualizada (mesmo que seja null)
  slotHtml.setAttribute("planta", slot.planta.plantado);
  if (slot.controleTempo) slotHtml.setAttribute("controleTempo", "true");
  else slotHtml.setAttribute("controleTempo", "false");
}

//avança uma semana, unidade de tempo do jogo
function passaTempo(jogador, terreno) {
  //incrementa a semana
  jogador.semana++;
  //reseta o controle
  //atualiza cada slot
  for (let i = 0; i < terreno.length; i++) {
    avancaTempoSlot(terreno[i]);
  }
  //atualiza a parte visual do terreno
  atualizaTerreno();
}

// para cada slot do vetor terreno, ele pega o slot HTML correspondente e atualiza por meio da função atualizaSlot
function atualizaTerreno() {
  for (let i = 0; i < terreno.length; i++) {
    //https://developer.mozilla.org/en-US/docs/Web/API/Document
    // getElementyById The getElementById() method of the Document
    // interface returns an Element object representing the element
    // whose id property matches the specified string.
    const slotHtml = document.getElementById(terreno[i].id);
    atualizaSlot(slotHtml, terreno[i]);
  }
}

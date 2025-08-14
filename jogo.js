import { criaTerreno } from "./terreno.js";
import { criarJogador } from "./jogador.js";
import { clicaSlot } from "./clicaSlot.js";
//...........................................................................................

const jogo = document.querySelector("#jogo");
const terreno = criaTerreno();
const jogador = criarJogador();

iniciaJogo(jogo);

function iniciaJogo(jogo) {
  base(jogo);
  desenhaTerreno(terreno, jogo);
  desenhaBarraFerramentas(jogo);
  desenhaSilo(jogo);
}

function base(jogo) {
  const fundoTerreno = document.createElement("div");
  fundoTerreno.classList.add("terreno");

  const fundoBarraAtividades = document.createElement("div");
  fundoBarraAtividades.classList.add("barraAtividades");

  const barraFerramentas = document.createElement("div");
  barraFerramentas.classList.add("barraFerramentas");

  const silo = document.createElement("div");
  silo.classList.add("silo");

  //  const statusFazenda = document.createElement("div");

  //adiciona os compoentes da barra de atividades
  fundoBarraAtividades.append(barraFerramentas);
  fundoBarraAtividades.append(silo);
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
  clicaSlot(terreno[id], jogador.controle);
  //atualiza a parte visual
  atualizaSlot(slotClicado, terreno[id]);
  //atualizaBarraAtividades(jogador);
}

function desenhaBarraFerramentas(jogo) {
  const ferramentas = ["ancinho", "regador", "mao", "lixo", "pá"];
  const acoes = ["arar", "regar", "colher", "arrancar", "limpar"];
  for (let i = 0; i < ferramentas.length; i++) {
    //para cada ferramenta, cria um botao, adiiona texto e um evento ao clicar
    const barraFerramentas = jogo.querySelector(".barraFerramentas");
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

function desenhaSilo(jogo) {
  const silo = jogo.querySelector(".silo");
  const sementes = ["cenoura", "batata", "tomate"];
  //para cada semente, cria um botão, adiciona texto e um evento ao clicar
  for (let i = 0; i < sementes.length; i++) {
    const botaoSemente = document.createElement("button");
    botaoSemente.classList.add("semente");
    botaoSemente.textContent = sementes[i];
    botaoSemente.setAttribute("acao", "plantar");
    botaoSemente.setAttribute("tipoSemente", sementes[i]);
    //adiciona o botão no silo / barra de atividades
    silo.append(botaoSemente);
    botaoSemente.addEventListener("click", cliqueSemente);
  }
}

function cliqueSemente(evento) {
  //pega o botao
  const botao = evento.target;
  //pega a semente
  const tipoSemente = botao.getAttribute("tipoSemente");

  //atualiza o controle
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

function atualizaSlot(slotClicado, slot) {
  //atualiza o estado do slot
  slotClicado.setAttribute("estado", slot.estado);
  //se tem planta, pode ser removido; se não tem, pode ser colocado
  // de todo modo, plantado é atualizada (mesmo que seja null)
  slotClicado.setAttribute("planta", slot.planta.plantado);
}

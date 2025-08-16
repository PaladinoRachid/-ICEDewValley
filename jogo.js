import { criaTerreno } from "./terreno.js";
import { criarJogador } from "./jogador.js";
import { clicaSlot, arrancar } from "./clicaSlot.js";
//...........................................................................................
//Pablo Rachid de Bem --- 202365126AC
const jogo = document.querySelector("#jogo");
const terreno = criaTerreno();
const jogador = criarJogador();

iniciaJogo(jogo, terreno, jogador);

function iniciaJogo(jogo, terreno, jogador) {
  base(jogo);
  desenhaTerreno(terreno, jogo);

  desenhaBarraFerramentas(jogo);
  desenhaSilo(jogo);
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


  //  const statusFazenda = document.createElement("div");

  //adiciona os compoentes da barra de atividades
  fundoBarraAtividades.append(barraStatus);
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
  if(slot.controleTempo)
    divSlot.setAttribute("controleTempo", "true")
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
  clicaSlot(terreno[id], jogador);
  //atualiza a parte visual
  atualizaSlot(slotClicado, terreno[id]);
  //atualizaBarraAtividades(jogador);
}

function desenhaBarraStatus(jogo, jogador, terreno) {
  //tempo (botao pra avancar o tempo) e dinheiro
  //dinheiro + tempo(exibidor + botao)
  const barraStatus = jogo.querySelector(".barraStatus");
  const dinheiroHtml = document.createElement("div");
  dinheiroHtml.classList.add("dinheiro");
  //${variavel} dentro de '' faz aparecer o valor da variável no texto
  dinheiroHtml.textContent = `Dinheiro: $${jogador.dinheiro}`;

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

function desenhaSilo(jogo) {
  const silo = jogo.querySelector(".silo");
  const sementes = ["cenoura", "batata", "tomate"];
  //para cada semente, cria um botão, adiciona texto e um evento ao clicar
  for (let i = 0; i < sementes.length; i++) {
    const semente = document.createElement("div");
    const exibidorSemente = document.createElement("div");
    const botaoSemente = document.createElement("button");
    const botaoSementeComprar = document.createElement("button");

    semente.classList.add("semente");
    botaoSemente.classList.add("botaoSemente");
    exibidorSemente.classList.add("exibidorSemente");
    botaoSementeComprar.classList.add("botaoSementeComprar");

    const sementeNome = sementes[i];
    const auxQuantidade = jogador.siloSementes[sementeNome];

    exibidorSemente.textContent = `${auxQuantidade}`;
    botaoSemente.textContent = sementes[i];
    botaoSementeComprar.textContent = "Comprar";

    botaoSemente.setAttribute("acao", "plantar");
    botaoSemente.setAttribute("tipoSemente", sementes[i]);
    //adiciona o botão no silo / barra de atividades
    semente.append(botaoSemente);
    semente.append(exibidorSemente);
    semente.append(botaoSementeComprar);
    silo.append(semente);
    botaoSemente.addEventListener("click", cliqueSemente);
  }
}

function cliqueSemente(evento) {
  //pega o botao
  const botao = evento.target;
  //pega a semente
  const tipoSemente = botao.getAttribute("tipoSemente");

  //atualiza o controle
  if (jogador.siloSementes[tipoSemente] <= 0) {
    alert("Você não tem sementes suficientes!");
    return;
  }

  jogador.siloSementes[tipoSemente]--;
  console.log(jogador.siloSementes[tipoSemente]);

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

function atualizaSlot(slotHtml, slot) {
  //atualiza o estado do slot
  slotHtml.setAttribute("estado", slot.estado);
  //se tem planta, pode ser removido; se não tem, pode ser colocado
  // de todo modo, plantado é atualizada (mesmo que seja null)
  slotHtml.setAttribute("planta", slot.planta.plantado);
  if(slot.controleTempo)
    slotHtml.setAttribute("controleTempo","true");
  else
    slotHtml.setAttribute("controleTempo", "false");
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

// atualiza os dados em função do avanço de tempo
function avancaTempoSlot(slot) {
  slot.controleTempo = true;
  if (slot.estado === "plantado") {
    //se a planta está há 5 semanas sem água, isto é, está para completar 6 semanas, ela morre e o terreno é limpo
    if (slot.planta.tempoSede === 5) {
      arrancar(slot);
      return;
    }
    //se tempoSede > 0, aumenta o tempo de sede e não cresce
    if (slot.planta.sede) {
      //incrementa o tempo de sede
      slot.planta.tempoSede++;
    } else {
      //se a planta não está com sede, ela cresce desde que já não esteja no crescimento maaximo, e volta a ficar com sede
      if (slot.planta.ciclosCrescimento < slot.planta.crescimentoMaximo)
      {
        slot.planta.ciclosCrescimento++;
        slot.planta.sede = true;
        slot.planta.tempoSede = 1;
      }  
    }
  }
}

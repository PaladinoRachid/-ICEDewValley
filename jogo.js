import { criaTerreno } from './terreno.js';
import { criarJogador } from './jogador.js';    
//import { clicaSlot } from './clicaSlot.js';
//...........................................................................................

const jogo = document.querySelector('#jogo');

iniciaJogo(jogo);

function iniciaJogo(jogo)
{
    base(jogo);
    const terreno = criaTerreno();
    const jogador = criarJogador();
    desenhaTerreno(terreno, jogo);
   // desenhaBarraAtividades(jogador, jogo);

}

function base(jogo)
{
    const fundoTerreno = document.createElement('div');
    fundoTerreno.classList.add('terreno');
    const fundoBarraAtividades = document.createElement('div');
    fundoBarraAtividades.classList.add('barraAtividades');
    jogo.append(fundoTerreno);
    jogo.append(fundoBarraAtividades); 
}

function desenhaTerreno(terreno, jogo)
{
    const fundoTerreno = jogo.querySelector('.terreno');
    terreno.forEach(slot => desenhaSlot(fundoTerreno, slot));
}

function desenhaSlot (fundoTerreno,slot) 
{
    const divSlot = document.createElement('div');
    //classe slot
    divSlot.classList.add('slot');
    // seta id, estddo e planta comoa atributos do slot
    divSlot.setAttribute('id', slot.id);
    divSlot.setAttribute('estado', slot.estado);
    if(slot.planta.plantado) 
    {
        divSlot.setAttribute('planta', slot.planta.plantado);
    }
    //adiciona o slot ao terreno
    fundoTerreno.append(divSlot);
} 
import { criaTerreno } from './terreno.js';
import { criarJogador } from './jogador.js';    
//import { clicaSlot } from './clicaSlot.js';
//...........................................................................................

const jogo = document.querySelector('#jogo');

base(jogo);
//iniciaJogo();

/*
function iniciaJogo()
{
    const terreno1 = criaTerreno();
    const jogador2 = criarJogador();

}
*/
function base(jogo)
{
    const fundoTerreno = document.createElement('div');
    fundoTerreno.classList.add('terreno');
    const fundoBarraAtividades = document.createElement('div');
    fundoBarraAtividades.classList.add('barraAtividades');
    jogo.append(fundoTerreno);
    jogo.append(fundoBarraAtividades); 
}

//function desenhaTerreno()

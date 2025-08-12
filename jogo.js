import { criaTerreno } from './terreno.js';
import { criarJogador } from './jogador.js';    
//import { clicaSlot } from './clicaSlot.js';
//...........................................................................................

iniciaJogo();

function iniciaJogo() {
    const terreno = criaTerreno();
    const jogador = criarJogador();
}
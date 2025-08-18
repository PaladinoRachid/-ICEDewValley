# -ICEDewValley

## Contexto

* **Disciplina:** Desenvolvimento Web (DCC202)
* **Professor:** Igor Knop
* **Instituição:** Departamento de Ciência da Computação - UFJF

## Integrantes do Grupo

* Pablo Rachid de Bem – Matrícula: 202365126AC

## Descrição

Este projeto tem como objetivo implementar **ICEDew Valley**, utilizando **HTML, CSS e JavaScript.**.

A ideia é implementar um jogo que permita: 

* Um canteiro inicial em uma grade 12x12 inicial com espaços vazios, com pedras e ervas daninhas;
* limpar o canteiro com um clique do mouse ou cursor;
* selecionar um de três tipos de sementes para plantar;
* preparar o solo para plantar;
* plantar a semente selecionada;
* regar um canteiro;
* as plantas ter um crescimento em números diferentes de fases;
* colher plantas com crescimento máximo;
* plantas não regadas morrem;
* a passagem de tempo pode ser feita com um timer ou com um clique de um botão.

## Descrição Sobre Este Jogo em Particular

* Há três plantas, a saber, cenoura, tomate e batata.

* Cenoura leva 1 unidade de tempo para crescer; tomate, 2; e batata, 3.

* Para plantar, é preciso clicar em uma semente e, em seguida, clicar em um terreno arado.

* Você só pode arar terrenos "vazios".

* "Vazios" ão gerados ao carregar a página ou obtidos ao "limpar" um terreno "pedra" ou "ervaDaninha".

* O tempo é contado em semanas, e você pode fazê-lo passar ao clicar em "avançar".

* Plantas em crescimento não regadas por 5 semanas consecutivas morrem (e o terreno fica "vazio" automaticamente).

## Sobre o Código

* jogo.js é o coração do código e reune toda a parte visual.

* jogador, loja, terreno, plantasCrescendo (todos .js) definem funções que retornam objetos que auxiliam jogo.js

* clicaSlot.js e avancaTempo.js têm funções importantes que foram modularizadas para maior clareza do código

## Crédito das Imagens.

* vazio(grama): <a href="https://www.flaticon.com/free-icons/grass" title="grass icons">Grass icons created by Iconriver - Flaticon</a>

* rocha1:<a href="https://www.flaticon.com/free-icons/stone" title="stone icons">Stone icons created by bastian 5 - Flaticon</a>

* rocha2: <a href="https://www.flaticon.com/free-icons/geology" title="geology icons">Geology icons created by vectorsmarket15 - Flaticon</a>

* rocha3:<a href="https://www.flaticon.com/free-icons/coal" title="coal icons">Coal icons created by Nsit - Flaticon</a>

* erva-daninha: <a href="https://www.flaticon.com/free-icons/weed" title="Weed icons">Weed icons created by Freepik - Flaticon</a>

* plantasCrescendo: https://hellorumin.itch.io/pixel-farm-asset-pack; @HelloRumin 

* moedas(dinheiro): www.kenney.nl

* arador(arar): <a href="https://www.flaticon.com/free-icons/plow" title="plow icons">Plow icons created by agus raharjo - Flaticon</a>

* regador(regar): <a href="https://www.flaticon.com/free-icons/watering-can" title="watering can icons">Watering can icons created by Mihimihi - Flaticon</a>

* mao (colher): <a href="https://www.flaticon.com/free-icons/reach" title="reach icons">Reach icons created by Freepik - Flaticon</a>

* ferramentas (limpar): <a href="https://www.flaticon.com/free-icons/pickaxe" title="pickaxe icons">Pickaxe icons created by Freepik - Flaticon</a>

* lixo(descartar): <a href="https://www.flaticon.com/free-icons/trash-can" title="trash can icons">Trash can icons created by kliwir art - Flaticon</a>

* cenoura(estoque): <a href="https://www.flaticon.com/free-icons/carrot" title="carrot icons">Carrot icons created by Freepik - Flaticon</a>

* tomate(estoque): <a href="https://www.flaticon.com/free-icons/tomato" title="tomato icons">Tomato icons created by Pixel perfect - Flaticon</a>

* batata(estoque): <a href="https://www.flaticon.com/free-icons/potato" title="potato icons">Potato icons created by Freepik - Flaticon</a>
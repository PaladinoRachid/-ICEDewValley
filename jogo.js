
//criar terreno ................................................................................
function criaTerreno(){
    const terreno = [];
    for (let i = 0; i < 144; i++) {
        const cadaSlot = criaSlot(i);
        terreno.push(cadaSlot);
    }
    return terreno;
}

function criaSlot(i) {

    //cria um obejto slot
    const slot = {
        id: i,
        estado: decideEstado(),
        planta: null,
        //atributos da planta
        ciclosCresscimento: -1,
        crescimentoMaximo: false,
        sede: false,
        tempoSede: 0
    };

    if(slot.estado === "plantado") {
        decideEstadoPlanta(slot);
        calculaCiclosCrescimento(slot);
    } 

    return slot;
}

function decideEstadoPlanta(slot) {   
        slot.planta = decidePlanta();
        slot.sede = true;
}

function calculaCiclosCrescimento(slot) {
    switch(slot.planta) {
        case "trigo":
            slot.ciclosCresscimento = 2;
            break;  
        case"cenoura":
            slot.ciclosCresscimento = 4;    
            break;
        case "café":
            slot.ciclosCresscimento = 6;    
            break;    
}
}

function decideEstado()
{
    //vetor de possibilidades de estado
    const possibilidadesEstado = ["vazio", "arado", "plantado", "pedra", "ervaDaninha"];
    // retorno do sorteiaValor -> 0 = vazio, 1 = planta, 2 = pedra, 3 = ervaDaninha
    return possibilidadesEstado[sorteiaValorInteiro( possibilidadesEstado.length)];
}

function decidePlanta()
{
    //função análoga à função decideEstado
    const possibilidadesPlanta = ["trigo", "cenoura", "café"];
    // retorno do sorteiaValor -> 0 = trigo, 1 = cenoura 2 = café 
    return possibilidadesPlanta[sorteiaValorInteiro(possibilidadesPlanta.length)];
}

function sorteiaValorInteiro(val)
{
    // sorteia um valor pertencente ao intervalo [0,1)
    let sorteiaValor = Math.random();
    // faz ser de [0, val)
    sorteiaValor = sorteiaValor*val;
    // pega a parte inteira do valor sorteado -- valores possíveis são 0, 1, 2, ..., val-1
    sorteiaValor = Math.floor(sorteiaValor);
    //...    
    return sorteiaValor;
}  

//...........................................................................................

//ciclar nos slots    

function clicaSlot(id, acao, sementePlanta){
switch(acao) {
    case "plantar":
        plantar(id, sementePlanta);
        break;
    case "regar":
        regar(id);
        break;
    case "arar":
        arar(id);
        break; 
    case "colher":
        colher(id);
        break;
    case "arrancar":
        arrancar(id);
        break;
        
}

function plantar(id, sementePlanta) {
    //verifica se o slot está pronto para a plantio 
    if(terreno[id].estado === "arado") {

        terreno[id].estado = "plantado";
        terreno[id].planta = sementePlanta;
        terreno[id].sede = true;
        calculaCiclosCrescimento(terreno[id]);
    }
}

function regar(id) {
    //verifica se o slot está plantado
    if(terreno[id].estado === "plantado"){
            terreno[id].sede = false;
            terreno[id].tempoSede = 0;
        }
    }
}

function arar(id) {
    if(terreno[id].estado === "vazio") {
        terreno[id].estado = "arado";
    }
}

function colher(id) {
    //verifica se o slot está plantado
    if(terreno[id].estado === "plantado") {
        zeraSlot(terreno[id]);
    }
    //preciso adicionar ao estoque do fazendeiro
}


function arrancar(id) {
    //verifica se o slot está plantado
    if(terreno[id].estado === "plantado") {       
        zeraSlot(terreno[id]);
    }
    //igual ao colher, mas não adiciona ao estoque e sim descarta    
}



//refatoração de arrancar e colher 
function zeraSlot(slot) {
    slot.estado = "vazio";
    slot.planta = null;
    slot.ciclosCresscimento = -1;
    slot.sede = false;
    slot.tempoSede = 0;
}
//.....................................................................................................
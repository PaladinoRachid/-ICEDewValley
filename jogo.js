
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
        id: i+1,
        estado: decideEstado(),
        planta: null,
        sede: false,
        tempoSede: 0
    };

    //ajusta os atributos do slot de acordo com o estado
    if(slot.estado === "planta") {
        //se tem uma planta, atribui o tipo   
        slot.planta = decidePlanta();
        slot.sede = true;
        
    }
    //retorna o objeto
    return slot;
}

function decideEstado()
{
    //vetor de possibilidades de estado
    const possibilidadesEstado = ["vazio", "planta", "pedra", "ervaDaninha"];
    // sorteia um valor pertencente ao intervalo [0,1)
    let sorteiaValor = Math.random();
    // faz ser de [0, 4)
    sorteiaValor = sorteiaValor*4;
    // pega a parte inteira do valor sorteado -- valores possíveis são 0, 1, 2, 3
    sorteiaValor = Math.floor(sorteiaValor);
    //...    
    // retorna o estado sorteado
    return possibilidadesEstado[sorteiaValor];
}

function decidePlanta()
{
    //função análoga à função decideEstado
    const possibilidadesPlanta = ["trigo", "café", "cenoura"];
    const sorteiaValor = Math.floor(Math.random() * 3);
    // 0 = trigo, 1 = café, 2 = cenoura
    return possibilidadesPlanta[sorteiaValor];
}
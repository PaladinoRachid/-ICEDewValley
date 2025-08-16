//criar terreno ................................................................................
export function criaTerreno()
{
    const terreno = [];
    for (let i = 0; i < 144; i++) 
    {
        const cadaSlot = criaSlot(i);
        terreno.push(cadaSlot);
    }
    return terreno;
}

function criaSlot(i) 
{

    //cria um obejto slot
    const slot = 
    {
        id: i,
        estado: decideEstado(),
        //atributos da planta
        planta:
        {
            plantado: null,
            ciclosCresscimento: -1,
            crescimentoMaximo: 0,
            sede: false,
            tempoSede: 0
        },
        controleTempo: true
    };
    /*
    if(slot.estado === "plantado") 
    {
        //decideEstadoPlanta(slot);
        //calculaCiclosCrescimento(slot);
    } 
    */
    return slot;
}
/*
function decideEstadoPlanta(slot) 
{   
        slot.planta.plantado = decidePlanta();
        slot.planta.sede = true;
}
*/


function decideEstado()
{
    //vetor de possibilidades de estado
    const possibilidadesEstado = ["vazio", "pedra", "ervaDaninha"];
    // retorno do sorteiaValor -> 0 = vazio, , 1 = pedra, 2 = ervaDaninha
    return possibilidadesEstado[sorteiaValorInteiro( possibilidadesEstado.length)];
}
/*
function decidePlanta()
{
    //função análoga à função decideEstado
    const possibilidadesPlanta = ["cenoura", "batata", "tomate"];
    // retorno do sorteiaValor -> 0 = trigo, 1 = cenoura 2 = café 
    return possibilidadesPlanta[sorteiaValorInteiro(possibilidadesPlanta.length)];
}
*/
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

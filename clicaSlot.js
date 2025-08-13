
//ciclar nos slots    
export function clicaSlot(slot, controle)
{
    switch(controle.acao) 
    {
        case "plantar":
            plantar(slot, controle.semente);
            break;
        case "regar":
            regar(slot);
            break;
        case "arar":
            arar(slot);
            break; 
        case "colher":
            colher(slot);
            break;
        case "arrancar":
            arrancar(slot);
            break;
        case "limpar":
            limpar(slot);
            break;
            
    }
}

function plantar(slot, sementePlanta) 
{
    //verifica se o slot está pronto para a plantio 
    if(slot.estado === "arado")
    {

        slot.estado = "plantado";
        slot.planta.plantado = sementePlanta;
        slot.planta.sede = true;
       // calculaCiclosCrescimento(slot);
    }
}

function regar(slot) 
{
    //verifica se o slot está plantado
    if(slot.estado === "plantado")
    {
            slot.planta.sede = false;
            slot.planta.tempoSede = 0;
    }
}


function arar(slot) 
{
    if(slot.estado === "vazio") {
        slot.estado = "arado";
    }
}

function colher(slot) 
{
    //verifica se o slot está plantado
    if(slot.estado === "plantado") 
    {
        colocaSilo(slot.planta.plantado);
        zeraSlot(slot);
    }
}

function colocaSilo(planta) 
{
    switch(planta) 
    {
        case "tomate":
            jogador.silo.trigo++;
            break;
        case "cenoura":
            jogador.silo.cenoura++;
            break;
        case "batata":
            jogador.silo.café++;
            break;
    }
}

function arrancar(slot) 
{
    //verifica se o slot está plantado
    if(slot.estado === "plantado")
    {       
        zeraSlot(slot);
    }
    //igual ao colher, mas com descarte 
}

function limpar(slot)
{
    //vazio, com planta ou arado: do nothing!
    if(slot.estado === "pedra" || slot.estado === "ervaDaninha") 
    {
        zeraSlot(slot);
    }
}

//refatoração de arrancar e colher 
function zeraSlot(slot) 
{
    slot.estado = "vazio";
    slot.planta.plantado = null;
    slot.planta.ciclosCresscimento = -1;
    slot.planta.sede = false;
    slot.planta.tempoSede = 0;
}
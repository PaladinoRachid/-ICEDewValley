
//ciclar nos   slots    
export function clicaSlot(slot, jogador)
{
    switch(jogador.controle.acao) 
    {
        case "plantar":
            plantar(slot, jogador.controle.semente);
            break;
        case "regar":
            regar(slot);
            //regar tem efeito uma vez por semana
            if(slot.estado === "plantado")
            slot.controleTempo = false;
            break;
        case "arar":
            arar(slot);
            break; 
        case "colher":
            colher(slot, jogador);
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
        slot.planta.tempoSede = 1;
        slot.planta.ciclosCrescimento = 0;
        calculaCiclosCrescimentoMaximo(slot);
    }
}

function calculaCiclosCrescimentoMaximo(slot) 
{
    switch(slot.planta.plantado) 
    {
        case "cenoura":
            slot.planta.crescimentoMaximo = 2;
            break;  
        case"batata":
            slot.planta.crescimentoMaximo = 3;    
            break;
        case "tomate":
            slot.planta.crescimentoMaximo = 5;    
            break;    
    }
}

function regar(slot) 
{
    if(slot.controleTempo){
    //verifica se o slot está plantado
    if(slot.estado === "plantado")
        {
                slot.planta.sede = false;
                slot.planta.tempoSede = 0;
        }
    }
}


function arar(slot) 
{
    if(slot.estado === "vazio") {
        slot.estado = "arado";
    }
}

function colher(slot, jogador) 
{
    //verifica se o slot está plantado
    if(slot.estado === "plantado") 
    {
        //verifica se a planta está no ponto de colheita
        if(slot.planta.ciclosCrescimento === slot.planta.crescimentoMaximo)
        {
            colocaSilo(slot.planta.plantado, jogador);
            zeraSlot(slot);
        }
    }
}

function colocaSilo(plantado, jogador) 
{
    switch(plantado) 
    {
        case "tomate":
            jogador.siloEstoque.tomate++;
            break;
        case "cenoura":
            jogador.siloEstoque.cenoura++;
            break;
        case "batata":
            jogador.siloEstoque.batata++;
            break;
    }
}

export function arrancar(slot) 
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
    slot.planta.ciclosCrescimento = -1;
    slot.planta.sede = false;
    slot.planta.tempoSede = 0;
}
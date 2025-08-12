
//ciclar nos slots    
export function clicaSlot(id, acao, sementePlanta)
{
    switch(acao) 
    {
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

    function plantar(id, sementePlanta) 
    {
        //verifica se o slot está pronto para a plantio 
        if(terreno[id].estado === "arado")
        {

            terreno[id].estado = "plantado";
            terreno[id].planta.plantado = sementePlanta;
            terreno[id].planta.sede = true;
            calculaCiclosCrescimento(terreno[id]);
        }
    }

    function regar(id) 
    {
        //verifica se o slot está plantado
        if(terreno[id].estado === "plantado")
        {
                terreno[id].planta.sede = false;
                terreno[id].planta.tempoSede = 0;
        }
    }
}

function arar(id) 
{
    if(terreno[id].estado === "vazio") {
        terreno[id].estado = "arado";
    }
}

function colher(id) 
{
    //verifica se o slot está plantado
    if(terreno[id].estado === "plantado") {
        zeraSlot(terreno[id]);
    }
    //preciso adicionar ao estoque do fazendeiro
}


function arrancar(id) 
{
    //verifica se o slot está plantado
    if(terreno[id].estado === "plantado") {       
        zeraSlot(terreno[id]);
    }
    //igual ao colher, mas não adiciona ao estoque e sim descarta    
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
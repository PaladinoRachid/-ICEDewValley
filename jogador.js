export function criarJogador()
{
    const fazendeiro = 
    {
        nome: "Pablo",
        //controles possíveis: "arar", "plantar", "regar", "colher", "arrancar",
        // em caso de semente, cenoura, trigo ou café 
        controle: 
        {
            //com valores para testes
            acao: "plantar",
            semente: "tomate",
        },
        dinheiro: 100,
        siloEstoque: 
        {
            trigo: 0,
            cenoura: 0,
            café: 0
        },
        siloSementes:
         {
            trigo: 5,
            cenoura: 5,
            café: 5
        },
        //registra o tempo de jogo
        
    };
    return fazendeiro;
}
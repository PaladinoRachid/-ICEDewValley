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
            cenoura: 0,
            tomate: 0,
            batata: 0
        },
        siloSementes:
         {
            cenoura: 5,
            tomate: 5,
            batata: 5
        },
        //registra o tempo de jogo
        semana: 0,
        controleTempo: true
       
        
    };
    return fazendeiro;
}
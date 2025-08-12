export function criarJogador()
{
    const fazendeiro = 
    {
        nome: "Pablo",
        //controles possíveis: "arar", "plantar", "regar", "colher", "arrancar",
        // em caso de semente, cenoura, trigo ou café 
        controle: 
        {
            acao: null,
            semente: null,
        },
        dinheiro: 100,
        silo: 
        {
            trigo: 0,
            cenoura: 0,
            café: 0
        },
        sementes:
         {
            trigo: 5,
            cenoura: 5,
            café: 5
        },
        //registra o tempo de jogo
        semana: 0
    };
    return fazendeiro;
}
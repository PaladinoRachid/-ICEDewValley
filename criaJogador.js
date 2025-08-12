export function criarJogador()
{
    const jogador = 
    {
        nome: "Pablo",
        dinheiro: 100,
        estoque: 
        {
            trigo: 0,
            cenoura: 0,
            café: 0
        },
        sementes:
         {
            sementesTrigo: 5,
            sementesCenoura: 5,
            sementesCafé: 5
        },
        semana: 0
    };
    return jogador;
}
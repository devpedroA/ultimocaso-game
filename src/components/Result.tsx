import { EstadoJogo } from '@/types';

interface ResultProps {
  onRestart: () => void;
  estadoJogo: EstadoJogo;
}

export default function Result({ onRestart, estadoJogo }: ResultProps) {
  const calcularPontuacao = () => {
    let pontuacao = 0;
    
    // Pontos por itens coletados
    pontuacao += estadoJogo.inventario.itens.length * 10;
    
    // Pontos por pistas descobertas
    pontuacao += estadoJogo.inventario.pistas.length * 15;
    
    // Pontos por locais visitados
    pontuacao += estadoJogo.locaisVisitados.size * 20;
    
    // Pontos por suspeitos interrogados
    pontuacao += estadoJogo.suspeitosInterrogados.size * 25;
    
    // Penalidade por acusações erradas
    pontuacao -= estadoJogo.acusacoesFeitas * 50;
    
    // Bônus por reputação
    pontuacao += estadoJogo.reputacao;
    
    return Math.max(0, pontuacao);
  };

  const pontuacao = calcularPontuacao();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">🎯 Resultado da Investigação</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">📊 Estatísticas</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Itens Coletados:</span>
                <span className="font-medium">{estadoJogo.inventario.itens.length}</span>
              </li>
              <li className="flex justify-between">
                <span>Pistas Descobertas:</span>
                <span className="font-medium">{estadoJogo.inventario.pistas.length}</span>
              </li>
              <li className="flex justify-between">
                <span>Locais Visitados:</span>
                <span className="font-medium">{estadoJogo.locaisVisitados.size}</span>
              </li>
              <li className="flex justify-between">
                <span>Suspeitos Interrogados:</span>
                <span className="font-medium">{estadoJogo.suspeitosInterrogados.size}</span>
              </li>
              <li className="flex justify-between">
                <span>Acusações Feitas:</span>
                <span className="font-medium">{estadoJogo.acusacoesFeitas}</span>
              </li>
              <li className="flex justify-between">
                <span>Reputação Final:</span>
                <span className="font-medium">{estadoJogo.reputacao}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">🏆 Pontuação</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {pontuacao} pontos
              </div>
              <div className="text-gray-600">
                {pontuacao >= 1000 ? '🎉 Excelente trabalho, detetive!' :
                 pontuacao >= 750 ? '👏 Muito bom trabalho!' :
                 pontuacao >= 500 ? '👍 Bom trabalho!' :
                 '🤔 Hmm, poderia ter feito melhor...'}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">📝 Conclusão</h3>
            <p className="text-gray-600">
              {pontuacao >= 1000 ? 'Você resolveu o caso com maestria! Sua dedução foi impecável e você coletou todas as evidências necessárias.' :
               pontuacao >= 750 ? 'Você fez um bom trabalho na investigação, mas ainda há alguns detalhes que poderiam ter sido melhor explorados.' :
               pontuacao >= 500 ? 'Sua investigação foi razoável, mas faltou mais dedicação em alguns aspectos importantes do caso.' :
               'Sua investigação deixou muito a desejar. Talvez seja melhor tentar novamente com mais atenção aos detalhes.'}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg"
        >
          🔄 Reiniciar Investigação
        </button>
      </div>
    </div>
  );
} 
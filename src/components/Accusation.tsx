import { useState } from 'react';
import { AccusationProps } from '@/types';
import OptimizedImage from './OptimizedImage';

export default function Accusation({ suspeitos, inventario, onAccusationComplete, onBack, solucao }: AccusationProps) {
  const [suspeitoSelecionado, setSuspeitoSelecionado] = useState<string>('');
  const [motivoSelecionado, setMotivoSelecionado] = useState<string>('');
  const [evidenciasSelecionadas, setEvidenciasSelecionadas] = useState<string[]>([]);
  const [showWarning, setShowWarning] = useState(false);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!suspeitoSelecionado || !motivoSelecionado || evidenciasSelecionadas.length === 0) {
      setShowWarning(true);
      return;
    }

    const suspeito = suspeitos[suspeitoSelecionado];
    const acusacaoCorreta = suspeitoSelecionado === solucao.culpado && suspeito.motivo === solucao.motivo;

    onAccusationComplete(acusacaoCorreta);
  };

  const selectedSuspect = suspeitos[suspeitoSelecionado];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🎭 Fazer Acusação</h2>
          <p className="text-gray-600">Selecione o suspeito, o motivo e as evidências que o incriminam</p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
        >
          <span>←</span> Voltar
        </button>
      </div>

      {showWarning && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          ⚠️ Por favor, preencha todos os campos antes de fazer a acusação.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coluna da Esquerda - Seleção do Suspeito */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                👤 Suspeito
              </label>
              <select
                value={suspeitoSelecionado}
                onChange={(e) => {
                  setSuspeitoSelecionado(e.target.value);
                  setMotivoSelecionado('');
                  setEvidenciasSelecionadas([]);
                  setShowWarning(false);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              >
                <option value="">Selecione um suspeito</option>
                {Object.entries(suspeitos).map(([id, suspeito]) => (
                  <option key={`suspeito-${id}`} value={id}>
                    {suspeito.nome}
                  </option>
                ))}
              </select>
            </div>

            {selectedSuspect && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <OptimizedImage 
                  src={selectedSuspect.imagem} 
                  alt={selectedSuspect.nome}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
                  width={128}
                  height={128}
                />
                <h3 className="text-lg font-semibold text-center mb-2">{selectedSuspect.nome}</h3>
                <p className="text-sm text-gray-600 text-center">{selectedSuspect.ocupacao}</p>
              </div>
            )}
          </div>

          {/* Coluna da Direita - Motivo e Evidências */}
          <div className="space-y-6">
            {suspeitoSelecionado && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🎯 Motivo
                </label>
                <select
                  value={motivoSelecionado}
                  onChange={(e) => {
                    setMotivoSelecionado(e.target.value);
                    setShowWarning(false);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                >
                  <option value="">Selecione um motivo</option>
                  <option value={selectedSuspect.motivo}>
                    {selectedSuspect.motivo}
                  </option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Evidências
              </label>
              <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                <div className="space-y-3">
                  {inventario.itens
                    .filter(item => selectedSuspect?.evidenciasPerson.includes(item.id))
                    .map((item) => (
                      <label 
                        key={`evidencia-${item.id}`} 
                        className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={evidenciasSelecionadas.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEvidenciasSelecionadas([...evidenciasSelecionadas, item.id]);
                            } else {
                              setEvidenciasSelecionadas(evidenciasSelecionadas.filter((p) => p !== item.id));
                            }
                            setShowWarning(false);
                          }}
                          className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <span className="text-gray-800 font-medium">{item.nome}</span>
                          <p className="text-sm text-gray-600">{item.descricao}</p>
                        </div>
                      </label>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="w-full py-4 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            🎭 Fazer Acusação
          </button>
        </div>
      </form>
    </div>
  );
} 
import { useState } from 'react';
import { BancoSuspeitos, Inventario } from '@/types';

interface AccusationProps {
  suspeitos: BancoSuspeitos;
  inventario: Inventario;
  onAccusationComplete: (success: boolean) => void;
  onBack: () => void;
  solucao: {
    culpado: string;
    motivo: string;
    evidencias: string[];
  };
}

export default function Accusation({ suspeitos, inventario, onAccusationComplete, onBack, solucao }: AccusationProps) {
  const [suspeitoSelecionado, setSuspeitoSelecionado] = useState<string>('');
  const [motivoSelecionado, setMotivoSelecionado] = useState<string>('');
  const [evidenciasSelecionadas, setEvidenciasSelecionadas] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!suspeitoSelecionado || !motivoSelecionado || evidenciasSelecionadas.length === 0) {
      alert('Por favor, preencha todos os campos antes de fazer a acusação.');
      return;
    }

    const suspeito = suspeitos[suspeitoSelecionado];
    const acusacaoCorreta = suspeitoSelecionado === solucao.culpado && suspeito.motivo === solucao.motivo;

    onAccusationComplete(acusacaoCorreta);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Fazer Acusação</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Voltar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Suspeito
          </label>
          <select
            value={suspeitoSelecionado}
            onChange={(e) => {
              setSuspeitoSelecionado(e.target.value);
              setMotivoSelecionado('');
              setEvidenciasSelecionadas([]);
            }}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecione um suspeito</option>
            {Object.entries(suspeitos).map(([id, suspeito]) => (
              <option key={`suspeito-${id}`} value={id}>
                {suspeito.nome}
              </option>
            ))}
          </select>
        </div>

        {suspeitoSelecionado && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motivo
            </label>
            <select
              value={motivoSelecionado}
              onChange={(e) => setMotivoSelecionado(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecione um motivo</option>
              <option value={suspeitos[suspeitoSelecionado].motivo}>
                {suspeitos[suspeitoSelecionado].motivo}
              </option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Evidências
          </label>
          <div className="space-y-2">
            {inventario.itens
              .filter(item => suspeitos[suspeitoSelecionado]?.evidenciasPerson.includes(item.id))
              .map((item) => (
                <label key={`evidencia-${item.id}`} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={evidenciasSelecionadas.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setEvidenciasSelecionadas([...evidenciasSelecionadas, item.id]);
                      } else {
                        setEvidenciasSelecionadas(evidenciasSelecionadas.filter((p) => p !== item.id));
                      }
                    }}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{item.nome}</span>
                </label>
              ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Fazer Acusação
        </button>
      </form>
    </div>
  );
} 
import React, { useState } from 'react';
import { SuspectDialogProps } from '@/types';

const SuspectDialog: React.FC<SuspectDialogProps> = ({ suspeito, onClose, inventario, isGuilty }) => {
  const [currentReaction, setCurrentReaction] = useState<string | null>(null);

  const handleEvidenceClick = (evidence: string) => {
    setCurrentReaction(evidence);
  };

  const getCurrentText = () => {
    if (currentReaction && suspeito.dialogos.reacao[isGuilty ? 'culpado' : 'inocente'][currentReaction]) {
      return suspeito.dialogos.reacao[isGuilty ? 'culpado' : 'inocente'][currentReaction].text;
    }
    return suspeito.dialogos.textoGeral;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <img 
          src={suspeito.imagem} 
          alt={suspeito.nome}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold">{suspeito.nome}</h2>
          <p className="text-gray-600">{suspeito.ocupacao}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg">{getCurrentText()}</p>
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="font-semibold text-lg">Evidências:</h3>
        <div className="grid grid-cols-2 gap-2">
          {inventario.itens
            .filter(item => suspeito.evidenciasPerson.includes(item.id))
            .map((item) => (
              <button
                key={item.id}
                onClick={() => handleEvidenceClick(item.id)}
                className={`p-3 text-left rounded ${
                  currentReaction === item.id
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {item.nome}
              </button>
            ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default SuspectDialog; 
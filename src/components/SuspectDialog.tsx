import React, { useState } from 'react';
import { Suspeito } from '../types';

interface SuspectDialogProps {
  suspect: Suspeito;
}

const SuspectDialog: React.FC<SuspectDialogProps> = ({ suspect }) => {
  const [currentReaction, setCurrentReaction] = useState<string | null>(null);

  const handleEvidenceClick = (evidence: string) => {
    setCurrentReaction(evidence);
  };
  const getCurrentText = () => {
    if (currentReaction && suspect.dialogos.reacao[currentReaction as keyof typeof suspect.dialogos.reacao]) {
      return suspect.dialogos.reacao[currentReaction as keyof typeof suspect.dialogos.reacao].text;
    }
    return suspect.dialogos.textoGeral;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full mr-4">
          {/* Placeholder para imagem do suspeito */}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{suspect.nome}</h2>
          <p className="text-gray-600">{suspect.ocupacao}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg">{getCurrentText()}</p>
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="font-semibold text-lg">Evidências:</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(suspect.dialogos.reacao).map((evidence) => (
            <button
              key={evidence}
              onClick={() => handleEvidenceClick(evidence)}
              className={`p-3 text-left rounded ${
                currentReaction === evidence
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {evidence}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuspectDialog; 
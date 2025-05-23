'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { SuspectsProps, Suspeito } from '@/types';

export default function Suspects({ suspeitos, inventario, onBack, actualCulpritId }: SuspectsProps) {
  const [selectedSuspect, setSelectedSuspect] = useState<Suspeito | null>(null);
  const [evidenciaSelecionada, setEvidenciaSelecionada] = useState<string>('');
  const [suspeitosInterrogados, setSuspeitosInterrogados] = useState<Set<string>>(new Set());
  const [evidenciasUsadas, setEvidenciasUsadas] = useState<Record<string, Set<string>>>({});

  // Função para verificar se todas as evidências de um suspeito foram usadas
  const todasEvidenciasUsadas = (suspeitoId: string): boolean => {
    const suspeito = suspeitos[suspeitoId];
    if (!suspeito) return false;
    
    const evidenciasDoSuspeito = suspeito.evidenciasPerson;
    const evidenciasUsadasDoSuspeito = evidenciasUsadas[suspeitoId] || new Set();
    
    return evidenciasDoSuspeito.every(evidencia => 
      evidenciasUsadasDoSuspeito.has(evidencia)
    );
  };

  // Efeito para atualizar o status de interrogado quando todas as evidências forem usadas
  useEffect(() => {
    if (selectedSuspect && todasEvidenciasUsadas(selectedSuspect.id)) {
      setSuspeitosInterrogados(prev => new Set([...prev, selectedSuspect.id]));
    }
  }, [evidenciasUsadas, selectedSuspect]);

  const selecionarSuspeito = (suspeito: Suspeito): void => {
    setSelectedSuspect(suspeito);
    setEvidenciaSelecionada('');
    // Inicializa o conjunto de evidências usadas para o suspeito se não existir
    if (!evidenciasUsadas[suspeito.id]) {
      setEvidenciasUsadas(prev => ({
        ...prev,
        [suspeito.id]: new Set()
      }));
    }
  };

  const getResposta = (suspeitoId: string, evidenciaId: string): string => {
    const suspeito = suspeitos[suspeitoId];
    if (!suspeito) {
      console.log('Suspeito não encontrado:', suspeitoId);
      return '';
    }
    
    const isCulprit = suspeitoId === actualCulpritId;
    console.log('Status do suspeito:', {
      id: suspeitoId,
      nome: suspeito.nome,
      isCulprit,
      actualCulpritId
    });
    
    // Verifica se existe reação específica para a evidência
    const reacaoCulpado = suspeito.dialogos.reacao.culpado[evidenciaId];
    const reacaoInocente = suspeito.dialogos.reacao.inocente[evidenciaId];
    
    console.log('Reações encontradas:', {
      evidenciaId,
      reacaoCulpado,
      reacaoInocente
    });

    // Retorna a reação apropriada baseada no status de culpa
    if (isCulprit && reacaoCulpado) {
      return reacaoCulpado.text;
    } else if (!isCulprit && reacaoInocente) {
      return reacaoInocente.text;
    }

    // Se não houver reação específica, retorna o texto geral
    return suspeito.dialogos.textoGeral;
  };

  const getPergunta = (evidenciaId: string): string => {
    const item = inventario.itens.find(item => item.id === evidenciaId);
    if (!item) return '';

    // Gera perguntas baseadas no tipo de evidência
    switch (item.id) {
      case 'livro_veneno':
        return 'O que você sabe sobre este livro de venenos?';
      case 'carta_ameaca':
        return 'Você já viu esta carta de ameaça antes?';
      case 'xicara_cha':
        return 'Você sabe sobre o chá servido para o Sir Blackwood naquela noite?';
      case 'testamento':
        return 'O que você sabe sobre as alterações no testamento?';
      case 'chaleira':
        return 'Você usa esta chaleira para preparar o chá?';
      case 'planta_venenosa':
        return 'Você sabia que esta planta é venenosa?';
      default:
        return `O que você pode me dizer sobre ${item.nome}?`;
    }
  };

  const selecionarEvidencia = (itemId: string): void => {
    if (selectedSuspect) {
      console.log('Selecionando evidência:', {
        suspeito: selectedSuspect.nome,
        evidenciaId: itemId
      });
      
      const evidenciasUsadasDoSuspeito = evidenciasUsadas[selectedSuspect.id] || new Set();
      if (!evidenciasUsadasDoSuspeito.has(itemId)) {
        setEvidenciaSelecionada(itemId);
        // Marcar evidência como usada imediatamente ao ser selecionada
        setEvidenciasUsadas(prev => ({
          ...prev,
          [selectedSuspect.id]: new Set([...prev[selectedSuspect.id], itemId])
        }));
      }
    }
  };

  if (!selectedSuspect) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">👥 Suspeitos</h2>
          <button
            onClick={onBack}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Voltar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(suspeitos).map(([nome, suspeito]) => (
            <div
              key={nome}
              onClick={() => selecionarSuspeito(suspeito)}
              className={`cursor-pointer transition-all transform hover:-translate-y-1 hover:shadow-lg ${
                suspeitosInterrogados.has(nome) ? 'bg-green-50' : ''
              }`}
            >
              <div className={`rounded-lg overflow-hidden ${
                suspeitosInterrogados.has(nome) ? 'bg-green-50' : 'bg-gray-50'
              }`}>
                <div className="p-4 flex items-center space-x-4">
                  <img 
                    src={suspeito.imagem} 
                    alt={suspeito.nome}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{suspeito.nome}</h3>
                    <p className="text-sm text-gray-600">{suspeito.descricao}</p>
                    {suspeitosInterrogados.has(nome) && (
                      <span className="inline-block mt-2 text-sm text-green-600">
                        ✓ Interrogado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const evidenciasUsadasDoSuspeito = evidenciasUsadas[selectedSuspect.id] || new Set();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Interrogatório: {selectedSuspect.nome}</h2>
        <button
          onClick={() => setSelectedSuspect(null)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Voltar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img 
            src={selectedSuspect.imagem} 
            alt={selectedSuspect.nome}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">📝 Informações</h3>
              <p className="text-gray-600">{selectedSuspect.descricao}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">👤 Personalidade</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSuspect.personalidade.map((trait, index) => (
                  <span
                    key={`${selectedSuspect.nome}-trait-${index}`}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🤝 Relacionamentos</h3>
              <ul className="space-y-1">
                {Object.entries(selectedSuspect.relacoes).map(([pessoa, relacao]) => (
                  <li key={`${selectedSuspect.nome}-rel-${pessoa}`} className="text-sm text-gray-600">
                    <span className="font-medium">{pessoa}:</span> {relacao}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">💬 Interrogatório</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {evidenciaSelecionada ? (
                <>
                  <p className="text-gray-800 mb-2 font-medium">
                    {getPergunta(evidenciaSelecionada)}
                  </p>

                  {/* Resposta é mostrada imediatamente */}
                  <p className="text-gray-600 italic mt-2">
                    {getResposta(selectedSuspect.id, evidenciaSelecionada)}
                  </p>
                </>
              ) : (
                <p className="text-gray-600 italic">
                  Selecione uma evidência para interrogar o suspeito.
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">🔍 Evidências</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inventario.itens
                .filter(item => selectedSuspect.evidenciasPerson.includes(item.id))
                .map(item => {
                  const jaUsada = evidenciasUsadasDoSuspeito.has(item.id);
                  return (
                    <button
                      key={`${selectedSuspect.nome}-evid-${item.id}`}
                      onClick={() => selecionarEvidencia(item.id)}
                      disabled={jaUsada}
                      className={`flex flex-col items-start p-4 rounded-lg shadow transition-colors text-left w-full h-full
                        ${
                          jaUsada
                            ? 'bg-gray-100 cursor-not-allowed'
                            : 'bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                        }
                      `}
                    >
                      {item.imagem && (
                        <img
                          src={item.imagem}
                          alt={item.nome}
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                      )}
                      <div className="flex items-center justify-between w-full">
                        <p className="font-medium text-gray-800 text-lg">{item.nome}</p>
                        {jaUsada && (
                          <span className="text-green-600 text-xl ml-2">✓</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 flex-grow">{item.descricao}</p>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

/* eslint-disable @next/next/no-img-element */
import { Item, Local, LocationProps } from '@/types';
import { useState, useEffect } from 'react';
import OptimizedImage from './OptimizedImage';

export default function Location({ locais = [], onItemCollect, onPistaCollect, onBack, inventario = { itens: [], pistas: [] } }: LocationProps) {
  const [isClient, setIsClient] = useState(false);
  const [localAtual, setLocalAtual] = useState<Local | null>(null);
  const [locaisVisitados, setLocaisVisitados] = useState<Set<string>>(new Set());
  const [itensColetados, setItensColetados] = useState<Set<string>>(new Set());
  const [pistasColetadas, setPistasColetadas] = useState<Set<string>>(new Set());

  // Marca o componente como montado no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Inicializa os estados apenas uma vez quando o componente monta no cliente
  useEffect(() => {
    if (!isClient) return;

    // Inicializa locais visitados
    const visitados = new Set(locais.filter(local => local?.visitado).map(local => local?.id));
    setLocaisVisitados(visitados);
    
    // Inicializa itens coletados
    const itensIds = new Set(inventario?.itens?.map(item => item?.id) || []);
    setItensColetados(itensIds);
    
    // Inicializa pistas coletadas
    const pistasSet = new Set(inventario?.pistas || []);
    setPistasColetadas(pistasSet);
  }, [isClient, locais, inventario?.itens, inventario?.pistas]); // Adicionadas as dependências faltantes

  const handleLocalClick = (local: Local) => {
    if (!local?.id) return;
    setLocalAtual(local);
    if (!locaisVisitados.has(local.id)) {
      setLocaisVisitados(prev => new Set([...prev, local.id]));
      local.visitado = true;
    }
  };

  const handleItemCollect = (item: Item) => {
    if (!item?.id || itensColetados.has(item.id)) return;
    onItemCollect(item);
    setItensColetados(prev => new Set([...prev, item.id]));
  };

  const handlePistaCollect = (pista: string) => {
    if (!pista || pistasColetadas.has(pista)) return;
    onPistaCollect(pista);
    setPistasColetadas(prev => new Set([...prev, pista]));
  };

  // Renderiza um placeholder durante a hidratação
  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">📍 Locais Disponíveis</h2>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Voltar
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {locais.map((local) => (
              <div
                key={local?.id}
                className="cursor-pointer transition-all transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  {local?.imagem && (
                    <img
                      src={local.imagem}
                      alt={local?.nome || ''}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{local?.nome}</h3>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{local?.descricao}</p>
                    <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
                      <span>
                        {local?.itens?.length || 0} itens • {local?.pistas?.length || 0} pistas
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!localAtual ? (
        // Seção de Locais Disponíveis
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">📍 Locais Disponíveis</h2>
            <button
              onClick={onBack}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Voltar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {locais.map((local) => {
              if (!local?.id) return null;
              const visitado = locaisVisitados.has(local.id);
              return (
                <div
                  key={local.id}
                  onClick={() => handleLocalClick(local)}
                  className={`cursor-pointer transition-all transform hover:-translate-y-1 hover:shadow-lg ${
                    visitado ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    {local.imagem && (
                      <img
                        src={local.imagem}
                        alt={local.nome || ''}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">{local.nome}</h3>
                        {visitado && (
                          <span className="text-green-500 text-sm font-medium">
                            ✓ Visitado
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{local.descricao}</p>
                      <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
                        <span>
                          {local.itens?.length || 0} itens • {local.pistas?.length || 0} pistas
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Conteúdo do Local Selecionado
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">🏰 {localAtual.nome}</h2>
              {locaisVisitados.has(localAtual.id) && (
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                  ✓ Visitado
                </span>
              )}
            </div>
            <button
              onClick={() => setLocalAtual(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Voltar aos Locais
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <OptimizedImage 
                src={localAtual.imagem} 
                alt={localAtual.nome}
                className="w-full h-64 object-cover rounded-lg mb-4"
                width={400}
                height={192}
              />
              <p className="text-gray-600 mb-4">{localAtual.descricao}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">🔍 Itens Encontrados</h3>
                <div className="space-y-2">
                  {localAtual.itens?.map((item) => {
                    if (!item?.id) return null;
                    const coletado = itensColetados.has(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          coletado ? 'bg-gray-100' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          {item.imagem && (
                            <img
                              src={item.imagem}
                              alt={item.nome || ''}
                              className="w-10 h-10 object-cover rounded mr-3"
                            />
                          )}
                          <div>
                            <p className="font-medium">{item.nome}</p>
                            <p className="text-sm text-gray-600">{item.descricao}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleItemCollect(item)}
                          disabled={coletado}
                          className={`px-3 py-1 rounded transition-colors ${
                            coletado
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          {coletado ? '✓ Coletado' : 'Coletar'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">🔎 Pistas</h3>
                <div className="space-y-2">
                  {localAtual.pistas?.map((pista, index) => {
                    if (!pista) return null;
                    const coletada = pistasColetadas.has(pista);
                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          coletada ? 'bg-gray-100' : 'bg-gray-50'
                        }`}
                      >
                        <p className="text-gray-600">{pista}</p>
                        <button
                          onClick={() => handlePistaCollect(pista)}
                          disabled={coletada}
                          className={`px-3 py-1 rounded transition-colors ${
                            coletada
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          {coletada ? '✓ Examinada' : 'Examinar'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
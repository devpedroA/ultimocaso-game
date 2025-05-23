import { useState } from 'react';
import { Caso, Inventario, Item, BaseCaseProps } from '@/types';
import Location from './Location';
import Suspects from './Suspects';
import Accusation from './Accusation';
import Inventory from './Inventory';

type Page = 'main' | 'location' | 'suspects' | 'accusation';

export default function BaseCase({ caso, onCaseComplete }: BaseCaseProps) {
  const [currentPage, setCurrentPage] = useState<Page>('main');
  const [inventory, setInventory] = useState<Inventario>({
    itens: [],
    pistas: caso.pistasIniciais
  });

  const handleItemCollect = (item: Item) => {
    setInventory(prev => ({
      ...prev,
      itens: [...prev.itens, item]
    }));
  };

  const handlePistaCollect = (pista: string) => {
    setInventory(prev => ({
      ...prev,
      pistas: [...prev.pistas, pista]
    }));
  };

  const handleAccusationComplete = (success: boolean) => {
    onCaseComplete(success);
    setCurrentPage('main');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <Inventory 
          inventario={inventory}
        />

        <div className="bg-white rounded-xl shadow-xl p-8">
          {currentPage === 'main' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{caso.titulo}</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {caso.descricao}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <button 
                  onClick={() => setCurrentPage('location')}
                  className="group bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div className="text-center">
                    <span className="text-4xl mb-3 block">🏰</span>
                    <h3 className="text-xl font-semibold text-white mb-2">Explorar Locais</h3>
                    <p className="text-blue-100 text-sm">Investigue os locais do crime</p>
                  </div>
                </button>

                <button 
                  onClick={() => setCurrentPage('suspects')}
                  className="group bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div className="text-center">
                    <span className="text-4xl mb-3 block">👥</span>
                    <h3 className="text-xl font-semibold text-white mb-2">Interrogar Suspeitos</h3>
                    <p className="text-purple-100 text-sm">Converse com os suspeitos</p>
                  </div>
                </button>

                <button 
                  onClick={() => setCurrentPage('accusation')}
                  className="group bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div className="text-center">
                    <span className="text-4xl mb-3 block">⚖️</span>
                    <h3 className="text-xl font-semibold text-white mb-2">Fazer Acusação</h3>
                    <p className="text-red-100 text-sm">Apresente sua conclusão</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {currentPage === 'location' && (
            <Location
              locais={caso.locais}
              onItemCollect={handleItemCollect}
              onPistaCollect={handlePistaCollect}
              onBack={() => setCurrentPage('main')}
              inventario={inventory}
            />
          )}

          {currentPage === 'suspects' && (
            <Suspects
              suspeitos={caso.suspeitos}
              inventario={inventory}
              onBack={() => setCurrentPage('main')}
              actualCulpritId={caso.solucao.culpado}
            />
          )}

          {currentPage === 'accusation' && (
            <Accusation
              suspeitos={caso.suspeitos}
              inventario={inventory}
              solucao={caso.solucao}
              onAccusationComplete={handleAccusationComplete}
              onBack={() => setCurrentPage('main')}
            />
          )}
        </div>
      </div>
    </div>
  );
} 
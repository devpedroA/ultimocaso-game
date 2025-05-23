"use client"
import { Inventario } from '@/types';

interface InventoryProps {
  inventario: Inventario;
}

export default function Inventory({ inventario }: InventoryProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg mb-6 border border-gray-200 h-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="mr-2">📦</span>
        Inventário do Detetive
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seção de Pistas */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-3 text-gray-700 flex items-center">
            <span className="mr-2">🔍</span>
            Pistas Encontradas
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {inventario.pistas.length}
            </span>
          </h3>
          <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {inventario.pistas.length === 0 ? (
              <li className="text-sm text-gray-500 italic">Nenhuma pista encontrada ainda...</li>
            ) : (
              inventario.pistas.map((pista, index) => (
                <li key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md border border-gray-100">
                  • {pista}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Seção de Itens */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-3 text-gray-700 flex items-center">
            <span className="mr-2">🎒</span>
            Itens Coletados
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              {inventario.itens.length}
            </span>
          </h3>
          <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {inventario.itens.length === 0 ? (
              <li className="text-sm text-gray-500 italic">Nenhum item coletado ainda...</li>
            ) : (
              inventario.itens.map((item) => (
                <li key={item.id} className="text-sm bg-gray-50 p-3 rounded-md border border-gray-100 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start">
                    {item.imagem && (
                      <div className="mr-3 flex-shrink-0">
                        <img 
                          src={item.imagem} 
                          alt={item.nome} 
                          className="w-12 h-12 object-cover rounded-md shadow-sm"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <span className="font-medium text-gray-800 block mb-1">{item.nome}</span>
                      <p className="text-gray-600 text-xs leading-relaxed">{item.descricao}</p>
                      <div className="mt-1">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          item.tipo === 'pista' ? 'bg-blue-100 text-blue-800' :
                          item.tipo === 'evidencia' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
} 
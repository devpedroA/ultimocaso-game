"use client";

import Link from "next/link";
import { getAvailableCases } from "@/data/cases";

export default function Home() {
  const casos = getAvailableCases();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <main className="container mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🕵️‍♂️ Caso Fechado
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Escolha um caso para investigar e coloque suas habilidades de detetive à prova!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {casos.map((caso) => (
            <Link 
              key={caso.id}
              href={`/cases/${caso.id}`} 
              className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {caso.titulo}
                </h2>
                <p className="text-gray-600 mb-4">
                  {caso.descricao}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-3 py-1 rounded-full ${
                    caso.dificuldade === 'facil' ? 'bg-green-100 text-green-800' :
                    caso.dificuldade === 'medio' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {caso.dificuldade.charAt(0).toUpperCase() + caso.dificuldade.slice(1)}
                  </span>
                  <span className="text-gray-500">
                    ⏱️ {caso.tempoLimite}h
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-b-xl">
                <p className="text-white text-center font-medium">
                  Iniciar Investigação →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

interface ReportProps {
  locaisVisitados: Set<string>;
  suspeitosInterrogados: Set<string>;
  progresso: number;
}

export default function Report({ locaisVisitados, suspeitosInterrogados, progresso }: ReportProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">📝 Relatório</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">📊 Progresso da Investigação</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progresso}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{progresso}% completo</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">🏰 Locais Visitados</h3>
        <ul className="space-y-1">
          {Array.from(locaisVisitados).map((local, index) => (
            <li key={index} className="text-sm text-gray-600">
              ✓ {local}
            </li>
          ))}
          {locaisVisitados.size === 0 && (
            <li className="text-sm text-gray-500">Nenhum local visitado ainda.</li>
          )}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-2">👥 Suspeitos Interrogados</h3>
        <ul className="space-y-1">
          {Array.from(suspeitosInterrogados).map((suspeito, index) => (
            <li key={index} className="text-sm text-gray-600">
              ✓ {suspeito}
            </li>
          ))}
          {suspeitosInterrogados.size === 0 && (
            <li className="text-sm text-gray-500">Nenhum suspeito interrogado ainda.</li>
          )}
        </ul>
      </div>
    </div>
  );
} 
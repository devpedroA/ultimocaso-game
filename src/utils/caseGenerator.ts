import { Caso, Suspeito, Local, Item, Dialogos } from '@/types';

type SuspeitoTemplate = Omit<Suspeito, 'dialogos'> & {
  dialogos: Dialogos;
};

type LocalTemplate = Omit<Local, 'itens'> & {
  itens: Item[];
};

interface CaseTemplate {
  id: string;
  titulo: string;
  descricao: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  tempoLimite: number;
  locais: LocalTemplate[];
  suspeitos: { [key: string]: SuspeitoTemplate };
  pistasIniciais: string[];
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generateEvidencias(suspeito: SuspeitoTemplate, culpado: string): string[] {
  const evidencias: string[] = [];
  
  // Evidências específicas do suspeito
  if (suspeito.evidenciasPerson) {
    evidencias.push(...suspeito.evidenciasPerson);
  }

  // Se for o culpado, adiciona evidências incriminadoras
  if (suspeito.nome === culpado) {
    evidencias.push(`Marca de ${suspeito.nome} encontrada na cena do crime`);
    evidencias.push(`Motivo claro: ${suspeito.motivo}`);
  }

  return evidencias;
}

function generateSolucao(suspeito: SuspeitoTemplate): { culpado: string; motivo: string; evidencias: string[] } {
  return {
    culpado: suspeito.nome,
    motivo: suspeito.motivo,
    evidencias: generateEvidencias(suspeito, suspeito.nome)
  };
}

export function generateRandomCase(template: CaseTemplate): Caso {
  // Escolhe um suspeito aleatório para ser o culpado
  const suspeitosArray = Object.values(template.suspeitos);
  const culpado = suspeitosArray[Math.floor(Math.random() * suspeitosArray.length)];

  // Gera as evidências para cada suspeito
  const suspeitosComEvidencias = Object.entries(template.suspeitos).reduce<Record<string, Suspeito>>((acc, [key, suspeito]) => {
    acc[key] = {
      ...suspeito,
      evidenciasPerson: generateEvidencias(suspeito, culpado.nome)
    };
    return acc;
  }, {});

  // Distribui itens e pistas aleatoriamente pelos locais
  const locaisComItens = template.locais.map(local => ({
    ...local,
    itens: shuffleArray(local.itens),
    pistas: shuffleArray(local.pistas)
  }));

  return {
    ...template,
    suspeitos: suspeitosComEvidencias,
    locais: locaisComItens,
    solucao: generateSolucao(culpado)
  };
} 
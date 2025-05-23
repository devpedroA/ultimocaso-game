export interface Dialogos {
    textoGeral: string;
    reacao: {
        culpado: {
            [key: string]: {
                text: string;
            };
        };
        inocente: {
            [key: string]: {
                text: string;
            };
        };
    };
}

export interface Suspeito {
    id: string;
    nome: string;
    ocupacao: string;
    descricao: string;
    motivo: string;
    dialogos: Dialogos;
    evidenciasPerson: string[];
    personalidade: string[];
    imagem: string;
    relacoes: {
        [key: string]: string;
    };
}

export type BancoSuspeitos = {
    [key: string]: Suspeito;
};

export type Item = {
    id: string;
    nome: string;
    descricao: string;
    tipo: 'pista' | 'item' | 'evidencia';
    relevancia: number;
    localEncontrado: string;
    imagem?: string;
};

export type Local = {
    id: string;
    nome: string;
    descricao: string;
    itens: Item[];
    pistas: string[];
    imagem: string;
    visitado: boolean;
    requisitos?: {
        itens?: string[];
        pistas?: string[];
    };
};

export type Inventario = {
    itens: Item[];
    pistas: string[];
};

export type EstadoJogo = {
    inventario: Inventario;
    locaisVisitados: Set<string>;
    suspeitosInterrogados: Set<string>;
    reputacao: number;
    progresso: number;
    acusacoesFeitas: number;
};

export type Acusacao = {
    suspeito: string;
    motivo: string;
    evidencias: string[];
    confianca: number;
    data: Date;
};

export interface Caso {
    id: string;
    titulo: string;
    descricao: string;
    dificuldade: 'facil' | 'medio' | 'dificil';
    tempoLimite: number;
    locais: Local[];
    suspeitos: BancoSuspeitos;
    pistasIniciais: string[];
    solucao: {
        culpado: string;
        motivo: string;
        evidencias: string[];
    };
}

export interface LocationProps {
    locais: Local[];
    onItemCollect: (item: Item) => void;
    onPistaCollect: (pista: string) => void;
    onBack: () => void;
    inventario: Inventario;
}

export interface SuspectsProps {
    suspeitos: BancoSuspeitos;
    inventario: Inventario;
    onBack: () => void;
    actualCulpritId: string;
}

export interface AccusationProps {
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

export interface BaseCaseProps {
    caso: Caso;
    onCaseComplete: (success: boolean) => void;
}

export interface InventoryProps {
    inventario: Inventario;
}

export interface SuspectDialogProps {
    suspeito: Suspeito;
    onClose: () => void;
    inventario: Inventario;
    isGuilty: boolean;
}
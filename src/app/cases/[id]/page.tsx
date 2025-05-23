"use client";

import { useParams } from 'next/navigation';
import { getRandomCase } from '@/data/cases';
import BaseCase from '@/components/BaseCase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Caso } from '@/types';

export default function CasePage() {
  const params = useParams();
  const router = useRouter();
  const casoId = params.id as string;
  const [caso, setCaso] = useState<Caso | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const randomCase = getRandomCase(casoId);
    if (!randomCase) {
      router.push('/');
      return;
    }
    setCaso(randomCase);
    setLoading(false);
  }, [casoId, router]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Carregando caso...</h1>
      </div>
    );
  }

  if (!caso) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-600">Caso não encontrado</h1>
        <button 
          onClick={() => router.push('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Voltar para a página inicial
        </button>
      </div>
    );
  }

  const handleCaseComplete = (success: boolean) => {
    // Aqui você pode adicionar lógica para salvar o progresso, mostrar resultados, etc.
    alert(success ? 'Parabéns! Você resolveu o caso!' : 'Ops! Sua acusação estava errada.');
    router.push('/');
  };

  return <BaseCase caso={caso} onCaseComplete={handleCaseComplete} />;
} 
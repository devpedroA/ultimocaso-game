"use client";
import { useState } from 'react';

export default function CaseBlackwood() {
  const [pagina, setPagina] = useState<'pagina1' | 'pagina2' | 'pagina8' | 'pagina12'>('pagina1');

  return (
    <div>
      <div id="inventario">
        <h3>🗂️ Pistas <span id="badge-pistas">0</span></h3>
        <ul id="lista-pistas">
          <li>Nenhuma pista encontrada ainda.</li>
        </ul>
        <div className="itens">
          <h3>🔍 Itens Coletados <span id="badge-itens">0</span></h3>
          <ul id="lista-itens"></ul>
        </div>
      </div>

      <div className='testes'>
        {pagina === 'pagina1' && (
          <div className="box active">
            <h1>🕵️‍♂️ O Mistério da Mansão Blackwood</h1>
            <p>
              Numa noite chuvosa de novembro, Sir Reginald Blackwood foi assassinado em sua própria mansão.
              Como detetive convidado, você deve investigar os suspeitos e descobrir quem cometeu o crime antes que o assassino escape.
            </p>
            <br />
            <div className="menu">
              <span>Você pode:</span>
              <br />
              <button onClick={() => setPagina('pagina2')}>🏰 Explorar a Mansão</button>
              <button onClick={() => setPagina('pagina8')}>👥 Interrogar os Suspeitos</button>
              <button onClick={() => setPagina('pagina12')}>⚖️ Fazer uma Acusação</button>
            </div>
          </div>
        )}

        {pagina === 'pagina2' && (
          <div className="box active">
            <h2>🏰 Exploração da Mansão</h2>
            <p>Aqui você pode explorar os cômodos da mansão.</p>
            
            <button onClick={() => setPagina('pagina1')}>⬅️ Voltar</button>
          </div>
        )}

        {pagina === 'pagina8' && (
          <div className="box active">
            <h2>👥 Interrogatório dos Suspeitos</h2>
            <p>Converse com os suspeitos para coletar informações.</p>
            <button onClick={() => setPagina('pagina1')}>⬅️ Voltar</button>
          </div>
        )}

        {pagina === 'pagina12' && (
          <div className="box active">
            <h2>⚖️ Fazer uma Acusação</h2>
            <p>Escolha quem você acha que é o culpado.</p>
            <button onClick={() => setPagina('pagina1')}>⬅️ Voltar</button>
          </div>
        )}
      </div>


    </div>
  );
}

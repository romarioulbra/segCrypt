// app/hash/page.tsx ou em um componente .tsx
'use client';

import { useState } from 'react';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  const handleHash = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    setHash(hashHex);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Gerador de Hash (SHA-256)</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Digite uma palavra ou frase"
        style={{ width: 300, padding: 8 }}
      />
      <button onClick={handleHash} style={{ marginLeft: 10, padding: 8 }}>
        Gerar Hash
      </button>
      {hash && (
        <div style={{ marginTop: 20 }}>
          <strong>Hash SHA-256:</strong>
          <p style={{ wordBreak: 'break-all' }}>{hash}</p>
        </div>
      )}
    </div>
  );
}

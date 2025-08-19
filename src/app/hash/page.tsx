// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FiClipboard, FiCheck } from 'react-icons/fi'; // ícones react-icons

// const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

// export default function HashGenerator() {
//   const [input, setInput] = useState('');
//   const [hash, setHash] = useState('');
//   const [algorithm, setAlgorithm] = useState('SHA-256');
//   const [copied, setCopied] = useState(false);

//   const handleHash = async () => {
//     try {
//       const encoder = new TextEncoder();
//       const data = encoder.encode(input);
//       const hashBuffer = await crypto.subtle.digest(algorithm, data);
//       const hashArray = Array.from(new Uint8Array(hashBuffer));
//       const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//       setHash(hashHex);
//       setCopied(false);
//     } catch (err) {
//       console.error('Erro ao gerar hash:', err);
//       setHash('Erro ao gerar o hash. Algoritmo não suportado.');
//     }
//   };

//   const copyToClipboard = () => {
//     if (!hash) return;
//     navigator.clipboard.writeText(hash);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white flex flex-col items-center justify-center px-4 py-10">
//       <motion.h1
//         className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 text-center"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         🔐 Gerador de Hash
//       </motion.h1>

//       <motion.p
//         className="text-gray-400 text-center mb-8 max-w-xl"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.3 }}
//       >
//         Digite uma palavra ou frase, escolha o algoritmo desejado e gere um hash seguro.
//       </motion.p>

//       <motion.div
//         className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-2xl space-y-6"
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.4, duration: 0.5 }}
//       >
//         {/* Input e opções */}
//         <div className="flex flex-col md:flex-row items-stretch gap-4">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Digite uma frase ou palavra"
//             className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           />

//           <select
//             value={algorithm}
//             onChange={(e) => setAlgorithm(e.target.value)}
//             className="px-3 py-3 rounded-lg bg-gray-800 text-white border border-cyan-500"
//           >
//             {algorithms.map((algo) => (
//               <option key={algo} value={algo}>
//                 {algo}
//               </option>
//             ))}
//           </select>

//           <motion.button
//             onClick={handleHash}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-lg transition whitespace-nowrap"
//           >
//             Gerar Hash
//           </motion.button>
//         </div>

//         {/* Resultado */}
//         {hash && (
//           <motion.div
//             className="bg-gray-800 p-4 rounded-lg relative"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//           >
//             <p className="text-cyan-400 font-semibold mb-1">Hash ({algorithm}):</p>
//             <p className="break-words text-sm text-gray-200">{hash}</p>

//             {/* Botão copiar */}
//             <motion.button
//               onClick={copyToClipboard}
//               whileHover={{ scale: 1.1 }}
//               className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-300"
//               title="Copiar hash"
//             >
//               {copied ? (
//                 <FiCheck className="w-6 h-6 text-green-400" />
//               ) : (
//                 <FiClipboard className="w-6 h-6" />
//               )}
//             </motion.button>
//           </motion.div>
//         )}
//       </motion.div>
//     </main>
//   );
// }


'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiClipboard, FiCheck } from 'react-icons/fi';

const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

export default function HashGenerator() {
  // Hash Normal (frontend)
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);

  // Hash com chave simétrica (backend)
  const [inputKey, setInputKey] = useState('');
  const [inputSym, setInputSym] = useState('');
  const [hashSym, setHashSym] = useState('');
  const [copiedSym, setCopiedSym] = useState(false);
  const [loadingSym, setLoadingSym] = useState(false);
  const [errorSym, setErrorSym] = useState('');

  // Função para gerar hash normal no frontend
  const handleHash = async () => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      setHash(hashHex);
      setCopied(false);
    } catch (err) {
      console.error('Erro ao gerar hash:', err);
      setHash('Erro ao gerar o hash.');
    }
  };

  // Função para chamar a API para hash com chave simétrica (HMAC)
  const handleHashSym = async () => {
    setLoadingSym(true);
    setErrorSym('');
    setHashSym('');
    setCopiedSym(false);

    try {
      const res = await fetch('/api/hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputSym, key: inputKey }),
      });

      if (!res.ok) throw new Error('Erro na requisição');

      const data = await res.json();
      setHashSym(data.hash);
    } catch (err) {
      setErrorSym('Erro ao gerar hash com chave simétrica.');
    } finally {
      setLoadingSym(false);
    }
  };

  // Função para copiar hashes
  const copyToClipboard = (text: string, setCopiedFn: (value: boolean) => void) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedFn(true);
    setTimeout(() => setCopiedFn(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white flex flex-col items-center justify-center px-4 py-10 space-y-16">
      <section className="w-full max-w-2xl bg-gray-900 p-6 rounded-2xl shadow-lg space-y-6">
        <motion.h2
          className="text-3xl font-bold text-cyan-400 mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🔐 Hash Normal (SHA)
        </motion.h2>

        <div className="flex flex-col md:flex-row items-stretch gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite uma frase ou palavra"
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="px-3 py-3 rounded-lg bg-gray-800 text-white border border-cyan-500"
          >
            {algorithms.map((algo) => (
              <option key={algo} value={algo}>
                {algo}
              </option>
            ))}
          </select>

          <motion.button
            onClick={handleHash}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-lg transition whitespace-nowrap"
          >
            Gerar Hash
          </motion.button>
        </div>

        {hash && (
          <motion.div
            className="bg-gray-800 p-4 rounded-lg relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-cyan-400 font-semibold mb-1">
              Hash ({algorithm}):
            </p>
            <p className="break-words text-sm text-gray-200">{hash}</p>

            <motion.button
              onClick={() => copyToClipboard(hash, setCopied)}
              whileHover={{ scale: 1.1 }}
              className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-300"
              title="Copiar hash"
            >
              {copied ? (
                <FiCheck className="w-6 h-6 text-green-400" />
              ) : (
                <FiClipboard className="w-6 h-6" />
              )}
            </motion.button>
          </motion.div>
        )}
      </section>

      {/* ---------------- Hash com chave simétrica ---------------- */}

      <section className="w-full max-w-2xl bg-gray-900 p-6 rounded-2xl shadow-lg space-y-6">
        <motion.h2
          className="text-3xl font-bold text-cyan-400 mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🔑 Hash com Chave Simétrica (HMAC)
        </motion.h2>

        <input
          type="text"
          value={inputSym}
          onChange={(e) => setInputSym(e.target.value)}
          placeholder="Digite uma frase ou palavra"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          type="text"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="Digite a chave secreta"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <motion.button
          onClick={handleHashSym}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loadingSym}
          className={`w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loadingSym ? 'Gerando...' : 'Gerar Hash com Chave'}
        </motion.button>

        {errorSym && (
          <p className="text-red-500 text-center font-semibold">{errorSym}</p>
        )}

        {hashSym && (
          <motion.div
            className="bg-gray-800 p-4 rounded-lg relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-cyan-400 font-semibold mb-1">
              Hash (HMAC SHA-256):
            </p>
            <p className="break-words text-sm text-gray-200">{hashSym}</p>

            <motion.button
              onClick={() => copyToClipboard(hashSym, setCopiedSym)}
              whileHover={{ scale: 1.1 }}
              className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-300"
              title="Copiar hash"
            >
              {copiedSym ? (
                <FiCheck className="w-6 h-6 text-green-400" />
              ) : (
                <FiClipboard className="w-6 h-6" />
              )}
            </motion.button>
          </motion.div>
        )}
      </section>
    </main>
  );
}

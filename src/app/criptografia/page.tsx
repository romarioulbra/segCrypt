// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function Home() {
//   const [publicKey, setPublicKey] = useState('');
//   const [privateKey, setPrivateKey] = useState('');
//   const [message, setMessage] = useState('');
//   const [encrypted, setEncrypted] = useState('');
//   const [decrypted, setDecrypted] = useState('');
//   const [encryptedKey, setEncryptedKey] = useState('');
//   const [iv, setIv] = useState('');

//   const [activeTab, setActiveTab] = useState<'keys' | 'encrypt' | 'decrypt'>('keys');

//   const generateKeys = async () => {
//     const res = await fetch('/api/generate');
//     const data = await res.json();
//     setPublicKey(data.publicKey);
//     setPrivateKey(data.privateKey);
//     setEncrypted('');
//     setDecrypted('');
//     setMessage('');
//   };

//   const encryptMessage = async () => {
//     const res = await fetch('/api/encrypt', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ publicKey, message }),
//     });
//     const data = await res.json();
//     setEncryptedKey(data.encryptedKey);
//     setIv(data.iv);
//     setEncrypted(data.ciphertext);
//   };

//   const decryptMessage = async () => {
//     const res = await fetch('/api/decrypt', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ privateKey, encryptedKey, iv, ciphertext: encrypted }),
//     });
//     const data = await res.json();
//     setDecrypted(data.decrypted);
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden"
//       >
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
//           <motion.h1
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-3xl font-bold text-white"
//           >
//             <span className="inline-block mr-2">🔐</span>
//             Criptografia RSA + 3DES
//           </motion.h1>
//           <p className="text-blue-100 mt-2">Demonstração de criptografia híbrida com Next.js</p>
//         </div>

//         {/* Menu de Abas */}
//         <div className="flex justify-center bg-gray-100 border-b">
//           {[
//             { id: 'keys', label: '🔑 Gerar Chaves' },
//             { id: 'encrypt', label: '🛡️ Criptografar' },
//             { id: 'decrypt', label: '🔓 Descriptografar' },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id as any)}
//               className={`px-6 py-3 text-sm font-medium border-b-2 transition ${
//                 activeTab === tab.id
//                   ? 'border-blue-600 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-blue-600'
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Conteúdo */}
//         <div className="p-6 space-y-8">
//           <AnimatePresence mode="wait">
//             {activeTab === 'keys' && (
//               <motion.section
//                 key="keys"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 className="space-y-4"
//               >
//                 <h2 className="text-xl font-semibold text-gray-800">Geração de Chaves</h2>
//                 <button
//                   onClick={generateKeys}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
//                 >
//                   Gerar Par de Chaves
//                 </button>

//                 <div className="grid md:grid-cols-2 gap-6 mt-4">
//                   <textarea
//                     value={publicKey}
//                     readOnly
//                     rows={6}
//                     className="w-full p-3 bg-gray-50 text-gray-700 font-mono text-sm resize-none"
//                     placeholder="Chave pública..."
//                   />
//                   <textarea
//                     value={privateKey}
//                     readOnly
//                     rows={6}
//                     className="w-full p-3 bg-gray-50 text-gray-700 font-mono text-sm resize-none"
//                     placeholder="Chave privada..."
//                   />
//                 </div>
//               </motion.section>
//             )}

//             {activeTab === 'encrypt' && (
//               <motion.section
//                 key="encrypt"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 className="space-y-4"
//               >
//                 <h2 className="text-xl font-semibold text-gray-800">Criptografar Mensagem</h2>
//                 <input
//                   type="text"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder="Digite a mensagem..."
//                   className="w-full border border-gray-300 p-3 rounded-lg"
//                 />
//                 <button
//                   onClick={encryptMessage}
//                   disabled={!publicKey || !message}
//                   className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
//                 >
//                   Criptografar
//                 </button>

//                 {encrypted && (
//                   <div className="space-y-3">
//                     <textarea value={encryptedKey} readOnly rows={3} className="w-full p-3 bg-gray-50" />
//                     <textarea value={iv} readOnly rows={1} className="w-full p-3 bg-gray-50" />
//                     <textarea value={encrypted} readOnly rows={4} className="w-full p-3 bg-gray-50" />
//                   </div>
//                 )}
//               </motion.section>
//             )}

//             {activeTab === 'decrypt' && (
//               <motion.section
//                 key="decrypt"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 className="space-y-4"
//               >
//                 <h2 className="text-xl font-semibold text-gray-800">Descriptografar</h2>
//                 <button
//                   onClick={decryptMessage}
//                   disabled={!encrypted}
//                   className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
//                 >
//                   Descriptografar Mensagem
//                 </button>

//                 {decrypted && (
//                   <textarea value={decrypted} readOnly rows={3} className="w-full p-3 bg-green-50" />
//                 )}
//               </motion.section>
//             )}
//           </AnimatePresence>
//         </div>
//       </motion.div>
//     </main>
//   );
// }

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [message, setMessage] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [encryptedBytes, setEncryptedBytes] = useState<number[]>([]);
  const [decrypted, setDecrypted] = useState('');
  const [encryptedKey, setEncryptedKey] = useState('');
  const [iv, setIv] = useState('');

  const [activeTab, setActiveTab] = useState<'keys' | 'encrypt' | 'decrypt'>('keys');

  const generateKeys = async () => {
    const res = await fetch('/api/generate');
    const data = await res.json();
    setPublicKey(data.publicKey);
    setPrivateKey(data.privateKey);
    setEncrypted('');
    setDecrypted('');
    setMessage('');
    setEncryptedBytes([]);
  };

  const encryptMessage = async () => {
    const res = await fetch('/api/encrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicKey, message }),
    });
    const data = await res.json();
    setEncryptedKey(data.encryptedKey);
    setIv(data.iv);
    setEncrypted(data.encrypted || data.ciphertext); // compatibilidade
    setEncryptedBytes(data.encryptedBytes || []);
  };

  const decryptMessage = async () => {
    const res = await fetch('/api/decrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ privateKey, encryptedKey, iv, ciphertext: encrypted }),
    });
    const data = await res.json();
    setDecrypted(data.decrypted);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white"
          >
            <span className="inline-block mr-2">🔐</span>
            Criptografia RSA + 3DES
          </motion.h1>
          <p className="text-blue-100 mt-2">Demonstração de criptografia híbrida com Next.js</p>
        </div>

        {/* Menu de Abas */}
        <div className="flex justify-center bg-gray-100 border-b">
          {[
            { id: 'keys', label: '🔑 Gerar Chaves' },
            { id: 'encrypt', label: '🛡️ Criptografar' },
            { id: 'decrypt', label: '🔓 Descriptografar' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-blue-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-8">
          <AnimatePresence mode="wait">
            {activeTab === 'keys' && (
              <motion.section
                key="keys"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-gray-800">Geração de Chaves</h2>
                <button
                  onClick={generateKeys}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                  Gerar Par de Chaves
                </button>

                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <textarea
                    value={publicKey}
                    readOnly
                    rows={6}
                    className="w-full p-3 bg-gray-50 text-gray-700 font-mono text-sm resize-none"
                    placeholder="Chave pública..."
                  />
                  <textarea
                    value={privateKey}
                    readOnly
                    rows={6}
                    className="w-full p-3 bg-gray-50 text-gray-700 font-mono text-sm resize-none"
                    placeholder="Chave privada..."
                  />
                </div>
              </motion.section>
            )}

            {activeTab === 'encrypt' && (
              <motion.section
                key="encrypt"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-gray-800">Criptografar Mensagem</h2>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite a mensagem..."
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
                <button
                  onClick={encryptMessage}
                  disabled={!publicKey || !message}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
                >
                  Criptografar
                </button>

                {encrypted && (
                  <div className="space-y-3 mt-4">
                    <div>
                      <p className="text-sm font-medium">🔑 Encrypted Key</p>
                      <textarea value={encryptedKey} readOnly rows={3} className="w-full p-3 bg-gray-50" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">🧩 IV</p>
                      <textarea value={iv} readOnly rows={1} className="w-full p-3 bg-gray-50" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">🔒 Ciphertext (Base64)</p>
                      <textarea value={encrypted} readOnly rows={4} className="w-full p-3 bg-gray-50" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">📊 Ciphertext (Bytes)</p>
                      <pre className="w-full p-3 bg-gray-50 text-xs font-mono whitespace-pre-wrap break-words">
                        {JSON.stringify(encryptedBytes, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </motion.section>
            )}

            {activeTab === 'decrypt' && (
              <motion.section
                key="decrypt"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-gray-800">Descriptografar</h2>
                <button
                  onClick={decryptMessage}
                  disabled={!encrypted}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
                >
                  Descriptografar Mensagem
                </button>

                {decrypted && (
                  <textarea value={decrypted} readOnly rows={3} className="w-full p-3 bg-green-50" />
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  );
}

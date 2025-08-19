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
//       body: JSON.stringify({ 
//         privateKey, 
//         encryptedKey, 
//         iv, 
//         ciphertext: encrypted 
//       }),
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

//         {/* Content */}
//         <div className="p-6 space-y-8">
//           {/* Key Generation */}
//           <section className="space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">Geração de Chaves</h2>
//             <div className="flex flex-col sm:flex-row gap-4 items-center">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={generateKeys}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition flex items-center gap-2"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
//                 </svg>
//                 Gerar Par de Chaves
//               </motion.button>
              
//               <div className="text-sm text-gray-500">
//                 {publicKey ? (
//                   <span className="text-green-600 flex items-center gap-1">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     Chaves geradas com sucesso
//                   </span>
//                 ) : (
//                   <span>Nenhuma chave gerada ainda</span>
//                 )}
//               </div>
//             </div>
//           </section>

//           {/* Keys Display */}
//           <motion.section
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="grid md:grid-cols-2 gap-6"
//           >
//             <div className="border rounded-lg overflow-hidden">
//               <div className="bg-blue-50 p-3 border-b flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
//                 </svg>
//                 <h3 className="font-medium text-blue-800">Chave Pública</h3>
//               </div>
//               <textarea
//                 value={publicKey}
//                 readOnly
//                 rows={6}
//                 className="w-full p-3 bg-gray-50 text-gray-700 font-mono text-sm focus:outline-none resize-none"
//                 placeholder="Chave pública aparecerá aqui..."
//               />
//             </div>
            
//             <div className="border rounded-lg overflow-hidden">
//               <div className="bg-blue-50 p-3 border-b flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                 </svg>
//                 <h3 className="font-medium text-blue-800">Chave Privada</h3>
//               </div>
//               <textarea
//                 value={privateKey}
//                 readOnly
//                 rows={6}
//                 className="w-full p-3 bg-gray-50 text-gray-700 font-mono text-sm focus:outline-none resize-none"
//                 placeholder="Chave privada aparecerá aqui..."
//               />
//             </div>
//           </motion.section>

//           {/* Message Input */}
//           <motion.section
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.5 }}
//             className="space-y-4"
//           >
//             <h2 className="text-xl font-semibold text-gray-800">Mensagem</h2>
//             <div className="space-y-3">
//               <div className="flex items-center gap-2 text-gray-600">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                   <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                 </svg>
//                 <span>Digite a mensagem para criptografar</span>
//               </div>
//               <div className="flex flex-col md:flex-row gap-3">
//                 <input
//                   type="text"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder="Sua mensagem secreta..."
//                   className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                 />
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={encryptMessage}
//                   disabled={!publicKey || !message}
//                   className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                   </svg>
//                   Criptografar
//                 </motion.button>
//               </div>
//             </div>
//           </motion.section>

//           {/* Encrypted Data */}
//           <AnimatePresence>
//             {encrypted && (
//               <motion.section
//                 key="encrypted"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 transition={{ duration: 0.4 }}
//                 className="space-y-6"
//               >
//                 <h2 className="text-xl font-semibold text-gray-800">Resultado Criptografado</h2>
                
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="border rounded-lg overflow-hidden">
//                     <div className="bg-purple-50 p-3 border-b flex items-center gap-2">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
//                       </svg>
//                       <h3 className="font-medium text-purple-800">Chave de Sessão Criptografada (RSA)</h3>
//                     </div>
//                     <textarea
//                       value={encryptedKey}
//                       readOnly
//                       rows={3}
//                       className="w-full p-3 bg-gray-50 text-gray-700 font-mono text-sm focus:outline-none resize-none"
//                     />
//                   </div>
                  
//                   <div className="border rounded-lg overflow-hidden">
//                     <div className="bg-purple-50 p-3 border-b flex items-center gap-2">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
//                       </svg>
//                       <h3 className="font-medium text-purple-800">Vetor de Inicialização (IV)</h3>
//                     </div>
//                     <textarea
//                       value={iv}
//                       readOnly
//                       rows={1}
//                       className="w-full p-3 bg-gray-50 text-gray-700 font-mono text-sm focus:outline-none resize-none"
//                     />
//                   </div>
//                 </div>
                
//                 <div className="border rounded-lg overflow-hidden">
//                   <div className="bg-purple-50 p-3 border-b flex items-center gap-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
//                     </svg>
//                     <h3 className="font-medium text-purple-800">Mensagem Criptografada (3DES)</h3>
//                   </div>
//                   <textarea
//                     value={encrypted}
//                     readOnly
//                     rows={4}
//                     className="w-full p-3 bg-gray-50 text-gray-700 font-mono text-sm focus:outline-none resize-none"
//                   />
//                 </div>
                
//                 <div className="flex justify-center">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={decryptMessage}
//                     className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-lg transition flex items-center gap-2"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                     Descriptografar Mensagem
//                   </motion.button>
//                 </div>
//               </motion.section>
//             )}
//           </AnimatePresence>

//           {/* Decrypted Message */}
//           <AnimatePresence>
//             {decrypted && (
//               <motion.section
//                 key="decrypted"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 transition={{ duration: 0.4 }}
//                 className="space-y-4"
//               >
//                 <h2 className="text-xl font-semibold text-gray-800">Resultado Descriptografado</h2>
//                 <div className="border border-green-100 rounded-lg overflow-hidden bg-green-50">
//                   <div className="bg-green-100 p-3 border-b flex items-center gap-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                     <h3 className="font-medium text-green-800">Mensagem Original Recuperada</h3>
//                   </div>
//                   <textarea
//                     value={decrypted}
//                     readOnly
//                     rows={2}
//                     className="w-full p-3 bg-white text-gray-700 focus:outline-none resize-none"
//                   />
//                 </div>
//               </motion.section>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Footer */}
//         <div className="bg-gray-50 p-4 text-center text-sm text-gray-500 border-t">
//           Sistema de criptografia híbrida RSA + 3DES | Next.js
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
    setEncrypted(data.ciphertext);
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
                  <div className="space-y-3">
                    <textarea value={encryptedKey} readOnly rows={3} className="w-full p-3 bg-gray-50" />
                    <textarea value={iv} readOnly rows={1} className="w-full p-3 bg-gray-50" />
                    <textarea value={encrypted} readOnly rows={4} className="w-full p-3 bg-gray-50" />
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

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiShield } from 'react-icons/fi'; // Ícone de segurança

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      {/* Ícone acima do título */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-4 text-cyan-400"
      >
        <FiShield className="w-16 h-16 md:w-20 md:h-20" />
      </motion.div>

      {/* Título principal animado */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-cyan-400 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Segurança de Sistemas
      </motion.h1>

      {/* Subtítulo com delay */}
      <motion.p
        className="mt-4 text-lg md:text-xl text-gray-300 text-center max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Proteja seus dados com criptografia avançada, técnicas de hash e boas práticas de segurança digital.
      </motion.p>

      {/* Botões de navegação */}
      <motion.div
        className="mt-8 flex gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <Link href="/criptografia">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Criptografia
          </motion.button>
        </Link>

        <Link href="/hash">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg border border-cyan-500 transition"
          >
            Hash
          </motion.button>
        </Link>
      </motion.div>

      {/* Efeito decorativo opcional */}
      <motion.div
        className="absolute bottom-10 opacity-20 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        🔐 Sua segurança começa com conhecimento
      </motion.div>
    </main>
  );
}

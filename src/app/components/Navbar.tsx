'use client';

import Link from 'next/link';
import { FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow">
      {/* Logo com ícone e framer-motion */}
      <Link href="/" className="flex items-center gap-2 text-xl font-bold text-cyan-400 group transition">
        <motion.div
          initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <FiLock className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        </motion.div>
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hidden sm:inline"
        >
          Segurança Digital
        </motion.span>
      </Link>

      {/* Links do menu */}
      <div className="space-x-6">
        <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
        <Link href="/criptografia" className="hover:text-cyan-400 transition">Criptografia</Link>
        <Link href="/hash" className="hover:text-cyan-400 transition">Hash</Link>
      </div>
    </nav>
  );
}

// lib/crypto.ts
import {
  generateKeyPairSync,
  publicEncrypt,
  privateDecrypt,
  randomBytes,
  createCipheriv,
  createDecipheriv,
  constants,
} from 'crypto';

/**
 * Geração de par de chaves RSA
 */
export function generateKeyPair() {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });

  return { publicKey, privateKey };
}

/**
 * Criptografia RSA pura (não recomendada para mensagens grandes)
 */
export function encryptWithPublicKey(publicKey: string, message: string) {
  const encrypted = publicEncrypt(publicKey, Buffer.from(message));
  return encrypted.toString('base64');
}

export function decryptWithPrivateKey(privateKey: string, encryptedMessage: string) {
  const decrypted = privateDecrypt(privateKey, Buffer.from(encryptedMessage, 'base64'));
  return decrypted.toString('utf8');
}

/**
 * Funções auxiliares para 3DES
 */
function encrypt3DES(plaintext: string, key: Buffer) {
  const iv = randomBytes(8); // 3DES usa IV de 8 bytes
  const cipher = createCipheriv('des-ede3-cbc', key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  return { iv: iv.toString('base64'), ciphertext: encrypted.toString('base64') };
}

function decrypt3DES(ciphertextB64: string, key: Buffer, ivB64: string) {
  const iv = Buffer.from(ivB64, 'base64');
  const ciphertext = Buffer.from(ciphertextB64, 'base64');
  const decipher = createDecipheriv('des-ede3-cbc', key, iv);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString('utf8');
}

/**
 * Criptografia híbrida RSA + 3DES
 * - Gera chave 3DES
 * - Cifra mensagem com 3DES
 * - Cifra chave 3DES com RSA (publicKey)
 */
export function encryptHybrid3DES(publicKey: string, message: string) {
  const key3DES = randomBytes(24); // 24 bytes = 192 bits
  const { iv, ciphertext } = encrypt3DES(message, key3DES);

  // Criptografa a chave simétrica com RSA (OAEP/SHA-256)
  const encryptedKey = publicEncrypt(
    {
      key: publicKey,
      padding: constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    key3DES
  );

  return {
    encryptedKey: encryptedKey.toString('base64'),
    iv,
    ciphertext,
  };
}

/**
 * Descriptografia híbrida RSA + 3DES
 * - Decifra chave 3DES com RSA (privateKey)
 * - Decifra mensagem com 3DES
 */
export function decryptHybrid3DES(
  privateKey: string,
  encryptedKeyB64: string,
  ivB64: string,
  ciphertextB64: string
) {
  const key3DES = privateDecrypt(
    {
      key: privateKey,
      padding: constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(encryptedKeyB64, 'base64')
  );

  return decrypt3DES(ciphertextB64, key3DES, ivB64);
}

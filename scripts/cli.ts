// // scripts/cli.ts
// import readline from 'readline';
// import { generateKeyPair, encryptHybrid3DES, decryptHybrid3DES } from '../lib/crypto';

// let publicKey = '';
// let privateKey = '';
// let encryptedKey = '';
// let iv = '';
// let ciphertext = '';
// let originalMessage = '';
// let decryptedMessage = '';

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// function menu() {
//   console.clear();
//   console.log('🔐 Menu de Criptografia Híbrida (RSA + 3DES)');
//   console.log('-------------------------------------------');
//   console.log('1. Gerar novas chaves');
//   console.log('2. Encriptar mensagem');
//   console.log('3. Decriptar mensagem');
//   console.log('4. Exibir estado atual');
//   console.log('0. Sair');
//   rl.question('\nEscolha uma opção: ', handleMenu);
// }

// function handleMenu(option: string) {
//   switch (option) {
//     case '1':
//       const keys = generateKeyPair();
//       publicKey = keys.publicKey;
//       privateKey = keys.privateKey;
//       console.log('\n✅ Chaves geradas com sucesso!\n');
//       break;
//     case '2':
//       if (!publicKey) {
//         console.log('\n⚠️ Gere as chaves primeiro (opção 1).\n');
//         return waitAndMenu();
//       }
//       rl.question('Digite a mensagem para criptografar: ', (msg) => {
//         originalMessage = msg;
//         const result = encryptHybrid3DES(publicKey, msg);
//         encryptedKey = result.encryptedKey;
//         iv = result.iv;
//         ciphertext = result.ciphertext; // <- CORREÇÃO AQUI
//         console.log('\n✅ Mensagem criptografada com sucesso!\n');
//         waitAndMenu();
//       });
//       return;
//     case '3':
//       if (!privateKey || !ciphertext || !encryptedKey || !iv) {
//         console.log('\n⚠️ Dados insuficientes para descriptografar.\n');
//         return waitAndMenu();
//       }
//       try {
//         decryptedMessage = decryptHybrid3DES(privateKey, encryptedKey, iv, ciphertext);
//         console.log(`\n🔓 Mensagem descriptografada: "${decryptedMessage}"\n`);
//       } catch (e) {
//         console.log('\n❌ Erro ao descriptografar.\n');
//       }
//       break;
//     case '4':
//       printState();
//       break;
//     case '0':
//       rl.close();
//       return;
//     default:
//       console.log('\n❌ Opção inválida.\n');
//   }

//   waitAndMenu();
// }

// function waitAndMenu() {
//   rl.question('\nPressione Enter para continuar...', () => menu());
// }

// function printState() {
//   console.log('\n📦 Estado atual:');
//   console.log('- Chave Pública:', publicKey ? '✅' : '❌');
//   console.log('- Chave Privada:', privateKey ? '✅' : '❌');
//   console.log('- Mensagem Original:', originalMessage || 'N/A');
//   console.log('- Ciphertext (base64):', ciphertext || 'N/A');
//   console.log('- Encrypted Key:', encryptedKey || 'N/A');
//   console.log('- IV:', iv || 'N/A');
//   console.log('- Mensagem Descriptografada:', decryptedMessage || 'N/A');
// }
// menu();


const readline = require('readline');
const {
  generateKeyPair,
  encryptHybrid3DES,
  decryptHybrid3DES,
} = require('../lib/crypto');

let publicKey = '';
let privateKey = '';
let encryptedKey = '';
let iv = '';
let ciphertext = '';
let originalMessage = '';
let decryptedMessage = '';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu() {
  console.clear();
  console.log('🔐 Menu de Criptografia Híbrida (RSA + 3DES)');
  console.log('-------------------------------------------');
  console.log('1. Gerar novas chaves');
  console.log('2. Encriptar mensagem');
  console.log('3. Decriptar mensagem');
  console.log('4. Exibir estado atual');
  console.log('0. Sair');
  rl.question('\nEscolha uma opção: ', handleMenu);
}

function handleMenu(option) {
  switch (option) {
    case '1':
      const keys = generateKeyPair();
      publicKey = keys.publicKey;
      privateKey = keys.privateKey;
      console.log('\n✅ Chaves geradas com sucesso!\n');
      break;
    case '2':
      if (!publicKey) {
        console.log('\n⚠️ Gere as chaves primeiro (opção 1).\n');
        return waitAndMenu();
      }
      rl.question('Digite a mensagem para criptografar: ', (msg) => {
        originalMessage = msg;
        const result = encryptHybrid3DES(publicKey, msg);
        encryptedKey = result.encryptedKey;
        iv = result.iv;
        ciphertext = result.ciphertext;
        console.log('\n✅ Mensagem criptografada com sucesso!\n');
        waitAndMenu();
      });
      return;
    case '3':
      if (!privateKey || !ciphertext || !encryptedKey || !iv) {
        console.log('\n⚠️ Dados insuficientes para descriptografar.\n');
        return waitAndMenu();
      }
      try {
        decryptedMessage = decryptHybrid3DES(privateKey, encryptedKey, iv, ciphertext);
        console.log(`\n🔓 Mensagem descriptografada: "${decryptedMessage}"\n`);
      } catch (e) {
        console.log('\n❌ Erro ao descriptografar.\n');
      }
      break;
    case '4':
      printState();
      break;
    case '0':
      rl.close();
      return;
    default:
      console.log('\n❌ Opção inválida.\n');
  }

  waitAndMenu();
}

function waitAndMenu() {
  rl.question('\nPressione Enter para continuar...', () => menu());
}

function printState() {
  console.log('\n📦 Estado atual:');
  console.log('- Chave Pública:', publicKey ? '✅' : '❌');
  console.log('- Chave Privada:', privateKey ? '✅' : '❌');
  console.log('- Mensagem Original:', originalMessage || 'N/A');
  console.log('- Ciphertext (base64):', ciphertext || 'N/A');
  console.log('- Encrypted Key:', encryptedKey || 'N/A');
  console.log('- IV:', iv || 'N/A');
  console.log('- Mensagem Descriptografada:', decryptedMessage || 'N/A');
}

menu();

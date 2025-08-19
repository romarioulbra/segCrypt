import { NextRequest, NextResponse } from 'next/server';
import { decryptHybrid3DES  } from '../../../../lib/crypto';


export async function POST(req: NextRequest) {
  try {
    const { privateKey, encryptedKey, iv, ciphertext } = await req.json();
    
    if (!privateKey || !encryptedKey || !iv || !ciphertext) {
      return NextResponse.json(
        { error: 'All parameters are required' },
        { status: 400 }
      );
    }

    const decrypted = decryptHybrid3DES(privateKey, encryptedKey, iv, ciphertext);
    return NextResponse.json({ decrypted });
  } catch (error) {
    return NextResponse.json(
      { error: 'Decryption failed', details: error.message },
      { status: 500 }
    );
  }
}
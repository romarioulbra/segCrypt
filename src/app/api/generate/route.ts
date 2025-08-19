import { NextResponse } from 'next/server';
import { generateKeyPair } from '../../../../lib/crypto';


export async function GET() {
  const { publicKey, privateKey } = generateKeyPair();
  return NextResponse.json({ publicKey, privateKey });
}

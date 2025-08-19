// app/api/hash/route.ts

import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  const { text, key } = await req.json();

  // Se não passar chave, faz hash normal
  if (!key) {
    const hash = crypto.createHash('sha256').update(text).digest('hex');
    return NextResponse.json({ hash });
  }

  // Caso chave seja passada, faz hash HMAC com a chave simétrica
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(text);
  const hash = hmac.digest('hex');

  return NextResponse.json({ hash });
}

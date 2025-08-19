// import { NextRequest, NextResponse } from 'next/server';
// import { encryptWithPublicKey,encryptHybrid3DES } from '../../../../lib/crypto';

// export async function POST(req: NextRequest) {
//   try {
//     const { publicKey, message } = await req.json();
    
//     if (!publicKey || !message) {
//       return NextResponse.json(
//         { error: 'Public key and message are required' },
//         { status: 400 }
//       );
//     }

//     const encryptedData = encryptHybrid3DES(publicKey, message);
//     return NextResponse.json(encryptedData);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Encryption failed', details: error.message },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import { encryptHybrid3DES } from '../../../../lib/crypto';

export async function POST(req: NextRequest) {
  try {
    const { publicKey, message } = await req.json();
    
    if (!publicKey || !message) {
      return NextResponse.json(
        { error: 'Public key and message are required' },
        { status: 400 }
      );
    }

    const encryptedData = encryptHybrid3DES(publicKey, message);

    const ciphertextBase64 = encryptedData.encrypted || encryptedData.ciphertext || "";

    // supondo que encryptedData.encrypted esteja em Base64
    let encryptedBytes: number[] = [];
    if (ciphertextBase64) {
      const buffer = Buffer.from(ciphertextBase64, "base64");
      encryptedBytes = Array.from(buffer.values());
    }

    return NextResponse.json({
      ...encryptedData,
      encryptedBytes
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Encryption failed', details: error.message },
      { status: 500 }
    );
  }
}

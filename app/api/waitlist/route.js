export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getApps as getAdminApps, initializeApp as initAdminApp, cert } from 'firebase-admin/app';

function getAdminDb() {
  const appName = 'waitlist-worker';
  const apps = getAdminApps();
  let app = apps.find((a) => a.name === appName);

  if (!app) {
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || '';

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error(
        `Missing Firebase Admin env vars — projectId:${!!projectId} clientEmail:${!!clientEmail} privateKey:${!!privateKey}`
      );
    }

    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.substring(1, privateKey.length - 1);
    }
    privateKey = privateKey.replace(/\\n/g, '\n');

    app = initAdminApp(
      { credential: cert({ projectId, clientEmail, privateKey }) },
      appName
    );
  }

  const { getFirestore } = require('firebase-admin/firestore');
  return getFirestore(app);
}

export async function POST(req) {
  try {
    const { fullName, email, phoneNumber } = await req.json();

    if (!fullName?.trim() || !email?.trim() || !phoneNumber?.trim()) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const db = getAdminDb();
    await db.collection('waitlist').add({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[waitlist] POST error:', err);
    return NextResponse.json({ message: 'Server error. Please try again.' }, { status: 500 });
  }
}

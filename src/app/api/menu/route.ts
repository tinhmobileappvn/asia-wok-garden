import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/authAdmin';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/firebase';

const dataFile = path.join(process.cwd(), 'src/data/menu.json');

export async function GET() {
  try {
    const doc = await db.collection('config').doc('menu').get();
    if (doc.exists) {
      return NextResponse.json(doc.data()?.items || []);
    }
  } catch (error) {
    console.error('Firestore GET error:', error);
  }

  // Fallback to local
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read menu' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const decoded = await verifyAuth(request);
  if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    
    // Save to Firestore
    try {
      await db.collection('config').doc('menu').set({ items: body });
    } catch (dbError) {
      console.error('Firestore POST error:', dbError);
    }

    // Save to local for fallback/dev
    fs.writeFileSync(dataFile, JSON.stringify(body, null, 2));
    
    return NextResponse.json({ success: true, menu: body });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save menu' }, { status: 500 });
  }
}

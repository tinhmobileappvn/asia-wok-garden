import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { storage } from '@/lib/firebase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueName = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');

    // Try Firebase Cloud Storage first
    try {
      const bucket = storage.bucket();
      const fileRef = bucket.file(`uploads/${uniqueName}`);
      await fileRef.save(buffer, {
        metadata: {
          contentType: file.type,
        }
      });
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(`uploads/${uniqueName}`)}?alt=media`;
      return NextResponse.json({ success: true, url: publicUrl });
    } catch (fbError) {
      console.error("Firebase Storage error, falling back to local:", fbError);
    }

    // Local fallback
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, uniqueName);
    fs.writeFileSync(filePath, buffer);
    const url = `/uploads/${uniqueName}`;
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Failed to upload' }, { status: 500 });
  }
}

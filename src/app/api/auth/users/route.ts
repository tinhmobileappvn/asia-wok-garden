import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { getApps } from 'firebase-admin/app';
import '@/lib/firebase'; // Ensure admin is initialized

// Middleware equivalent function to check auth
import { verifyAuth } from '@/lib/authAdmin';

export async function GET(request: Request) {
  const decodedToken = await verifyAuth(request);
  if (!decodedToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const listUsersResult = await getAuth().listUsers(1000);
    const users = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      lastSignInTime: user.metadata.lastSignInTime,
      creationTime: user.metadata.creationTime,
    }));
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const decodedToken = await verifyAuth(request);
  if (!decodedToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { email, password } = await request.json();
    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    const userRecord = await getAuth().createUser({
      email,
      password,
    });
    return NextResponse.json({ success: true, uid: userRecord.uid });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create user' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const decodedToken = await verifyAuth(request);
  if (!decodedToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { uid, password } = await request.json();
    if (!uid || !password || password.length < 6) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    await getAuth().updateUser(uid, {
      password,
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const decodedToken = await verifyAuth(request);
  if (!decodedToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    
    if (!uid) return NextResponse.json({ error: 'Missing UID' }, { status: 400 });
    if (uid === decodedToken.uid) {
      return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });
    }

    await getAuth().deleteUser(uid);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete user' }, { status: 500 });
  }
}

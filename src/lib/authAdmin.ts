import { getAuth } from 'firebase-admin/auth';
import { db } from './firebase'; // Ensure app is initialized

export async function verifyAuth(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Token verification failed", error);
    return null;
  }
}

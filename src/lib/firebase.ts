import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

// Initialize Firebase Admin App
if (getApps().length === 0) {
  try {
    let credential;
    let projectId;
    try {
      const serviceAccount = require('../../firebase-service-account.json');
      credential = cert(serviceAccount);
      projectId = serviceAccount.project_id;
    } catch (e) {
      console.log('No firebase-service-account.json found. Falling back to application default credentials.');
      credential = applicationDefault();
      projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT;
    }

    const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || (projectId ? `${projectId}.firebasestorage.app` : undefined);

    initializeApp({
      credential,
      storageBucket,
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const db = getFirestore();
export const storage = getStorage();

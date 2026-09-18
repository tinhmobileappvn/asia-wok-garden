import { db } from './firebase';
import fs from 'fs';
import path from 'path';

export async function getSettings() {
  try {
    const doc = await db.collection('config').doc('settings').get();
    if (doc.exists) {
      return doc.data();
    }
  } catch (error) {
    console.error('Error fetching settings from Firestore, falling back to local JSON:', error);
  }

  // Fallback to local JSON
  const settingsFile = path.join(process.cwd(), 'src/data/settings.json');
  try {
    return JSON.parse(fs.readFileSync(settingsFile, 'utf8'));
  } catch (e) {
    return {};
  }
}

export async function getMenu() {
  try {
    const doc = await db.collection('config').doc('menu').get();
    if (doc.exists) {
      return doc.data()?.items || [];
    }
  } catch (error) {
    console.error('Error fetching menu from Firestore, falling back to local JSON:', error);
  }

  // Fallback to local JSON
  const menuFile = path.join(process.cwd(), 'src/data/menu.json');
  try {
    return JSON.parse(fs.readFileSync(menuFile, 'utf8'));
  } catch (e) {
    return [];
  }
}

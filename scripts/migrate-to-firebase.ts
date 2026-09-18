const admin = require('firebase-admin');
import fs from 'fs';
import path from 'path';

// Note: To run this script, you must have firebase-service-account.json in the project root.
const serviceAccountPath = path.join(__dirname, '..', 'firebase-service-account.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('ERROR: firebase-service-account.json not found in project root.');
  console.error('Please create it first before running the migration.');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrate() {
  console.log('Starting migration to Firestore...');

  try {
    // 1. Migrate Settings
    const settingsFile = path.join(__dirname, '..', 'src', 'data', 'settings.json');
    if (fs.existsSync(settingsFile)) {
      const settingsData = JSON.parse(fs.readFileSync(settingsFile, 'utf8'));
      await db.collection('config').doc('settings').set(settingsData);
      console.log('✅ Settings migrated successfully.');
    } else {
      console.log('⚠️ settings.json not found, skipping.');
    }

    // 2. Migrate Menu
    const menuFile = path.join(__dirname, '..', 'src', 'data', 'menu.json');
    if (fs.existsSync(menuFile)) {
      const menuData = JSON.parse(fs.readFileSync(menuFile, 'utf8'));
      await db.collection('config').doc('menu').set({ items: menuData });
      console.log('✅ Menu migrated successfully.');
    } else {
      console.log('⚠️ menu.json not found, skipping.');
    }

    console.log('🎉 Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

migrate();

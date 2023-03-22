import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { Backup } from './models/Backup';
import { deleteCronJob } from './cronManager';

let db: Database;

// Initialize the SQLite database
export async function initializeDatabase() {
  db = await open({
    filename: '/data/backups.db',
    driver: sqlite3.Database,
  });
}

// Create the backups table if it doesn't exist
export async function createBackupsTable() {
  await initializeDatabase();
  return db.run(
    `CREATE TABLE IF NOT EXISTS backups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source TEXT,
      destination TEXT,
      frequency TEXT,
      type TEXT
    )`
  );
}

// Insert a new backup
export async function insertBackup(backup: Backup) {
  const { source, destination, frequency, type } = backup;
  const result = await db.run(
    `INSERT INTO backups (source, destination, frequency, type) VALUES (?, ?, ?, ?)`,
    [source, destination, frequency, type]
  );
  return { ...backup, id: result.lastID };
}

// Update an existing backup
export async function updateBackup(backup: Backup) {
  const { id, source, destination, frequency, type } = backup;
  await db.run(
    `UPDATE backups SET source = ?, destination = ?, frequency = ?, type = ? WHERE id = ?`,
    [source, destination, frequency, type, id]
  );
}

// Delete a backup by ID
export async function deleteBackup(id: number) {
  await db.run(`DELETE FROM backups WHERE id = ?`, [id]);
  deleteCronJob(id);
}

// Get the list of all backups
export async function getBackups(): Promise<Backup[]> {
  return db.all<Backup[]>(`SELECT * FROM backups`);
}

const sqlite3 = require('sqlite3');
const { open, Database } = require('sqlite');
const { Backup } = require('./models/Backup');

let db;

// Initialize the SQLite database
async function initializeDatabase() {
  db = await open({
    filename: process.env.NODE_ENV === 'production' ? '/data/backups.db' : ':memory:',
    driver: sqlite3.Database,
  });
}

// Create the backups table if it doesn't exist
async function createBackupsTable() {
  await initializeDatabase();
  await db.run(
    `CREATE TABLE IF NOT EXISTS backups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      source TEXT,
      destination TEXT,
      frequency TEXT,
      selectedDay TINYINT,
      selectedTime TEXT,
      type TEXT,
      lastBackupSuccess BOOLEAN
    )`
  );

  // Insert mock data for the development environment
  if (process.env.NODE_ENV === 'development') {
    const mockData = {
      source: '/mnt/user/rapid_appdata',
      destination: '/mnt/user/Backup',
      frequency: 'daily',
      selectedTime: '23:15',
      type: 'full',
    };

    const backupExists = await db.get(
      `SELECT 1 FROM backups WHERE source = ? AND destination = ? AND type = ?`,
      [mockData.source, mockData.destination, mockData.type]
    );

    if (!backupExists) {
      await insertBackup(new Backup(mockData));
    }
  }
}

// Insert a new backup
async function insertBackup(backup) {
  const { source, destination, frequency, selectedDay, selectedTime, type } = backup;
  const result = await db.run(
    `INSERT INTO backups (source, destination, frequency, selectedDay, selectedTime, type) VALUES (?, ?, ?, ?, ?, ?)`,
    [source, destination, frequency, selectedDay, selectedTime, type]
  );
  return { ...backup, id: result.lastID };
}

// Update an existing backup
async function updateBackup(backup) {
  const { id, source, destination, frequency, selectedDay, selectedTime, type } = backup;
  await db.run(
    `UPDATE backups SET source = ?, destination = ?, frequency = ?, selectedDay = ?, selectedTime = ?, type = ? WHERE id = ?`,
    [source, destination, frequency, selectedDay, selectedTime, type, id]
  );
}

async function updateLastBackupSuccess(id, success){
  await db.run(
    `UPDATE backups SET lastBackupSuccess = ? WHERE id = ?`,
    [success, id]
  )
}

// Delete a backup by ID
async function deleteBackup(id) {
  await db.run(`DELETE FROM backups WHERE id = ?`, [id]);
}

// Get the list of all backups
async function getBackups() {
  return db.all(`SELECT * FROM backups`);
}

// Get specific backup by id
async function getBackup(id) {
  return db.get(`SELECT * FROM backups WHERE id = ?`, [id]);
}

module.exports = {
  initializeDatabase,
  createBackupsTable,
  insertBackup,
  updateBackup,
  updateLastBackupSuccess,
  deleteBackup,
  getBackups,
  getBackup
};

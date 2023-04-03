const path = require('path');
const express = require('express');
const http = require('http');
const { Server: WebSocketServer } = require('ws');
const { createCronJob, updateCronJob, deleteCronJob, loadCronJobsFromDatabase } = require('./cronManager');
const { searchDirectories } = require('./helpers');
const {
  createBackupsTable,
  insertBackup,
  updateBackup,
  getBackups,
  getBackup,
  deleteBackup,
} = require('./db');
const { Backup } = require('./models/Backup');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(express.static('frontend/dist'));

// CatchAll for Front-end (non-api routes)
app.get(/^(?!\/api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// API routes
app.get('/api/backups', async (req, res) => {
  const backups = await getBackups();
  res.json(backups);
});

app.get('/api/backups/:id', async (req, res) => {
  if(!req.params.id || req.params.id === ''){
    res.status(500).json({error: 400, message: 'Missing Backup ID'});
  }
  const backup = await getBackup(req.params.id);
  res.json(backup);
});

app.post('/api/backups', async (req, res) => {
  const backup = new Backup(req.body);
  const result = await insertBackup(backup);
  createCronJob(result);
  res.json(result);
});

app.put('/api/backups/:id', async (req, res) => {
  const backup = new Backup(req.body);
  await updateBackup(backup);
  updateCronJob(backup);
  res.json(backup);
});

app.delete('/api/backups/:id', async (req, res) => {
  const { id } = req.params;
  await deleteBackup(parseInt(id));
  deleteCronJob(id);
  res.sendStatus(204);
});

app.get('/api/directories', async (req, res) => {
  const search = req.query.search || '';
  const directories = await searchDirectories(search);
  res.json(directories);
});

app.post('/api/directory', async (req, res) => {
  const { directory, name } = req.body;

  if (typeof directory !== 'string' || typeof name !== 'string') {
    res.status(400).json({ message: 'Both directory and name parameters must be strings.' });
    return;
  }

  try{
    const newDirectoryPath = await createNewDirectory(directory, name);
    res.status(201).json({ message: 'New directory created.', path: newDirectoryPath });
  }
  catch(error){
    res.status(500).json({ message: 'Failed to create new directory.', error: error.message });
  }
});

// WebSocket handling
wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
      const { action, data } = JSON.parse(message.toString());
  
      if (action === 'createBackup') {
        const backup = new Backup(data);
        const result = await insertBackup(backup);
        ws.send(JSON.stringify({ action: 'backupCreated', data: result }));
      } else if (action === 'updateBackup') {
        const backup = new Backup(data);
        await updateBackup(backup);
        ws.send(JSON.stringify({ action: 'backupUpdated', data: backup }));
      }
    });
});

(async () => {
  // Initialize database
  await createBackupsTable();
  await loadCronJobsFromDatabase();

  // Start the server
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();

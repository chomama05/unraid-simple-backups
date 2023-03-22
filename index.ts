import express from 'express';
import http from 'http';
import { Server as WebSocketServer } from 'ws';
import { createCronJob, updateCronJob } from './cronManager';
import {
  createBackupsTable,
  insertBackup,
  updateBackup,
  getBackups,
  deleteBackup,
} from './db';
import { Backup } from './models/Backup';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(express.static('public'));

// Express routes
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
  res.sendStatus(204);
});

app.get('/api/backups', async (req, res) => {
  const backups = await getBackups();
  res.json(backups);
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

  // Start the server
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();

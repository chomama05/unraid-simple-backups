const { CronJob } = require('cron');
const { exec } = require('child_process');
const { Backup } = require('./models/Backup');
const { getBackups } = require('./db');

const cronJobs = new Map();

function generateCronPattern(frequency) {
  switch (frequency) {
    case 'daily':
      return '0 0 * * *';
    case 'weekly':
      return '0 0 * * 0';
    case 'monthly':
      return '0 0 1 * *';
    default:
      throw new Error('Invalid frequency');
  }
}

function executeBackup(backup) {
    const { id, source, destination, type } = backup;
    const command = `./backup.sh ${id} "${source}" "${destination}" "${type}"`;
  
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing backup ${id}:`, error);
        return;
      }
      console.log(`Backup ${id} executed successfully`);
    });
}

function createCronJob(backup) {
  const cronPattern = generateCronPattern(backup.frequency);
  const cronJob = new CronJob(cronPattern, () => {
    console.log(`Running backup ${backup.id}`);
    executeBackup(backup);
  });

  cronJobs.set(backup.id, cronJob);
  cronJob.start();
}

function updateCronJob(backup) {
  const existingCronJob = cronJobs.get(backup.id);
  if (existingCronJob) {
    existingCronJob.stop();
    cronJobs.delete(backup.id);
  }

  createCronJob(backup);
}

function deleteCronJob(backupId) {
  const existingCronJob = cronJobs.get(backupId);
  if (existingCronJob) {
    existingCronJob.stop();
    cronJobs.delete(backupId);
  }
}

async function loadCronJobsFromDatabase() {
    try {
      const backups = await getBackups();
      backups.forEach((backup) => createCronJob(backup));
      console.log('Cron jobs loaded from the database');
    } catch (error) {
      console.error('Error loading cron jobs from the database:', error);
    }
}
  
// loadCronJobsFromDatabase();

module.exports = {
  createCronJob,
  updateCronJob,
  deleteCronJob,
  loadCronJobsFromDatabase
};

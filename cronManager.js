const { CronJob } = require('cron');
const { exec } = require('child_process');
const { Backup } = require('./models/Backup');
const { getBackups } = require('./db');
const { getCurrentTimestamp } = require('./helpers');

const cronJobs = new Map();

function generateCronPattern({frequency, selectedTime, selectedDay}) {
  const [hour, minutes] = selectedTime.split(':');
  // const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  switch (frequency) {
    case 'daily':
      return `0 ${minutes} ${hour} * * *`;
    case 'weekly':
      return `0 ${minutes} ${hour} * * ${selectedDay}`;
    case 'monthly':
      return `0	${minutes} ${hour} ${selectedDay} * *`;
    default:
      throw new Error('Invalid frequency');
  }
}

function executeBackup(backup) {
    const { id, source, destination, type } = backup;
    const command = `./backup.sh ${id} "${source}" "${destination}" "${type}" "${process.env.NODE_ENV}"`;

    console.log(`${getCurrentTimestamp()} - Executing Command:`);
    console.log(command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`${getCurrentTimestamp()} - Error executing backup id=${id}:`, error);
        return;
      }
      console.log(`${getCurrentTimestamp()} - Backup id=${id} executed successfully`);
    });
}

function createCronJob(backup) {
  const cronPattern = generateCronPattern(backup);
  const cronJob = new CronJob(cronPattern, () => {
    console.log(`${getCurrentTimestamp()} - Running ${backup.type} backup with ID: ${backup.id}`);
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
      console.log(`${getCurrentTimestamp()} - ${backups.length} Cron jobs loaded from the database`);
    } catch (error) {
      console.error(`${getCurrentTimestamp()} - Error loading cron jobs from the database:`, error);
    }
}

module.exports = {
  createCronJob,
  updateCronJob,
  deleteCronJob,
  loadCronJobsFromDatabase
};

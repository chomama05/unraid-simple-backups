// const { CronJob } = require('cron');
const cron = require('node-cron');
const { spawn } = require("child_process");
const { Backup } = require('./models/Backup');
const { getBackups, updateLastBackupSuccess } = require('./db');
const { getCurrentTimestamp } = require('./helpers');

const cronJobs = new Map();

function generateCronPattern({ frequency, selectedTime, selectedDay }) {
  const [hour, minutes] = selectedTime.split(':');
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  switch (frequency) {
    case 'daily':
      return `0 ${minutes} ${hour} * * *`;
    case 'weekly':
      return `0 ${minutes} ${hour} * * ${weekDays[selectedDay - 1]}`;
    case 'monthly':
      return `0	${minutes} ${hour} ${selectedDay} * *`;
    default:
      throw new Error('Invalid frequency');
  }
}

async function executeBackup(backup) {
  const { id, source, destination, type } = backup;
  const args = [id, source, destination, type, process.env.NODE_ENV];
  const command = "./backup.sh";

  console.log(`${getCurrentTimestamp()} - Executing Command:`);
  console.log(`${command} ${args.join(" ")}`);

  await updateLastBackupSuccess(id, false);
  const backupProcess = spawn(command, args);

  backupProcess.stdout.on("data", (data) => {
    console.log(`${getCurrentTimestamp()} - stdout: ${data}`);
  });

  backupProcess.stderr.on("data", (data) => {
    console.error(`${getCurrentTimestamp()} - stderr: ${data}`);
  });

  backupProcess.on("error", async (error) => {
    console.error(`${getCurrentTimestamp()} - Error executing backup id=${id}:`, error);
  });

  backupProcess.on("close", async (code) => {
    if (code === 0) {
      await updateLastBackupSuccess(id, true);
      console.log(`${getCurrentTimestamp()} - Backup id (${id}) executed successfully`);
    } else {
      console.error(`${getCurrentTimestamp()} - Backup id (${id}) failed with exit code ${code}`);
    }
  });
}

function createCronJob(backup) {
  const cronPattern = generateCronPattern(backup);
  const cronJob = cron.schedule(cronPattern, () => {
    console.log(`${getCurrentTimestamp()} - Running ${backup.type} backup with ID: ${backup.id}`);
    executeBackup(backup);
  });

  cronJobs.set(backup.id, cronJob);
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
    console.log(`${getCurrentTimestamp()} - ${backups.length} Cron job${backups.length > 1 ? 's' : ''} loaded from the database`);
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

import { CronJob } from 'cron';
import { exec } from 'child_process';
import { Backup } from './models/Backup';
import { getBackups } from './db';

const cronJobs: Map<number, CronJob> = new Map();

function generateCronPattern(frequency: string) {
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

function executeBackup(backup: Backup) {
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

export function createCronJob(backup: Backup) {
  const cronPattern = generateCronPattern(backup.frequency);
  const cronJob = new CronJob(cronPattern, () => {
    console.log(`Running backup ${backup.id}`);
    executeBackup(backup);
  });

  cronJobs.set(backup.id, cronJob);
  cronJob.start();
}

export function updateCronJob(backup: Backup) {
  const existingCronJob = cronJobs.get(backup.id);
  if (existingCronJob) {
    existingCronJob.stop();
    cronJobs.delete(backup.id);
  }

  createCronJob(backup);
}

export function deleteCronJob(backupId: number) {
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
  
loadCronJobsFromDatabase();
const fs = require('fs').promises;
const path = require('path');
const { DateTime } = require('luxon');

const logsDirectory = '/data/logs';
const concurrencyLimit = 10;

async function processBackupIds(backupIds) {
	const logs = [];
	const queue = [];

	for (const backupId of backupIds) {
		const promise = getBackupLogs(backupId).then((backupLogs) => {
			logs.push(backupLogs);
		});

		queue.push(promise);

		if (queue.length >= concurrencyLimit) {
			await Promise.race(queue).then((completed) => {
				queue.splice(queue.indexOf(completed), 1);
			});
		}
	}

	await Promise.all(queue);
	return logs;
}

async function getBackupLogs(backupId) {
	try {
		const backupLogsPath = path.join(logsDirectory, backupId);
		const logFiles = await fs.readdir(backupLogsPath);
		const parsedLogFiles = await Promise.all(
			logFiles.map(async (logFile) => {
				const logFilePath = path.join(backupLogsPath, logFile);
				const { mtime } = await fs.stat(logFilePath);
				const timestamp = DateTime.fromJSDate(mtime).toFormat('yyyy-MM-dd_HH:mm:ss');
				return { location: logFile, date: timestamp };
			})
		);
		return { id: parseInt(backupId), logFiles: parsedLogFiles };
	} catch (error) {
		throw new Error('Error getting logs for backupId');
	}
}

async function getLogs() {
	try {
		const backupIds = await fs.readdir(logsDirectory);
		const logs = await processBackupIds(backupIds);
		return logs;
	} catch (error) {
		throw new Error('Error getting logs');
	}
}

async function getLogData(backupId, logFileLocation) {
	try {
		const logFilePath = path.join(logsDirectory, backupId, logFileLocation);
		const logData = await fs.readFile(logFilePath, 'utf8');
		return logData;
	} catch (error) {
		console.error(error);
		throw new Error('getLogData() Failed - Error getting log data');
	}
}

module.exports = {
	getLogs,
	getLogData,
};
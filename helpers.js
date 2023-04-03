const fs = require('fs').promises;
const path = require('path');

exports.searchDirectories = async (search) => {
	const basePath = search.startsWith('/mnt') ? '' : '/mnt';
	const fullPath = path.join(basePath, search);

	try {
		const files = await fs.readdir(fullPath, { withFileTypes: true });

		const directories = files
			.filter(file => file.isDirectory())
			.map(file => ({ value: path.join(fullPath, file.name), text: file.name }));

		return directories;
	} catch (error) {
		if(error.code === 'ENOENT'){
			return [];
		}
		console.error(error);
		throw new Error('Failed to read directory');
	}
};

exports.createNewDirectory = async (directory, name) => {
	const newDirectoryPath = path.join(directory, name);
  
	try {
	  await fs.mkdir(newDirectoryPath, { recursive: true });
	  return newDirectoryPath;
	} catch (error) {
	  throw error;
	}
  }

exports.getCurrentTimestamp = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');

	return `${year}-${month}-${day}@${hours}_${minutes}_${seconds}`;
}
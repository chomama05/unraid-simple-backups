import { defineStore } from 'pinia';
import axios from 'axios';

const devMockData = [
  {id: 1, name: 'Cummulative Backup of Secondary AppData', source: '/mnt/user/rapid_appdata', destination: '/mnt/user/Backup/rapid_appdata', frequency: 'daily', selectedTime: "23:04", type: 'cummulative', lastBackupSuccess: 1},
  {id: 2, name: 'My full backup for important files', source: '/mnt/user/nextcloud', destination: '/mnt/user/Backup/nextcloud_files', frequency: 'weekly', selectedTime: "22:00", selectedDay: 5, type: 'full', lastBackupSuccess: 0},
  {id: 3, name: 'WIP need to configure...', source: '/mnt/user', destination: '/mnt/user/Backup', frequency: 'monthly', selectedTime: "23:30", selectedDay: 24, type: 'full'},
]

export const useBackupsStore = defineStore('backups', {
  state: () => ({
    backups: [],
    loading: false,
  }),
  actions: {
    async fetchBackups() {
      this.loading = true;
      try {
        if(import.meta.env.MODE === 'development'){
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.backups = devMockData;
                    return resolve();
                }, 1000) 
            });   
        }
        else{
          const response = await axios.get('/api/backups');
          this.backups = response.data;
        }
      } catch (error) {
        console.error('Error fetching backups:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    getLocalBackup(id){
      const backup = this.backups.find(item => item.id == id);
      return backup;
    },

    async getBackup(id){
      this.loading = true;
      try{
        if(import.meta.env.MODE === 'development'){
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  this.loading = false;
                  return resolve(devMockData[0]);
              }, 1000) 
          });   
        }

        const response = await axios.get(`/api/backups/${id}`);
        return response.data;
      }
      catch(error) {
        console.error(`Error fetching backup (${id}):`, error);
        throw error;
      }
      finally{
        this.loading = false;
      }
    },

    async createBackup(backup) {
      try {
        await axios.post('/api/backups', backup);
        await this.fetchBackups();
      } catch (error) {
        console.error('Error creating backup configuration:', error);
        throw error;
      }
    },

    async updateBackup(id, backup) {
      try {
        await axios.put(`/api/backups/${id}`, backup);
        await this.fetchBackups();
      } catch (error) {
        console.error('Error updating backup configuration:', error);
        throw error;
      }
    },

    async deleteBackup(id) {
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     return resolve();
      //   }, 5000)
      // })
      try {
        await axios.delete(`/api/backups/${id}`);
        await this.fetchBackups();
      } catch (error) {
        console.error(`Error deleting backup id:${id}: `, error);
        throw error;
      }
    },
  },
});

import { defineStore } from 'pinia';
import axios from 'axios';

const devLogsMockData = [
  {id: 1, logFiles: [{location: 'full_backup_id-1_2023-03-24_21:02:00.log', date: '2023-03-24_21:02:00'}, {location: 'full_backup_id-1_2023-03-24_21:10:00.log', date: '2023-03-24_21:10:00'}]},
  {id: 2, logFiles: [{location: 'full_backup_id-2_2023-03-22_21:02:00.log', date: '2023-03-22_21:02:00'}]},
  {id: 3, logFiles: []},
  {id: 4, logFiles: [{location: 'full_backup_id-1_2023-04-01_21:02:00.log', date: '2023-04-01_21:02:00'}, {location: 'full_backup_id-1_2023-04-02_21:10:00.log', date: '2023-04-02_21:10:00'}]},
];

const devLogMockData = `
2023-04-04_09:32:00 - Starting full Backup
./
./G0010242-5fps.avi
./Battlefield 2042 2021.12.16 - 12.56.08.02.DVR.mp4
2023-04-04_09:32:41 - full Backup completed in .66 minutes
`;

export const useLogStore = defineStore('logs', {
  state: () => ({
    logs: [],
    loading: false,
  }),
  actions: {
    async fetchLogs() {
      this.loading = true;
      try {
        if(import.meta.env.MODE === 'development'){
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.logs = devLogsMockData;
                    return resolve();
                }, 1000) 
            });   
        }
        else{
          const response = await axios.get('/api/logs');
          this.logs = response.data;
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getLogFileContent(logLocation){
      try{
        if(import.meta.env.MODE === 'development'){
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  this.loading = false;
                  return resolve(devLogMockData);
              }, 1000) 
          });   
        }

        const response = await axios.get(`/api/log/${logLocation}`);
        return response.data;
      }
      catch(error) {
        console.error(`Error fetching log at location (${logLocation}):`, error);
        throw error;
      }
    },
  },
});

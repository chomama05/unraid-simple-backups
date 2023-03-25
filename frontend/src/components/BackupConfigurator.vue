<template>
  <div>
    <v-snackbar v-model="snackbar" color="error" top>{{ snackbarMessage }}</v-snackbar>
    <h1>Backup Configurator</h1>
    <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
      <v-text-field 
        v-show="this.form.id"
        :readonly="true"
        v-model="form.id"
        label="Backup ID"
      ></v-text-field>
      
      <v-text-field
        v-model="form.source"
        label="Source"
        :rules="[requiredRule]"
        required
      ></v-text-field>
      <v-text-field
        v-model="form.destination"
        label="Destination"
        :rules="[requiredRule]"
        required
      ></v-text-field>
      <v-select
        v-model="form.frequency"
        :items="frequencies"
        label="Frequency"
        :rules="[requiredRule]"
        @update:model-value="$event => checkIfValid($event)"
        required
      ></v-select>

      <v-select
        v-show="form.frequency !== 'daily' && form.frequency === 'weekly'"
        :disabled="this.form.frequency === 'daily' || this.form.frequency === 'monthly'"
        :items="weekDays"
        item-title="title"
        item-value="value"
        v-model="form.selectedDay"
        label="Day of the week"
        outlined
        :rules="[form.frequency === 'weekly' ? requiredRule : true]"
        required
      ></v-select>

      <v-select
        v-show="form.frequency !== 'daily' && form.frequency === 'monthly'"
        :disabled="this.form.frequency === 'daily' || this.form.frequency === 'weekly'"
        :items="dayOptions"
        v-model="form.selectedDay"
        label="Day of the month"
        outlined
        :rules="[form.frequency === 'monthly' ? requiredRule : true]"
        required
      ></v-select>

      <VueDatePicker time-picker v-model="time" :is-24="false" />

      <v-select
        v-model="form.type"
        :items="backupTypes"
        label="Backup Type"
        :rules="[requiredRule]"
        required
      ></v-select>
      <v-btn type="submit" :disabled="!valid" color="primary">{{ this.form.id ? 'Update' : 'Create' }}</v-btn>
    </v-form>

    <v-table density="compact">
      <thead>
        <tr>
          <th class="text-left" v-for="header in headers">
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="backup in backups"
          :key="backup.id"
        >
          <td>{{ backup.source }}</td>
          <td>{{ backup.destination }}</td>
          <td>{{ backup.frequency }}</td>
          <td>{{ backup.selectedTime }}</td>
          <td>{{ backup.type }}</td>
          <td>
            <v-btn small color="primary" @click="editItem(backup)">Edit</v-btn>
            <v-btn small color="error" @click="deleteItem(backup)">Delete</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BackupConfigurator',
  data() {
    return {
      snackbar: false,
      valid: true,
      time: { hours: 6, minutes: 30},
      weekDays: [{title: 'Monday',value: 1},{title: 'Tuesday',value: 2},{title: 'Wednesday',value: 3},{title: 'Thursday',value: 4},{title: 'Friday',value: 5},{title: 'Saturday',value: 6},{title: 'Sunday',value: 7},],
      dayOptions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],
      form: {
        source: '',
        destination: '',
        frequency: 'daily',
        type: 'full',
        selectedDay: null,
        selectedTime: "18:30",
      },
      frequencies: ['daily', 'weekly', 'monthly'],
      backupTypes: ['full', 'cumulative'],
      requiredRule: (value) => !!value || 'This field is required.',
      headers: [
        { text: 'Source', value: 'source' },
        { text: 'Destination', value: 'destination' },
        { text: 'Frequency', value: 'frequency' },
        { text: 'Time', value: 'selectedTime' },
        { text: 'Type', value: 'type' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      backups: [],
      loading: false,
      socket: null,
    };
  },
  methods: {
    showError(error) {
      this.snackbarMessage = `An error occurred: ${error.toString()}`;
      this.snackbar = true;
    },
    checkIfValid(event){
      console.log('updated');
      console.log('event', event);
      if(this.form.frequency !== 'daily'){
        this.$refs.form.validate();
      }
    },
    async submitForm() {
      if (!this.$refs.form.validate()) {
        return;
      }
      // Perform REST call to create or update the backup configuration
      this.loading = true;
      try {
        if (this.form.id) {
          await axios.put(`/api/backups/${this.form.id}`, this.form);
        } else {
          await axios.post('/api/backups', this.form);
        }
        this.$refs.form.reset();
        this.fetchBackups();
      } catch (error) {
        console.error('Error creating or updating backup configuration:', error);
        this.showError(error);
      } finally {
        this.loading = false;
      }
    },
    async fetchBackups() {
      this.loading = true;

      if(import.meta.env.MODE === 'development'){
        // Simulate Loading...
        setTimeout(() => {
          this.backups = [{id: 1, source: '/mnt/user/rapid_appdata', destination: '/mnt/user/Backup', frequency: 'daily', selectedTime: "23:00", type: 'full'}];
          this.loading = false;
          return;
        }, 1000);
      }
      else{
        try {
        const response = await axios.get('/api/backups');
          this.backups = response.data;
        } catch (error) {
          console.error('Error fetching backups:', error);
          this.showError(error);
        } finally {
          this.loading = false;
        }
      }
      
    },
    editItem(item) {
      this.form = { ...item };
      this.time = this.createTimeFromHHmm(item.selectedTime);
    },
    async deleteItem(item) {
      this.loading = true;
      try {
        await axios.delete(`/api/backups/${item.id}`);
        this.fetchBackups();
      } catch (error) {
        console.error('Error deleting backup configuration:', error);
        this.showError(error);
      } finally {
        this.loading = false;
      }
    },
    
    handleMessage(event) {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case 'backupAdded':
          this.backups.push(message.data);
          break;
        case 'backupUpdated':
          const index = this.backups.findIndex((backup) => backup.id === message.data.id);
          if (index !== -1) {
            this.backups.splice(index, 1, message.data);
          }
          break;
        case 'backupRemoved':
          this.backups = this.backups.filter((backup) => backup.id !== message.data.id);
          break;
      }
    },
    formatTimeToHHmm(obj) {
      const hours = obj.hours === 0 ? '00' : obj.hours;
      const minutes = obj.minutes === 0 ? '00' : obj.minutes;
      return `${hours}:${minutes}`;
    },
    createTimeFromHHmm(timeString) {
      const [hours, minutes] = timeString.split(':');
      return { hours: hours, minutes: minutes}
    }
  },
  mounted() {
    console.log('MODE: ',import.meta.env.MODE);
    this.fetchBackups();
    this.$refs.form.validate();
    this.socket = new WebSocket('ws://' + location.host + '/api/ws');
    this.socket.addEventListener('message', this.handleMessage);
  },
  watch: {
    time(newValue){
      this.form.selectedTime = this.formatTimeToHHmm(newValue);
    }
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.removeEventListener('message', this.handleMessage);
      this.socket.close();
    }
  },
};
</script>

<template>
  <div>
    <v-snackbar v-model="snackbar" color="error" top>{{ snackbarMessage }}</v-snackbar>
    <h1>Backup Configurator</h1>
    <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
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
        required
      ></v-select>
      <v-select
        v-model="form.type"
        :items="backupTypes"
        label="Backup Type"
        :rules="[requiredRule]"
        required
      ></v-select>
      <v-btn type="submit" :disabled="!valid" color="primary">Submit</v-btn>
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
          <td>{{ backup.type }}</td>
          <td>
            <v-btn small color="primary" @click="editItem(backup)">Edit</v-btn>
            <v-btn small color="error" @click="deleteItem(backup)">Delete</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- <v-table
      :headers="headers"
      :items="backups"
      :loading="loading"
      class="elevation-1"
      disable-pagination
    >
      <template v-slot:item.actions="{ item }">
        <v-btn small color="primary" @click="editItem(item)">Edit</v-btn>
        <v-btn small color="error" @click="deleteItem(item)">Delete</v-btn>
      </template>
    </v-table> -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BackupConfigurator',
  data() {
    return {
      snackbar: false,
      valid: false,
      form: {
        source: '',
        destination: '',
        frequency: '',
        type: '',
      },
      frequencies: ['daily', 'weekly', 'monthly'],
      backupTypes: ['full', 'cumulative'],
      requiredRule: (value) => !!value || 'This field is required.',
      headers: [
        { text: 'Source', value: 'source' },
        { text: 'Destination', value: 'destination' },
        { text: 'Frequency', value: 'frequency' },
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
      this.backups = [{source: '/mnt/user/rapid_appdata', destination: '/mnt/user/Backup', frequency: 'daily', type: 'full'}];
      this.loading = false;
      return;
      try {
        const response = await axios.get('/api/backups');
        this.backups = response.data;
      } catch (error) {
        console.error('Error fetching backups:', error);
        this.showError(error);
      } finally {
        this.loading = false;
      }
    },
    editItem(item) {
      this.form = { ...item };
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
  },
  mounted() {
    this.fetchBackups();
    this.socket = new WebSocket('ws://' + location.host + '/api/ws');
    this.socket.addEventListener('message', this.handleMessage);
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.removeEventListener('message', this.handleMessage);
      this.socket.close();
    }
  },
};
</script>

<template>
  <div class="pt-6 px-16">
    <v-alert
      :model-value="alert.show"
      closable
      :title="alert.title"
      :text="alert.text"
      :type="alert.type"
      @click:close="closeAlert()"
    ></v-alert>

    <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
      <v-card class="flat-card">
        <v-card-title>Backup Configurator:</v-card-title>

        <v-divider></v-divider>

        <v-container>

          <v-row>
            <v-col cols="12">
              <v-text-field :loading="loading" prepend-icon="mdi-tag" variant="outlined" label="Name" v-model="form.name">
                <template v-slot:append>
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
                    </template>

                    The name of your Backup
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-select :loading="loading" prepend-icon="mdi-content-save-all-outline" variant="outlined" v-model="form.type"
                :items="backupTypes" label="Backup Type" :rules="[requiredRule]" required>
                <template v-slot:append>
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
                    </template>

                    The type of your Backup (full or cummulative). 'Cummulative' will only add/remove files that have
                    changed in the source
                  </v-tooltip>
                </template>
              </v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-select :loading="loading" prepend-icon="mdi-calendar-month" variant="outlined" v-model="form.frequency" :items="frequencies"
                label="Frequency" :rules="[requiredRule]" @update:model-value="$event => checkIfValid($event)" required>
                <template v-slot:append>
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
                    </template>

                    The frequency of your Backup (daily, weekly, monthly)
                  </v-tooltip>
                </template>
              </v-select>
            </v-col>
          </v-row>

          <v-row v-show="form.frequency !== 'daily' && form.frequency === 'weekly'">
            <v-col cols="12">
              <v-select :loading="loading" prepend-icon="mdi-calendar-month" variant="outlined"
                v-show="form.frequency !== 'daily' && form.frequency === 'weekly'"
                :disabled="this.form.frequency === 'daily' || this.form.frequency === 'monthly'" :items="weekDays"
                item-title="title" item-value="value" v-model="form.selectedDay" label="Day of the week" outlined
                :rules="[form.frequency === 'weekly' ? requiredRule : true]" required>
                <template v-slot:append>
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
                    </template>

                    The day the backup will run
                  </v-tooltip>
                </template>
              </v-select>
            </v-col>
          </v-row>

          <v-row v-show="form.frequency !== 'daily' && form.frequency === 'monthly'">
            <v-col cols="12">
              <v-select :loading="loading" prepend-icon="mdi-calendar-month" variant="outlined"
                v-show="form.frequency !== 'daily' && form.frequency === 'monthly'"
                :disabled="this.form.frequency === 'daily' || this.form.frequency === 'weekly'" :items="dayOptions"
                v-model="form.selectedDay" label="Day of the month" outlined
                :rules="[form.frequency === 'monthly' ? requiredRule : true]" required>
                <template v-slot:append>
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
                    </template>

                    The day the backup will run
                  </v-tooltip>
                </template>
              </v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-input prepend-icon="mdi-timer-cog" label="Time">
                <VueDatePicker teleport-center time-picker v-model="time" :is-24="false" />
                <template v-slot:append>
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
                    </template>

                    The time the backup will run
                  </v-tooltip>
                </template>
              </v-input>
              <!-- <v-text-field prepend-icon="mdi-tag" variant="outlined" label="Name" :model-value="form.name">
                  <template v-slot:append>
                    <v-tooltip location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
                      </template>

                      The name of your Backup
                    </v-tooltip>
                  </template>
                </v-text-field> -->
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field :loading="loading" prepend-icon="mdi-folder-arrow-up" variant="outlined" label="Source"
                v-model="form.source">
                <template v-slot:append>
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
                    </template>

                    The directory to be backed up
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field :loading="loading" prepend-icon="mdi-folder-arrow-down" variant="outlined" label="Destination"
                v-model="form.destination">
                <template v-slot:append>
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
                    </template>

                    The directory where the backup will be stored
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions class="text-center">
          <v-btn type="submit" :disabled="!valid" color="blue" rounded="0" :prepend-icon="this.form.id ? 'mdi-pencil' : 'mdi-plus-thick'">{{ this.form.id ? 'Update' : 'Create' }}</v-btn>
          <v-btn color="gray" rounded="0" prepend-icon="mdi-close-thick" @click="clearForm()">Clear</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" color="amber" rounded="0" prepend-icon="mdi-test-tube">Test Run</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';
import { useBackupsStore } from '@/store/backups';

const store = useBackupsStore();

export default {
  name: 'BackupConfigurator',
  computed:{
    backupId(){
      return this.$route.params.id || null;
    }
  },
  data() {
    return {
      loading: false,
      alert: {
        show: false,
        type: 'error',
        title: 'Error',
        text: 'Unexpected Error Occured',
      },
      valid: true,
      time: { hours: 6, minutes: 30 },
      weekDays: [{ title: 'Monday', value: 1 }, { title: 'Tuesday', value: 2 }, { title: 'Wednesday', value: 3 }, { title: 'Thursday', value: 4 }, { title: 'Friday', value: 5 }, { title: 'Saturday', value: 6 }, { title: 'Sunday', value: 7 },],
      dayOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
      form: {
        id: null,
        name: '',
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
      socket: null,
    };
  },
  methods: {
    clearForm(){
      this.form = {
        id: null,
        name: '',
        source: '',
        destination: '',
        frequency: 'daily',
        type: 'full',
        selectedDay: null,
        selectedTime: "18:30",
      }
    },
    closeAlert(){
      this.alert.show = false;
    },
    showError(error) {
      this.alert.text = `An error occurred: ${error.toString()}`;
      this.alert.title = 'Error';
      this.alert.type = 'error';
      this.alert.show = true;
    },
    showSuccess(message) {
      this.alert.title = 'Success';
      this.alert.text = `${message}`;
      this.alert.type = 'success';
      this.alert.show = true;
    },
    checkIfValid(event) {
      console.log('updated');
      console.log('event', event);
      if (this.form.frequency !== 'daily') {
        this.$refs.form.validate();
      }
      this.form.selectedDay = null;
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
          this.showSuccess('Updated Backup Successfully');
        } else {
          await axios.post('/api/backups', this.form);
          this.showSuccess('Created Backup Successfully');
        }
        this.$refs.form.reset();
      } catch (error) {
        console.error('Error creating or updating backup configuration:', error);
        this.showError(error);
      } finally {
        this.loading = false;
      }
    },
    async getBackup(id){
      this.loading = true;
      try{
        this.form = await store.getBackup(id);
        this.time = this.createTimeFromHHmm(this.form.selectedTime);
      }
      catch(error){
        this.showError(error);
      }
      finally{
        this.loading = false;
      }
    },
    editItem(item) {
      this.form = { ...item };
      this.time = this.createTimeFromHHmm(item.selectedTime);
    },
    formatTimeToHHmm(obj) {
      const hours = obj.hours === 0 ? '00' : obj.hours;
      const minutes = obj.minutes === 0 ? '00' : obj.minutes;
      return `${hours}:${minutes}`;
    },
    createTimeFromHHmm(timeString) {
      const [hours, minutes] = timeString.split(':');
      return { hours: hours, minutes: minutes }
    }
  },
  mounted() {
    if(this.backupId){
      this.getBackup(this.backupId);
    }
    
    this.$refs.form.validate();
  },
  watch: {
    time(newValue) {
      this.form.selectedTime = this.formatTimeToHHmm(newValue);
    }
  },
  beforeDestroy() {

  },
};
</script>

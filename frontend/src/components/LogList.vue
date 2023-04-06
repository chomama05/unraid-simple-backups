<template>
  <v-list bg-color="#FFF4E0">
    <div v-if="loading == true" class="text-center">
      <v-list-item>
        <v-list-item-title>Loading</v-list-item-title>
      </v-list-item>
      <v-progress-circular indeterminate></v-progress-circular>
    </div>

    <div v-if="!loading" v-for="(log, index) in logs" :key="index">
      <v-list-item @click="selectLog(log)"
        :class="(selectedLog && log.id === selectedLog.id) ? 'selected' : ''">
        <v-list-item-title>{{ getBackupName(log.id) }}</v-list-item-title>
        <v-list-item-subtitle class="text-capitalize">Log Files: {{ log.logFiles.length }}</v-list-item-subtitle>
        <template v-slot:prepend>
          <v-icon :icon="getLogIconName(log)"></v-icon>
        </template>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
// icon="mdi-numeric-0-box-multiple-outline"
import { useBackupsStore } from '@/store/backups';
import { useLogStore } from '@/store/logs';
import { useAppStore } from '@/store/app';

const backupStore = useBackupsStore();
const store = useLogStore();
const appStore = useAppStore();

export default {
  computed: {
    pathLogId() {
      return this.$route.params.id || null;
    },
    logs() {
      return store.logs;
    },
    loading() {
      return store.loading;
    }
  },
  data() {
    return {
      selectedLog: null,
      selectedLogBackup: null
    }
  },
  methods: {
    selectLog(log) {
      this.selectedLog = log;
      this.selectedLogBackup = backupStore.getLocalBackup(log.id);
      this.$emit('logSelection', {log, backup: this.selectedLogBackup});
    },
    getLogIconName(log) {

      if(log.logFiles.length === 1){
        return `mdi-text-box-outline`;
      }
      if(log.logFiles.length > 1){
        return 'mdi-text-box-multiple-outline';
      }
      return 'mdi-text-box-remove-outline';
    },
    getBackupName(id){
      const backup = backupStore.getLocalBackup(id);
      if(backup && backup.name){
        return backup.name;
      }
      return 'n/a';
    }
  },
  async mounted() {
    await backupStore.fetchBackups();
    await store.fetchLogs();

    if (this.pathLogId) {
      const log = this.logs.find(item => item.id == this.pathLogId);
      if(!log){
        appStore.showError('Log Not Found', `Could not find log with backupd id(${this.pathLogId}). Check your URL...`, 10000);
      }
      else{
        this.selectLog(log);
      }
    }
  }
}

</script>

<style>
.selected {
  background-color: #F3DEBA;
}
</style>
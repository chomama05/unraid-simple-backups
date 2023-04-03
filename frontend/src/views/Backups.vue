<template>
    <Layout>
      <template #middle>
        
        <backup-list v-on:backup-selection="changeSelectedBackup"></backup-list>

      </template>
      <template #right>
        <div v-if="selectedBackup">

          <backup-details :backup="selectedBackup" @backupDeleted="resetSelectedBackup()"></backup-details>

        </div>
      </template>
    </Layout>
  </template>
  
  <script>
  import Layout from '../layouts/v2/Layout.vue';
  import BackupList from '../components/BackupList.vue';
  import BackupDetails from '../components/BackupDetails.vue';

  import { useBackupsStore } from '@/store/backups';

  const store = useBackupsStore();

  export default {
    components: {
      Layout,
      BackupList,
      BackupDetails
    },
    data() {
      return {
        selectedBackup: null,
      }
    },
    methods: {
      changeSelectedBackup(backup){
        this.selectedBackup = backup;
      },
      resetSelectedBackup(){
        console.log('resetSelectedBackup: ');
        this.selectedBackup = null;
        store.fetchBackups();
      }
    },
  }
  </script>
  
<style scoped>

</style>
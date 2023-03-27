<template>
    <Layout>
      <template #middle>

        <backup-configurator />

        <!-- <v-list>
          <v-list-item v-for="(backup, index) in backups" :key="index" @click="selectBackup(backup)">
            <v-list-item-title>{{ backup.name }}</v-list-item-title>
          </v-list-item>
        </v-list> -->
      </template>
    </Layout>
  </template>
  
  <script>
  import Layout from '../layouts/v2/Simple.vue';
  import BackupConfigurator from '../components/BackupConfigurator.vue';
  
  export default {
    components: {
      Layout,
      BackupConfigurator
    },
    data() {
      return {
        backups: [
          { name: 'Backup 1', details: 'Backup 1 details' },
          { name: 'Backup 2', details: 'Backup 2 details' },
          // Add more backups here
        ],
        selectedBackup: null,
      }
    },
    methods: {
      selectBackup(backup) {
        this.selectedBackup = backup
      },
    },
  }
  </script>
  
<style scoped>

</style>
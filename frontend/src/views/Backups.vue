<template>
    <Layout>
      <template #middle>
        
        <backup-list v-on:backup-selection="changeSelectedBackup"></backup-list>

      </template>
      <template #right>
        <div v-if="selectedBackup">

          <backup-details :backup="selectedBackup"></backup-details>

        </div>
      </template>
    </Layout>
  </template>
  
  <script>
  import Layout from '../layouts/v2/Layout.vue';
  import BackupList from '../components/BackupList.vue';
  import BackupDetails from '../components/BackupDetails.vue';

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
      }
    },
  }
  </script>
  
<style scoped>

</style>
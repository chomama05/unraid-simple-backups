<template>
    <Layout>
      <template #middle>

        <backup-configurator />

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
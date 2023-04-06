<template>
    <Layout :middleColumnColor="'#FFF4E0'">
      <template #middle>

        <log-list v-on:log-selection="changeSelectedLog"></log-list>

      </template>

      <template #right>
        <div v-if="selectedLog">

          <log-details :log="selectedLog" :backup="selectedLogBackup"></log-details>

        </div>
      </template>
    </Layout>
  </template>
  
  <script>
  import Layout from '../layouts/v2/Layout.vue';
  import LogList from '../components/LogList.vue';
  import LogDetails from '../components/LogDetails.vue';
  
  export default {
    components: {
      Layout,
      LogList,
      LogDetails
    },
    data() {
      return {
        selectedLog: null,
        selectedLogBackup: null
      }
    },
    methods: {
      changeSelectedLog({log, backup}){
        this.selectedLog = log;
        this.selectedLogBackup = backup;
        this.$router.push({ name: 'logs', params: { id: this.selectedLog.id } })
      },
    },
  }
  </script>
  
<style scoped>

</style>
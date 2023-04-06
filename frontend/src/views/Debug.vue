<template>
    <Layout>
      <template #middle>

        <v-card class="flat-card">
          <v-tabs fixed-tabs v-model="tab" bg-color="#393053" color="white" class="tabs">
            <v-tab color="white" value="one">Database</v-tab>
            <v-tab color="white" value="two">Logs</v-tab>
            <v-tab color="white" value="three">Something Else</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="one">
                <debug-database></debug-database>
              </v-window-item>

              <v-window-item value="two">
                TODO 2
              </v-window-item>

              <v-window-item value="three">
                TODO 3
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>

      </template>
    </Layout>
  </template>
  
  <script>
  import Layout from '../layouts/v2/Simple.vue';
  import DebugDatabase from '../components/DebugDatabase.vue';
  
  export default {
    components: {
      Layout,
      DebugDatabase
    },
    data() {
      return {
        tab: null,
      }
    },
    methods: {},
  }
  </script>
  
<style scoped>
.flat-card {
	display: flex;
	flex-direction: column;
	border-radius: 0 !important;
	height: 100vh;
	overflow-y: auto;
	flex-grow: 1;
}
</style>
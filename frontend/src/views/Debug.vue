<template>
    <Layout>
      <template #middle>

        <v-card class="flat-card">
          <v-tabs v-model="tab" bg-color="#393053" color="white" :grow="true" class="tabs">
            <v-tab color="white" value="one">Database</v-tab>
            <v-tab color="white" value="two">Something</v-tab>
            <v-tab color="white" value="three">Something Else</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="one">
                TODO 1
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

</style>
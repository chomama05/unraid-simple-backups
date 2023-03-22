<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <backup-configurator />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BackupConfigurator from '../components/BackupConfigurator.vue';

export default {
  name: 'App',
  components: {
    BackupConfigurator,
  },
};
</script>

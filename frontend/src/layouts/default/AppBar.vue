<template>
  <v-app-bar flat>
    <v-app-bar-title class="app-bar-title">
      <img src="../../assets/logo.png" class="app-logo" alt="Unraid Simple Backups Logo" />
      <span class="app-bar-text">Unraid Simple Backups</span>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
  //
</script>

<style scoped>
  .app-logo {
    height: 40px;
    width: auto;
    margin-right: 10px;
  }
  .app-bar-title {
    display: flex;
    align-items: center;
  }
  .app-bar-text {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    vertical-align: middle;
  }
</style>

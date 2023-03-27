<template>
	<v-list bg-color="#e8edf5">
		<div v-if="loading == true" class="text-center">
			<v-list-item>
				<v-list-item-title>Loading</v-list-item-title>
			</v-list-item>
			<v-progress-circular indeterminate></v-progress-circular>
		</div>

		<div v-if="!loading" v-for="(backup, index) in backups" :key="index">
			<v-list-item @click="selectBackup(backup)"
				:class="(selectedBackup && backup.id === selectedBackup.id) ? 'selected' : ''">
				<v-list-item-title>{{ backup.id }}</v-list-item-title>
				<v-list-item-subtitle class="text-capitalize">{{ backup.frequency }} {{ backup.type }}
					Backup</v-list-item-subtitle>
				<template v-slot:prepend>
					<v-icon :color="getBackupIconColor(backup)" :icon="getBackupIconName(backup)"></v-icon>
				</template>
			</v-list-item>
		</div>
	</v-list>
</template>

<script>
import { useBackupsStore } from '@/store/backups';

const store = useBackupsStore();

export default {
	computed: {
      backups() {
        return store.backups;
      },
    },
		data() {
      return {
        loading: false,
				selectedBackup: null,
      }
    },
		methods: {
      selectBackup(backup) {
        this.selectedBackup = backup;
				this.$emit('backupSelection', backup);
      },
			getBackupIconColor(backup){
        if(backup.lastBackupSuccess === undefined){
          return '';
        }

        if(backup.lastBackupSuccess === true){
          return 'green';
        }
        return 'red';
      },
      getBackupIconName(backup){
        if(backup.lastBackupSuccess === undefined){
          return 'mdi-checkbox-blank-circle-outline';
        }

        if(backup.lastBackupSuccess === true){
          return 'mdi-check-circle';
        }
        return 'mdi-alert-circle';
      }
		},
		async mounted() {
      this.loading = true;
      await store.fetchBackups();
      this.loading = false;
    }
}

</script>

<style>
.selected{
  background-color: #d3dceb;
}
</style>
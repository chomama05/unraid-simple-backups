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
				<v-list-item-title>{{ backup.name }}</v-list-item-title>
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
      loading(){
        return store.loading;
      }
    },
		data() {
      return {
				selectedBackup: null,
      }
    },
		methods: {
      selectBackup(backup) {
        this.selectedBackup = backup;
				this.$emit('backupSelection', backup);
      },
			getBackupIconColor(backup){
        if(backup.lastBackupSuccess === 0){
          return 'red';
        }

        if(backup.lastBackupSuccess === 1){
          return 'green';
        }
        return '';
      },
      getBackupIconName(backup){
        if(backup.lastBackupSuccess === 0){
          return 'mdi-alert-circle';
        }
        
        if(backup.lastBackupSuccess === 1){
          return 'mdi-check-circle';
        }
        return 'mdi-checkbox-blank-circle-outline';
      }
		},
		async mounted() {
      await store.fetchBackups();
    }
}

</script>

<style>
.selected{
  background-color: #d3dceb;
}
</style>
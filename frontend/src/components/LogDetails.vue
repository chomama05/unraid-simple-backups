<template>
	<v-card class="flat-card">
		<v-card-title class="text-h5">
			Logs
		</v-card-title>

		<v-card-subtitle>
			Total Files: {{ log.logFiles.length }}
		</v-card-subtitle>

		<v-card-text>
			<v-expansion-panels variant="popout" class="my-4">
				<v-expansion-panel
					v-for="logFile in sortedLogFiles"
					v-on:group:selected="getLogFileContents($event, backup.id, logFile.location)"
					:key="logFile.date"
					:title="`Log File: ${logFile.date}`"
				>
					<v-expansion-panel-text>						
						<v-textarea :loading="loading" auto-grow readonly label="Log File Contents" :model-value="this.logFileContent"></v-textarea>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-card-text>
	</v-card>
</template>

<script>
import { DateTime } from 'luxon';
import { useLogStore } from '@/store/logs';
const store = useLogStore();

export default {
	props: {
		log: Object,
		backup: Object
	},
	computed: {
		sortedLogFiles(){
			return this.sortLogFilesByDate(this.log.logFiles);
		}
	},
	data() {
		return {
			loading: false,
			logFileContent: ''
		}
	},
	methods:{
		sortLogFilesByDate(logFilesArray){
			return logFilesArray.sort((a, b) => {
				const dateA = DateTime.fromFormat(a.date, 'yyyy-MM-dd_HH:mm:ss');
				const dateB = DateTime.fromFormat(b.date, 'yyyy-MM-dd_HH:mm:ss');
				return dateB.valueOf() - dateA.valueOf();
			});
		},
		async getLogFileContents(event, backupId, location){
			if(!event.value){
				return;
			}
			this.logFileContent = '';
			this.loading = true;
			const content = await store.getLogFileContent(backupId, btoa(location));
			this.logFileContent = content;
			this.loading = false;
		}
	},
	mounted(){

	}
}
</script>

<style>
.flat-card {
	display: flex;
	flex-direction: column;
	border-radius: 0 !important;
	height: 100vh;
	overflow-y: auto;
	flex-grow: 1;
}
</style>
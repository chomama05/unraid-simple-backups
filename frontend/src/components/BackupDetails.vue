<template>
	<v-card class="flat-card">
		<v-tabs fixed-tabs v-model="tab" bg-color="#00235B" color="white" class="tabs">
			<v-tab color="white" value="one">Backup</v-tab>
			<v-tab color="white" value="two">Activity</v-tab>
			<v-tab color="white" value="three">Recovery</v-tab>
		</v-tabs>

		<v-card-text>
			<v-window v-model="tab">
				<v-window-item value="one">
					<v-card>
						<v-card-title>Backup: <span style="font-weight: 400;">{{ backup.name }}</span></v-card-title>

						<v-divider></v-divider>
						<v-container>
							<delete-backup-dialog v-model="showDeleteDialog" :backup="backup"
								@close="deleteBackupDialogClosed($event)"></delete-backup-dialog>
							<v-row>
								<v-col cols="12">
									<v-text-field prepend-icon="mdi-tag" variant="outlined" label="Name" persistent-hint :readonly="true"
										:model-value="backup.name">
										<template v-slot:append>
											<v-tooltip location="bottom">
												<template v-slot:activator="{ props }">
													<v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
												</template>

												The name of your Backup
											</v-tooltip>
										</template>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									<v-text-field prepend-icon="mdi-content-save-all-outline" variant="outlined" persistent-hint
										label="Type" :readonly="true" :model-value="backup.type">
										<template v-slot:append>
											<v-tooltip location="bottom">
												<template v-slot:activator="{ props }">
													<v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
												</template>

												The type of your Backup (full, cummulative). 'Cummulative' will only add/remove files that have
												changed in the source
											</v-tooltip>
										</template>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									<v-text-field prepend-icon="mdi-calendar-month" variant="outlined" persistent-hint label="Frequency"
										:readonly="true" :model-value="backup.frequency">
										<template v-slot:append>
											<v-tooltip location="bottom">
												<template v-slot:activator="{ props }">
													<v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
												</template>

												The frequency of your Backup (daily, weekly, monthly)
											</v-tooltip>
										</template>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									<v-text-field prepend-icon="mdi-timer-cog" variant="outlined" persistent-hint label="Time"
										:readonly="true" :model-value="backup.selectedTime">
										<template v-slot:append>
											<v-tooltip location="bottom">
												<template v-slot:activator="{ props }">
													<v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
												</template>

												The time the backup will run
											</v-tooltip>
										</template>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row v-if="backup.selectedDay">
								<v-col cols="12">
									<v-text-field prepend-icon="mdi-calendar-today" variant="outlined" persistent-hint label="Day"
										:readonly="true" :model-value="getDay(backup)">
										<template v-slot:append>
											<v-tooltip location="bottom">
												<template v-slot:activator="{ props }">
													<v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
												</template>

												The day the backup will run
											</v-tooltip>
										</template>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									<v-text-field prepend-icon="mdi-folder-arrow-up" variant="outlined" persistent-hint label="Source"
										:readonly="true" :model-value="backup.source">
										<template v-slot:append>
											<v-tooltip location="bottom">
												<template v-slot:activator="{ props }">
													<v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
												</template>

												The directory to be backed up
											</v-tooltip>
										</template>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									<v-text-field prepend-icon="mdi-folder-arrow-down" variant="outlined" persistent-hint
										label="Destination" :readonly="true" :model-value="backup.destination">
										<template v-slot:append>
											<v-tooltip location="bottom">
												<template v-slot:activator="{ props }">
													<v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
												</template>

												The directory where the backup will be stored
											</v-tooltip>
										</template>
									</v-text-field>
								</v-col>
							</v-row>
						</v-container>

						<v-divider></v-divider>

						<v-card-actions>
							<v-btn rounded="0" color="black" prepend-icon="mdi-pencil" :to="`/configurator/${backup.id}`">Edit</v-btn>
							<v-btn rounded="0" color="gray" prepend-icon="mdi-post-outline">See logs</v-btn>
							<v-spacer></v-spacer>
							<v-btn rounded="0" color="red" prepend-icon="mdi-delete" @click="openDeleteBackupDialog()">Delete</v-btn>
						</v-card-actions>

					</v-card>
				</v-window-item>

				<v-window-item value="two">
					TODO
				</v-window-item>

				<v-window-item value="three">
					TODO
				</v-window-item>
			</v-window>
		</v-card-text>
	</v-card>
</template>

<script>
import deleteBackupDialog from './DeleteBackupDialog.vue';

export default {
	props: {
		backup: Object
	},
	emits: ['update:modelValue', 'backupDeleted'],
	components: {
		deleteBackupDialog
	},
	data() {
		return {
			tab: null,
			showDeleteDialog: false
		}
	},
	methods: {
		getDay(backup) {
			if (backup.frequency === 'weekly') {
				const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
				return days[backup.selectedDay - 1];
			}
			return backup.selectedDay;
		},
		openDeleteBackupDialog() {
			this.showDeleteDialog = true;
		},
		deleteBackupDialogClosed(deleted) {
			console.log('deleteBackupDialogClosed: ', deleted);
			if (deleted === true) {
				this.$emit('backupDeleted');
			}
		}
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

.tabs .v-tab:not(.v-tab--active) {
	color: rgba(255, 255, 255, 0.7);
	/* Adjust the color and opacity as needed */
}
</style>
<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" width="50%" persistent>
			<v-alert closable :model-value="alert.show" :title="alert.title" :text="alert.text" :type="alert.type"
				@click:close="closeAlert()"></v-alert>
			<v-card>
				<v-card-title>
					<span class="text-h5">Delete Backup: <span color="grey" class="text-h6 font-weight-regular">id({{ backup.id }}) - {{ backup.name }}</span></span>
				</v-card-title>
				<v-card-text>
					<p>Deleting this backup will ONLY delete it from the database. Your Backup files will remain in their destination.</p>
					<p>Are you sure you want to delete this backup?</p>
					<v-spacer></v-spacer>
					<small class="font-italic">(Be Careful) This action cannot be undone.</small>
				</v-card-text>
				<v-divider class="my-4"></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="orange" variant="text" @click="closeDialog(false)">
						Cancel
					</v-btn>
					<v-btn :loading="loading" color="red" variant="text" @click="deleteBackup()">
						Delete
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import { useBackupsStore } from '@/store/backups';
import { useAppStore } from '@/store/app';

const storeApp = useAppStore();
const store = useBackupsStore();

export default {
	props: {
		modelValue: 'Boolean',
		backup: Object
	},
	emits: ['update:modelValue', 'close'],
	computed: {
		dialog: {
			get() {
				return this.modelValue;
			},
			set(value) {
				this.$emit('update:modelValue', value);
			}
		}
	},
	data() {
		return {
			loading: false,
			alert: {
				show: false,
				title: '',
				text: '',
				type: 'error'
			},
		}
	},
	methods: {
		closeAlert() {
			this.alert.show = false;
		},
		showError(title, message) {
			this.alert.title = title;
			this.alert.text = message;
			this.alert.show = true;
		},
		closeDialog(deleted) {
			this.$emit('close', deleted);
			this.dialog = false;
		},
		async deleteBackup() {
			this.loading = true;
			try {
				await store.deleteBackup(this.backup.id);
				storeApp.showSuccess('Successfully Deleted Backup', `The Backup id(${this.backup.id}) was successfully deleted from the database`);
				this.closeDialog(true);
			}
			catch (err) {
				console.error(err);
				this.showError(`Error Deleting Backup id(${this.backup.id})`, err.toString());
			}
			finally{
				this.loading = false;
			}
		}
	},
	mounted() {

	}
}
</script>
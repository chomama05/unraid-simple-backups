<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" width="50%" persistent>
			<v-alert
				closable
				:model-value="alert.show"
				:title="alert.title"
				:text="alert.text"
				:type="alert.type"
				@click:close="closeAlert()"
			></v-alert>
			<v-card>
				<v-card-title>
					<span class="text-h5">Create new Directory</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="12">
								<v-text-field v-model="newDirName" variant="outlined" persistent-placeholder :prefix="`${rootDir}/`"
									label="New Directory" required></v-text-field>
							</v-col>
						</v-row>
					</v-container>
					<small>New directory will be created under: {{ rootDir }}</small>
				</v-card-text>

				<!-- <v-banner
					v-show="alert.show"
					lines="two"
					icon="mdi-alert-circle-outline"
					color="error"
					class="error-banner"
				>
					<v-banner-text>
						{{ alert.text }}
					</v-banner-text>

					<template v-slot:actions>
						<v-btn color="white" icon="mdi-alpha-x-box" @click="closeAlert()"></v-btn>
					</template>
				</v-banner> -->

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="orange" variant="text" @click="closeDialog('')">
						Cancel
					</v-btn>
					<v-btn color="green" variant="text" @click="createNewDirectory()">
						Create
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import axios from 'axios';

export default {
	props: {
		modelValue: 'Boolean',
		rootDir: 'String'
	},
	emits: ['update:modelValue'],
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
			alert: {
				show: false,
				title: '',
				text: '',
				type: 'error'
			},
			newDirName: ''
		}
	},
	methods: {
		closeAlert() {
			this.alert.show = false;
		},
		showError(title, message){
			this.alert.title = title;
			this.alert.text = message;
			this.alert.show = true;
		},
		closeDialog(name) {
			let fullPath = this.rootDir;
			if (name !== '') {
				fullPath += `/${name}`;
			}
			this.$emit('close', fullPath);
			this.dialog = false;
		},
		async createNewDirectory() {
			try {
				const response = await axios.post('/api/directory', { directory: this.rootDir, name: this.newDirName });
				this.closeDialog(this.newDirName);
			}
			catch(err){
				console.error(err);
				this.showError('Error Creating new Directory', err.toString());
			}
		}
	},
	mounted() {

	}
}
</script>

<style>
.error-banner{
	background-color: #b3261e !important;
	color: white !important;
	border-radius: 8px !important;
}
</style>
<template>
	<div class="pt-6 px-16">
		<v-row>
			<v-col cols="12">
				<v-menu>
					<template v-slot:activator="{ props }">
						<v-btn color="primary" v-bind="props">
							Table: {{ selectedTable }}
						</v-btn>
					</template>
					<v-list>
						<v-list-item v-for="(table, index) in tables" :key="index" :value="index" @click="selectTable(table)">
							<v-list-item-title>{{ table }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-col>
		</v-row>
		
		<v-row>
			<v-col cols="12">
				<database-table :loading="loading" :headers="selectedTableHeaders" :items="selectedTableItems"></database-table>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { getObjectWithMostPropertiesFromArray } from '../helpers/arrays';
import databaseTable from './DatabaseTable.vue';
import { useBackupsStore } from '@/store/backups';

const store = useBackupsStore();

export default {
	components: {
		databaseTable
	},
	computed:{
		loading(){
			return store.loading;
		},
		backups() {
			return store.backups;
		},
	},
	data() {
		return {
			tables: ['backups', 'backup_events'],
			selectedTable: 'backups',
			selectedTableHeaders: [],
			selectedTableItems: []
		}
	},
	methods: {
		selectTable(table){
			this.selectedTable = table;
			this.selectedTableHeaders = [];
			this.selectedTableItems = [];
			this.fetchTableItems(table);
		},
		async fetchTableItems(table){
			switch(table){
				case 'backups':
					await store.fetchBackups();
					if(this.backups.length > 0){
						const headerObject = getObjectWithMostPropertiesFromArray(this.backups);
						this.selectedTableHeaders = Object.keys(headerObject);
						this.selectedTableItems = this.backups;
					}
					break;
			}
		},
	},
	mounted(){
		this.fetchTableItems(this.selectedTable);
	}
}
</script>
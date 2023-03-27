<template>
	<v-card class="flat-card">
		<v-tabs v-model="tab" bg-color="#00235B" color="white" :grow="true" class="tabs">
			<v-tab color="white" value="one">Backup</v-tab>
			<v-tab color="white" value="two">Activity</v-tab>
			<v-tab color="white" value="three">Recovery</v-tab>
		</v-tabs>

		<v-card-text>
			<v-window v-model="tab">
				<v-window-item value="one">
					<v-container>
						<v-row>
							<v-col cols="12">
								<h2>Backup: <span style="font-weight: 400;">{{ backup.name }}</span></h2>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="2"><v-btn class="ma-2" color="amber-lighten-2" icon="mdi-calendar-month"></v-btn></v-col>
							<v-col cols="10"><v-text-field label="Type" :readonly="true" :model-value="backup.frequency"></v-text-field></v-col>
						</v-row>
						<v-row>
							<v-col cols="2"><v-btn class="ma-2" color="teal-lighten-3" icon="mdi-timer-cog"></v-btn></v-col>
							<v-col cols="10"><v-text-field label="Time" :readonly="true" :model-value="backup.selectedTime"></v-text-field></v-col>
						</v-row>
						<v-row v-if="backup.selectedDay">
							<v-col cols="2"><v-btn class="ma-2" color="amber-lighten-1" icon="mdi-calendar-today"></v-btn></v-col>
							<v-col cols="10"><v-text-field label="Day" :readonly="true" :model-value="getDay(backup)"></v-text-field></v-col>
						</v-row>
						<v-row>
							<v-col cols="2"><v-btn class="ma-2" color="indigo" icon="mdi-map-marker"></v-btn></v-col>
							<v-col cols="10"><v-text-field label="Source" :readonly="true" :model-value="backup.source"></v-text-field></v-col>
						</v-row>
						<v-row>
							<v-col cols="2"><v-btn class="ma-2" color="teal" icon="mdi-map-marker-radius"></v-btn></v-col>
							<v-col cols="10"><v-text-field label="Destination" :readonly="true" :model-value="backup.destination"></v-text-field></v-col>
						</v-row>
					</v-container>
					<h3 class="text-capitalize">{{ backup.frequency }} {{ backup.type }} Backup</h3>
          <p>{{ backup.source }}</p>
          <p>{{ backup.destination }}</p>
          <p>{{ backup.selectedTime }}</p>
          <p>{{ backup.selectedDay }}</p>
				</v-window-item>

				<v-window-item value="two">
					Two
				</v-window-item>

				<v-window-item value="three">
					Three
				</v-window-item>
			</v-window>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	props: {
		backup: Object
	},
	emits: ['update:modelValue'],

	data() {
		return {
			tab: null,
		}
	},
	methods: {
		getDay(backup){
			if(backup.frequency === 'weekly'){
				const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
				return days[backup.selectedDay-1];
			}
			return backup.selectedDay;
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
  color: rgba(255, 255, 255, 0.7); /* Adjust the color and opacity as needed */
}
</style>
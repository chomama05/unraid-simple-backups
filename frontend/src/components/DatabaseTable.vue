<template>
	<div>

		<div v-if="loading == true" class="text-center">
			<v-progress-circular indeterminate></v-progress-circular>
		</div>

		<div v-if="!loading == true" class="text-center">
			<v-table hover>
				<thead>
					<tr>
						<th class="text-center" v-for="header in headers" :key="header">
							{{ header }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in items" :key="index">
						<td v-for="header in headers"
							:key="header"
							:class="item.hasOwnProperty(header) ? '' : 'font-italic'"
						>
							{{ item.hasOwnProperty(header) ? item[header] : 'n/a' }}
						</td>
					</tr>
				</tbody>
			</v-table>
		</div>
	</div>
</template>

<script>

export default {
	props: {
		loading: Boolean,
		headers: {
			type: Array,
			validator: (prop) => prop.every(e => typeof e === 'string'),
			required: true,
		},
		items: {
			type: Array,
			validator: (prop) => prop.every(e => typeof e === 'object'),
			required: true,
		}
	},
	components: {

	},
	data() {
		return {

		}
	},
	methods: {

	},
}
</script>
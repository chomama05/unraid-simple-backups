<template>
	<v-navigation-drawer app permanent color="#00235B" theme="dark">
		<v-list v-for="item in menuItems">
			<v-list-item :to="item.to">

				<template v-slot:prepend>
					<v-icon :icon="item.icon"></v-icon>
				</template>

				<v-list-item-title v-text="item.text"></v-list-item-title>

			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'Layout',
	data() {
		return {
			menuItems: [
				{ text: 'Backups', to: '/', icon: 'mdi-database-clock-outline' },
				{ text: 'Configurator', to: '/configurator', icon: 'mdi-code-greater-than-or-equal' },
				{ text: 'Logs', to: '/logs', icon: 'mdi-file-document-outline' },
			]
		}
	}
}
</script>
<template>
	<v-navigation-drawer app permanent color="#00235B" theme="dark">
		<v-container fluid class="fill-height py-0">
			<v-row class="fill-height flex-column">
				<v-list>
					<v-list-item v-for="(item, index) in menuItems.slice(0, -1)" :key="index" :to="item.to">
						<template v-slot:prepend>
							<v-icon :icon="item.icon"></v-icon>
						</template>
						<v-list-item-title v-text="item.text"></v-list-item-title>
					</v-list-item>
				</v-list>
				<v-spacer></v-spacer>
				<v-list>
					<v-list-item :to="menuItems[menuItems.length - 1].to" color="gray">
						<template v-slot:prepend>
							<v-icon :icon="menuItems[menuItems.length - 1].icon"></v-icon>
						</template>
						<v-list-item-title style="color: gray;" v-text="menuItems[menuItems.length - 1].text"></v-list-item-title>
					</v-list-item>
				</v-list>
			</v-row>
		</v-container>
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
				{ text: 'Debug', to: '/debug', icon: 'mdi-bug' },
			]
		}
	}
}
</script>
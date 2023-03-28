<template>
	<v-app>
		<v-app-bar theme="dark" :elevation="2">
			<v-app-bar-nav-icon>
				<logo-svg></logo-svg>
			</v-app-bar-nav-icon>
			<v-app-bar-title text="Unraid Simple Backups" ></v-app-bar-title>
		</v-app-bar>

		<sideBar></sideBar>

		<v-main style="height: calc(100% - 64px);">
			<v-container fluid class="full-height pa-0">
				<v-row class="full-height" no-gutters>
					<v-col cols="12" class="overflow-y-auto middleColumn">
						<slot name="middle"></slot>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>
  
<script>
import logoSvg from './LogoSvg.vue';
import sideBar from './SideBar.vue';

export default {
	name: 'Layout',
	components: {
		logoSvg,
		sideBar
	}
}
</script>
  
<style scoped>
.active {
	background-color: rgba(224, 22, 22, 0.1);
}

.middleColumn{
    background-color: #e8edf5;
}

.navigation-drawer{
	background-color: #00235B;
}

.full-height {
  height: 100%;
}

.v-row.full-height {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.overflow-y-auto {
  overflow-y: auto;
  height: 100%;
}
</style>
  
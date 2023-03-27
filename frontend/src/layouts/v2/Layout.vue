<template>
	<v-app>
		<v-app-bar theme="dark" :elevation="2">
			<v-app-bar-nav-icon>
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" zoomAndPan="magnify" viewBox="0 0 375 374.999991" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="a74ca2469c"><path d="M 17.25 0 L 357.75 0 C 362.324219 0 366.710938 1.816406 369.949219 5.050781 C 373.183594 8.289062 375 12.675781 375 17.25 L 375 357.75 C 375 362.324219 373.183594 366.710938 369.949219 369.949219 C 366.710938 373.183594 362.324219 375 357.75 375 L 17.25 375 C 12.675781 375 8.289062 373.183594 5.050781 369.949219 C 1.816406 366.710938 0 362.324219 0 357.75 L 0 17.25 C 0 12.675781 1.816406 8.289062 5.050781 5.050781 C 8.289062 1.816406 12.675781 0 17.25 0 " clip-rule="nonzero"/></clipPath><clipPath id="745c1e4b38"><path d="M 256.347656 188.660156 L 352.347656 188.660156 L 352.347656 340.160156 L 256.347656 340.160156 Z M 256.347656 188.660156 " clip-rule="nonzero"/></clipPath><clipPath id="f67538f76a"><path d="M 23 188.660156 L 118.988281 188.660156 L 118.988281 340.160156 L 23 340.160156 Z M 23 188.660156 " clip-rule="nonzero"/></clipPath><clipPath id="39f422669e"><path d="M 60.300781 278.597656 L 315.183594 278.597656 L 315.183594 368 L 60.300781 368 Z M 60.300781 278.597656 " clip-rule="nonzero"/></clipPath><clipPath id="0d75127bdd"><path d="M 286.933594 278.597656 L 88.425781 278.597656 L 60.300781 323.019531 L 88.425781 367.441406 L 286.933594 367.441406 L 315.058594 323.019531 L 286.933594 278.597656 " clip-rule="nonzero"/></clipPath><clipPath id="4e0d9cf257"><path d="M 73.820312 3.171875 L 301 3.171875 L 301 363.171875 L 73.820312 363.171875 Z M 73.820312 3.171875 " clip-rule="nonzero"/></clipPath><clipPath id="5bbd017dab"><path d="M 24 222 L 153 222 L 153 361 L 24 361 Z M 24 222 " clip-rule="nonzero"/></clipPath><clipPath id="bd25bdc5f3"><path d="M 152.726562 317.546875 L 82.988281 361.835938 L 22.675781 266.871094 L 92.417969 222.578125 Z M 152.726562 317.546875 " clip-rule="nonzero"/></clipPath><clipPath id="a4847ade85"><path d="M 152.726562 317.546875 L 84.347656 360.972656 L 24.035156 266.003906 L 92.417969 222.578125 Z M 152.726562 317.546875 " clip-rule="nonzero"/></clipPath><clipPath id="f3887c7db3"><path d="M 221 223 L 351 223 L 351 363 L 221 363 Z M 221 223 " clip-rule="nonzero"/></clipPath><clipPath id="987c5a6dac"><path d="M 290.152344 362.125 L 220.410156 317.835938 L 280.714844 222.867188 L 350.457031 267.152344 Z M 290.152344 362.125 " clip-rule="nonzero"/></clipPath><clipPath id="a1668f6f8f"><path d="M 290.152344 362.125 L 221.84375 318.75 L 282.152344 223.777344 L 350.457031 267.152344 Z M 290.152344 362.125 " clip-rule="nonzero"/></clipPath><clipPath id="09996a2207"><path d="M 64 176 L 192 176 L 192 372 L 64 372 Z M 64 176 " clip-rule="nonzero"/></clipPath><clipPath id="7c861ef972"><path d="M 64.945312 179.417969 L 70.890625 175.664062 L 192.910156 368.878906 L 186.964844 372.632812 Z M 64.945312 179.417969 " clip-rule="nonzero"/></clipPath><clipPath id="349b26d892"><path d="M 64.945312 179.417969 L 70.1875 176.109375 L 191.699219 368.515625 L 186.457031 371.828125 Z M 64.945312 179.417969 " clip-rule="nonzero"/></clipPath><clipPath id="11caef1636"><path d="M 184 176 L 311 176 L 311 371 L 184 371 Z M 184 176 " clip-rule="nonzero"/></clipPath><clipPath id="78ef07bbb9"><path d="M 305.25 176.109375 L 311.191406 179.867188 L 190.015625 371.53125 L 184.070312 367.773438 Z M 305.25 176.109375 " clip-rule="nonzero"/></clipPath><clipPath id="cbf4b7a13a"><path d="M 305.25 176.109375 L 310.472656 179.414062 L 189.4375 370.855469 L 184.210938 367.554688 Z M 305.25 176.109375 " clip-rule="nonzero"/></clipPath><clipPath id="f8b89854cb"><path d="M 67 178 L 192 178 L 192 368 L 67 368 Z M 67 178 " clip-rule="nonzero"/></clipPath><clipPath id="e89064bf05"><path d="M 67.914062 183.492188 L 76.828125 177.859375 L 193.214844 362.152344 L 184.300781 367.785156 Z M 67.914062 183.492188 " clip-rule="nonzero"/></clipPath><clipPath id="c6387315f7"><path d="M 67.914062 183.492188 L 75.53125 178.679688 L 191.699219 362.625 L 184.078125 367.4375 Z M 67.914062 183.492188 " clip-rule="nonzero"/></clipPath><clipPath id="34eb1a0ed4"><path d="M 186 174 L 310 174 L 310 364 L 186 364 Z M 186 174 " clip-rule="nonzero"/></clipPath><clipPath id="c5e1243ab9"><path d="M 302.484375 174.792969 L 311.398438 180.425781 L 194.992188 364.707031 L 186.078125 359.074219 Z M 302.484375 174.792969 " clip-rule="nonzero"/></clipPath><clipPath id="fc831e5a56"><path d="M 302.484375 174.792969 L 310.101562 179.605469 L 193.914062 363.539062 L 186.296875 358.726562 Z M 302.484375 174.792969 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#a74ca2469c)"><path fill="#000000" d="M 0 0 L 374.414062 0 L 374.414062 374.414062 L 0 374.414062 Z M 0 0 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#745c1e4b38)"><path fill="#ff0303" d="M 304.347656 188.660156 L 256.382812 264.410156 L 304.347656 340.160156 L 352.308594 264.410156 Z M 304.347656 188.660156 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#f67538f76a)"><path fill="#ff0303" d="M 70.988281 188.660156 L 23.023438 264.410156 L 70.988281 340.160156 L 118.953125 264.410156 Z M 70.988281 188.660156 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#39f422669e)"><g clip-path="url(#0d75127bdd)"><path fill="#ff0303" d="M 60.300781 278.597656 L 315.183594 278.597656 L 315.183594 368.246094 L 60.300781 368.246094 Z M 60.300781 278.597656 " fill-opacity="1" fill-rule="nonzero"/></g></g><g clip-path="url(#4e0d9cf257)"><path fill="#ff0303" d="M 187.445312 3.171875 L 73.914062 183.171875 L 187.445312 363.171875 L 300.980469 183.171875 Z M 187.445312 3.171875 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#5bbd017dab)"><g clip-path="url(#bd25bdc5f3)"><g clip-path="url(#a4847ade85)"><path fill="#ff0303" d="M 152.726562 317.546875 L 84.46875 360.894531 L 24.160156 265.925781 L 92.417969 222.578125 Z M 152.726562 317.546875 " fill-opacity="1" fill-rule="nonzero"/></g></g></g><g clip-path="url(#f3887c7db3)"><g clip-path="url(#987c5a6dac)"><g clip-path="url(#a1668f6f8f)"><path fill="#ff0303" d="M 290.152344 362.125 L 221.890625 318.78125 L 282.199219 223.808594 L 350.457031 267.152344 Z M 290.152344 362.125 " fill-opacity="1" fill-rule="nonzero"/></g></g></g><g clip-path="url(#09996a2207)"><g clip-path="url(#7c861ef972)"><g clip-path="url(#349b26d892)"><path fill="#000000" d="M 64.945312 179.417969 L 70.890625 175.664062 L 191.96875 367.390625 L 186.027344 371.144531 Z M 64.945312 179.417969 " fill-opacity="1" fill-rule="nonzero"/></g></g></g><g clip-path="url(#11caef1636)"><g clip-path="url(#78ef07bbb9)"><g clip-path="url(#cbf4b7a13a)"><path fill="#000000" d="M 305.25 176.109375 L 311.191406 179.867188 L 190.015625 371.53125 L 184.070312 367.773438 Z M 305.25 176.109375 " fill-opacity="1" fill-rule="nonzero"/></g></g></g><g clip-path="url(#f8b89854cb)"><g clip-path="url(#e89064bf05)"><g clip-path="url(#c6387315f7)"><path fill="#000000" d="M 67.914062 183.492188 L 75.34375 178.796875 L 191.730469 363.09375 L 184.300781 367.785156 Z M 67.914062 183.492188 " fill-opacity="1" fill-rule="nonzero"/></g></g></g><g clip-path="url(#34eb1a0ed4)"><g clip-path="url(#c5e1243ab9)"><g clip-path="url(#fc831e5a56)"><path fill="#000000" d="M 302.484375 174.792969 L 309.914062 179.488281 L 193.507812 363.769531 L 186.078125 359.074219 Z M 302.484375 174.792969 " fill-opacity="1" fill-rule="nonzero"/></g></g></g></svg>
			</v-app-bar-nav-icon>
			<v-app-bar-title text="Unraid Simple Backups" ></v-app-bar-title>
		</v-app-bar>

		<sideBar></sideBar>

		<v-main style="height: calc(100% - 64px);">
			<v-container fluid class="full-height pa-0">
				<v-row class="full-height" no-gutters>
					<v-col cols="4" class="overflow-y-auto middleColumn">
						<slot name="middle"></slot>
					</v-col>
					<v-col cols="8" class="overflow-y-auto">
						<slot name="right"></slot>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>
  
<script>
import sideBar from './SideBar.vue';

export default {
	name: 'Layout',
	components: {
		sideBar
	},
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
  
<template lang="jade">
Topbar(title="Learn Halfstak")
Navbar
main.mdl-layout__content.mdl-color--grey-100
	.mdl-grid.demo-content
		.mdl-grid
			.mdl-cell--4-col
				Lrn-Video
			.mdl-cell--4-col
				Lrn-Video
			.mdl-cell--4-col
				Lrn-Video
			.mdl-cell--4-col
				Lrn-Video
			.mdl-cell--4-col
				Lrn-Video
			.mdl-cell--4-col
				Lrn-Video
</template>

<script>
import Store from '../vuex/Store.js'
import Navbar from './Navbar'
import Topbar from './Topbar'
import LrnVideo from './LrnVideo'
export default {
	store: Store,

	components: {
		Navbar,
		Topbar,
		LrnVideo
	},

	ready () {
		this.$nextTick(() => {
			componentHandler.upgradeDom()
			componentHandler.upgradeAllRegistered()
		})
	}
}
</script>

<style lang="stylus">
@import '../main.styl'
</style>

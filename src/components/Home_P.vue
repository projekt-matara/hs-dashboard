<template lang="jade">
Topbar(title="Home")
Navbar
main.mdl-layout__content.mdl-color--grey-100
	.mdl-grid.demo-content
		.mdl-cell--6-col
			Downloader
		.mdl-cell--6-col
			Pay-Setup
</template>

<script>
import Store from '../vuex/Store'
import Navbar from './Navbar'
import Topbar from './Topbar'
import Downloader from './Downloader'
import PaySetup from './PaySetup'

export default {
	components: {
		Navbar,
		Topbar,
		Downloader,
		PaySetup
  },

  store: Store,

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

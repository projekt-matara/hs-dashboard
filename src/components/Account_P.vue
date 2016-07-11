<template lang="jade">
Topbar(title="Account")
Navbar
main.mdl-layout__content.mdl-color--grey-100
	.mdl-grid.demo-content
		.mdl-cell--12-col
			Acct-Settings
		.mdl-cell--6-col.nudge
			Acct-Delete
</template>

<script>
import Store from '../vuex/Store.js'
import Navbar from './Navbar'
import Topbar from './Topbar'
import AcctSettings from './AcctSettings'
import AcctDelete from './AcctDelete'
import EditEmailModal from './EditEmailModal'
export default {
	store: Store,

	components: {
		Navbar,
		Topbar,
		AcctSettings,
		AcctDelete,
		EditEmailModal
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

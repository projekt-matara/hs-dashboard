<template lang="jade">
Topbar(title="Payment")
Navbar
main.mdl-layout__content.mdl-color--grey-100
	.mdl-grid.demo-content
		.mdl-cell--12-col
			Pay-Details
		.mdl-cell--12-col.nudge
			Pay-Card
</template>

<script>
import Store from '../vuex/Store.js'
import Navbar from './Navbar'
import Topbar from './Topbar'
import PayDetails from './PayDetails'
import PayCard from './PayCard'
import EditEmailModal from './EditEmailModal'
export default {
	store: Store,

	components: {
		Navbar,
		Topbar,
		PayDetails,
		PayCard,
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

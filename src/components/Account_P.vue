<template lang="jade">
Topbar(title="Account")
Navbar
main.mdl-layout__content.mdl-color--grey-100
	.mdl-grid.demo-content
		.mdl-cell--12-col
			Acct-Settings(:email="profile.email", :id="profile.id")
		.mdl-cell--6-col.nudge
			Acct-Delete(:id="profile.id")
</template>

<script>
import Store from '../vuex/Store.js'
import Navbar from './Navbar'
import Topbar from './Topbar'
import AcctSettings from './AcctSettings'
import AcctDelete from './AcctDelete'
import EditEmailModal from './EditEmailModal'
import auth from '../auth/auth'
import {getFullProfile} from '../vuex/getFullProfile'

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
	},

	vuex: {
		getters: {
			profile: getFullProfile
		}
	},

	route: {
		canActivate (transition) {
			if (auth.user.authenticated) {
				transition.next()
			} else {
				transition.redirect('/login')
			}
		}
	}
}
</script>

<style lang="stylus">
@import '../main.styl'
</style>

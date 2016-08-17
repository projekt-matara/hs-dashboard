<template lang="jade">
Topbar(title="Account")
Navbar
main.mdl-layout__content.mdl-color--grey-100
	div(v-show="!loadState")
		.mdl-grid.demo-content
			.mdl-cell--12-col
				acct-settings(
				:email="profile.email", 
				:id="profile.id", 
				:stripe-status="profile.stripeStatus")
			.mdl-cell--6-col.nudge
				acct-delete(
				:user-id="profile.id", 
				:stripe-id="profile.stripeId", 
				:stripe-status="profile.stripeStatus")
	div(v-else)
		.mdl-grid.demo-content
			.mdl-cell--12-col
				div(
				id="p1",
				class="mdl-spinner mdl-js-spinner is-active")
</template>

<script>
import Store from '../vuex/Store.js'
import Navbar from './Navbar'
import Topbar from './Topbar'
import AcctSettings from './AcctSettings'
import AcctDelete from './AcctDelete'
import EditEmail from './EditEmail'
import auth from '../auth/auth'
import {getFullProfile} from '../vuex/getFullProfile'
import {getLoadState} from '../vuex/getLoadState'
import {setLoadState} from '../vuex/setLoadState'

export default {
	store: Store,

	components: {
		Navbar,
		Topbar,
		AcctSettings,
		AcctDelete,
		EditEmail
	},

	ready () {
		this.setLoadState(false)
		this.$nextTick(() => {
			componentHandler.upgradeDom()
			componentHandler.upgradeAllRegistered()
		})
	},

	vuex: {
		getters: {
			profile: getFullProfile,
			loadState: getLoadState
		},
		actions: {
			setLoadState
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

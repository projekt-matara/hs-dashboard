<template lang="jade">
Topbar(title="Delete Account")
Navbar
main.mdl-layout__content.mdl-color--grey-100
	div(v-show="!loadState")
		.mdl-grid
		.mdl-cell--12-col
			#kill_account.demo-card-event.mdl-card.mdl-shadow--2dp
				.mdl-card__title.mdl-card--expand
					h2.mdl-card__title-text Delete Account
				.mdl-card__supporting-text
					p Are you sure you wish to delete your account? Remember this action cannot be undone. 
				.mdl-card__actions
					button(
					@click="delAcct()"
					class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect") Delete Account
	div(v-else)
		.mdl-grid.demo-content
			.mdl-cell--12-col
				div(
				id="p1",
				class="mdl-spinner mdl-js-spinner is-active") 
</template>

<script>
import Store from '../vuex/Store'
import {getFullProfile} from '../vuex/getFullProfile'
import Topbar from './Topbar'
import Navbar from './Navbar'
import auth from '../auth/auth'
import {getLoadState} from '../vuex/getLoadState'
import {setLoadState} from '../vuex/setLoadState'

export default {
	store: Store,

	components: {
		Topbar,
		Navbar
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
	},

	ready () {
		this.setLoadState(false)
		this.$nextTick(() => {
			componentHandler.upgradeDom()
			componentHandler.upgradeAllRegistered()
		})
	},

	methods: {
		delAcct () {
			const self = this
			const jwtHeader = {'Authorization': 'Bearer ' + localStorage.getItem('idToken')}
			self.$http.put('http://localhost:3000/delete_user', {
				stripeId: self.profile.stripeId,
				userId: self.profile.id,
				stripeStatus: self.profile.stripeStatus
			}, {
				headers: jwtHeader
			})
			.then((response) => {
				auth.logout()
			})
			.catch((err) => {
				console.log(err)
			})
		}
	}
}
</script>

<style lang="stylus">
@import '../main.styl'
</style>

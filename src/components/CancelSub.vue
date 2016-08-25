<template lang="jade">
Topbar(title="Cancel Subscription")
Navbar
main.mdl-layout__content.mdl-color--grey-100
	div(v-show="!loadState")
		.mdl-grid
		.mdl-cell--12-col
			#edit_email.demo-card-event.mdl-card.mdl-shadow--2dp
				.mdl-card__title.mdl-card--expand
					h2.mdl-card__title-text Cancel Subscription
				.mdl-card__supporting-text
					p This will cancel your payments, delete your card, and deactivate your access to the Halfstak app. However you will still be able to access your account any time that you need to. 
				.mdl-card__actions
					button(
					@click="cancelSub()"
					class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect") Cancel Subscription
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
import {setCustomer} from '../vuex/setCustomer'
import {router} from '../main.js'
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
			setCustomer,
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
		cancelSub () {
			const self = this
			const jwtHeader = {'Authorization': 'Bearer ' + localStorage.getItem('idToken')}
			this.setLoadState(true)
			self.$http.put('http://localhost:3000/stripe/cancelsubscription', {
				stripeId: self.profile.stripeId,
				userId: self.profile.id
			}, {headers: jwtHeader})
			.then((response) => {
				const profile = {
					stripeId: '',
					cardId: '',
					stripeStatus: false,
					stripeEmail: '',
					stripeCountry: '',
					stripeDigits: '',
					stripeBrand: '',
					stripeExp: '',
					stripeExpMonth: '',
					stripeExpYear: ''
				}
				this.setCustomer(profile)
				this.setLoadState(false)
				router.go('payment')
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
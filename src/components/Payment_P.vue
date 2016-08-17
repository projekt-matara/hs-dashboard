<template lang="jade">
Topbar(title="Payment")
Navbar
main.mdl-layout__content.mdl-color--grey-100
	div(v-show="!loadState")
		div(v-if="profile.stripeStatus == true")
			.mdl-grid.demo-content
				.mdl-cell--12-col
					Pay-Details(
					:stripe-email="profile.stripeEmail", 
					:stripe-status="profile.stripeStatus")
				.mdl-cell--12-col.nudge
					Pay-Card(
						:stripe-email="profile.stripeEmail",
						:stripe-country="profile.stripeCountry",
						:stripe-digits="profile.stripeDigits",
						:stripe-brand="profile.stripeBrand",
						:stripe-exp="profile.stripeExp")
		div(v-else)
			.mdl-grid.demo-content
				.mdl-cell--12-col
					.mdl-card.mdl-shadow--2dp.card-size-stack
						.mdl-card__title
							.mdl-card__title-text.card-title No payment information to display.
						.mdl-card__supporting-text
							p It appears you haven't set up your payment information yet. Go to Home and set up your payment processing to download Halfstak and take full advantage of all it has to offer. 
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
import PayDetails from './PayDetails'
import PayCard from './PayCard'
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
		PayDetails,
		PayCard,
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

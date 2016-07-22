<template lang="jade">
Topbar(title="Edit Payment Email")
Navbar
main.mdl-layout__content.mdl-color--grey-100
	.mdl-grid
	.mdl-cell--12-col
		#edit_email.demo-card-event.mdl-card.mdl-shadow--2dp
			.mdl-card__title.mdl-card--expand
				h2.mdl-card__title-text Enter new payment email
			.mdl-card__supporting-text
				form(@submit.prevent="onSubmit()", @submit="editPayEmail()")
					.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
						input(class="mdl-textfield__input", type="text", name="email", v-model="payEmail")
						label(class="mdl-textfield__label", for="email") New payment email
					.mdl-card__actions
						input(type="submit" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" value="Change Email")
</template>

<script>
import Store from '../vuex/Store'
import {getPayEmail} from '../vuex/getPayEmail'
import {userId} from '../vuex/userId'
import {userStripeId} from '../vuex/userStripeId'
import {updatePaymentEmail} from '../vuex/updatePaymentEmail'
import {router} from '../main'
import Topbar from './Topbar'
import Navbar from './Navbar'
import auth from '../auth/auth'

export default {
	store: Store,

	components: {
		Topbar,
		Navbar
	},

	vuex: {
		getters: {
			getPayEmail,
			userId,
			userStripeId
		},
		actions: {
			updatePaymentEmail
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

	data () {
		return {
			payEmail: this.getPayEmail
		}
	},

	ready () {
		this.$nextTick(() => {
			componentHandler.upgradeDom()
			componentHandler.upgradeAllRegistered()
		})
	},

	methods: {
		editPayEmail () {
			const newEmail = this.payEmail
			const userId = this.userId
			const stripeId = this.userStripeId
			this.$http.put('http://localhost:3000/stripe/editpayemail', {
				newEmail,
				userId,
				stripeId
			})
			.then((response) => {
				this.updatePaymentEmail(JSON.parse(response.body).newPayEmail)
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

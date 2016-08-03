<template lang="jade">
Topbar(title="Change Card")
Navbar
main.mdl-layout__content.mdl-color--grey-100
	.mdl-grid
	.mdl-cell--12-col
		#edit_email.demo-card-event.mdl-card.mdl-shadow--2dp
			.mdl-card__title.mdl-card--expand
				h2.mdl-card__title-text Change Card
			.mdl-card__supporting-text
				form(
				@submit.prevent="onSubmit()", 
				@submit="changeCard()")
					.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
						input(
						class="mdl-textfield__input", 
						type="email", 
						required, 
						id="new_email"
						v-model="email")
						label(
						class="mdl-textfield__label", 
						for="new_email") New payment email
					.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
						input(
						class="mdl-textfield__input", 
						type="text", 
						required, 
						id="card_number", 
						autocomplete="cc-number"
						v-model="card")
						label(
						class="mdl-textfield__label", 
						for="card_number") Card number
					.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
						input(
						class="mdl-textfield__input", 
						type="text", 
						required, 
						id="cvc", 
						autocomplete="off",
						v-model="cvc")
						label(
						class="mdl-textfield__label", 
						for="cvc") CVC
					.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
						input(
						class="mdl-textfield__input", 
						type="text", 
						required, 
						id="exp", 
						autocomplete="cc-exp",
						v-model="exp")
						label(
						class="mdl-textfield__label", 
						for="exp") MM/YYYY
					.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
						input(
						class="mdl-textfield__input", 
						type="text", 
						required, 
						id="zip_code", 
						size="5",
						v-model="zip")
						label(
						class="mdl-textfield__label", 
						for="zip_code") Zip Code
					.mdl-card__actions
						input(
						class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect",
						type="submit"
						value="Change Card") 
</template>

<script>
import Store from '../vuex/Store'
import {getFullProfile} from '../vuex/getFullProfile'
import {config} from '../config.js'
import payment from 'payment'
// import {router} from '../main'
import Topbar from './Topbar'
import Navbar from './Navbar'
import auth from '../auth/auth'

export default{
	route: {
		canActivate (transition) {
			if (auth.user.authenticated) {
				transition.next()
			} else {
				transition.redirect('/login')
			}
		}
	},

	store: Store,

	components: {
		Topbar,
		Navbar
	},

	ready () {
		this.$nextTick(() => {
			componentHandler.upgradeDom()
			componentHandler.upgradeAllRegistered()
		})
		payment.formatCardNumber(document.querySelector('#card_number'))
		payment.formatCardCVC(document.querySelector('input#cvc'))
		payment.formatCardExpiry(document.querySelector('input#exp'))
	},

	data () {
		return {
			email: '',
			card: '',
			cvc: '',
			exp: '',
			zip: ''
		}
	},

	vuex: {
		getters: {
			profile: getFullProfile
		}
	},

	methods: {
		changeCard () {
			const email = this.email
			const card = this.card
			const cvc = this.cvc
			const exp = this.exp
			const zip = this.zip
			const expMonth = exp.slice(0, 2)
			const expYear = exp.slice(5)
			const cardValidate = payment.fns.validateCardNumber(card)
			const cvcValidate = payment.fns.validateCardCVC(cvc)
			const expValidate = payment.fns.validateCardExpiry(expMonth, expYear)

			if (cardValidate === true &&
					cvcValidate === true &&
					expValidate === true) {
				const pubKey = config().stripe.pubKey
				Stripe.setPublishableKey(pubKey)
				Stripe.card.createToken({
					number: card,
					exp_month: expMonth,
					exp_year: expYear,
					cvc,
					name: email
				}, (err, token) => {
					if (err) {
						console.log(err)
					} else {
						console.log(token.id)
					}
				})
				// this.$http.post('https://api.stripe.com/v1/tokens', {
				// 	emulateJSON: true,
				// 	headers: {
				// 		Authorization: 'Bearer ' + pubKey
				// 	},
				// 	body: {
				// 		number: card,
				// 		exp_month: expMonth,
				// 		exp_year: expYear,
				// 		cvc,
				// 		name: email
				// 	}
				// })
			} else {
				console.log('There is a problem with your form. Please try again')
				console.log(email)
				console.log(card)
				console.log(cvc)
				console.log(exp)
				console.log(zip)

				console.log(cardValidate)
				console.log(cvcValidate)
				console.log(expValidate)
			}
		}
	}
}
</script>

<style lang="stylus">
@import '../main.styl'
</style>

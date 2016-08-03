<template lang="jade">
.mdl-card.mdl-shadow--2dp.card-size#pay_setup
		.mdl-card__title.mdl-card--expand
			h4 Setup Payment Method and Subscription
		.mdl-card__actions.mdl-card--border
			a(class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect setup_pay", @click="openStripe") Subscribe
			i.material-icons credit_card
</template>

<script>
import Store from '../vuex/Store'
import {setCustomer} from '../vuex/setCustomer'

export default {
	methods: {
		openStripe () {
			const self = this
			const handler = StripeCheckout.configure({
				key: 'pk_test_sGsIRcrMlwumzh9pYtBqRAtb',
				token: (token) => {
					self.$http.post('http://localhost:3000/stripe/create', {
						token: token.id,
						email: token.email,
						id: self.id
					}).then((result) => {
						// you should be getting a nice clean json with the information to update the Store
						const res = JSON.parse(result.body)
						const x = {
							cardId: res.body.user_metadata.card_id,
							stripeStatus: res.body.user_metadata.stripe_status,
							stripeEmail: res.body.user_metadata.stripe_email,
							stripeCountry: res.body.user_metadata.stripe_country,
							stripeDigits: res.body.user_metadata.stripe_digits,
							stripeBrand: res.body.user_metadata.stripe_brand,
							stripeExp: res.body.user_metadata.stripe_exp,
							stripeExpMonth: res.body.user_metadata.stripe_exp_month,
							stripeExpYear: res.body.user_metadata.stripe_exp_year,
							stripeId: res.body.user_metadata.stripe_id
						}
						self.setCustomer(x)
					}).catch((err) => {
						console.log(err)
					})
				}
			})
			handler.open({
				name: 'Matara',
				description: 'Subscription for Halfstak',
				amount: 695,
				zipCode: true
			})
		}
	},

	vuex: {
		actions: {
			setCustomer
		}
	},

	props: ['id'],

	store: Store
}
</script>

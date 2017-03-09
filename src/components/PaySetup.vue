<template lang="jade">
.mdl-card.mdl-shadow--2dp.card-size#pay_setup
		.mdl-card__title.mdl-card--expand
			h4 Setup Payment Method and Subscription
		.mdl-card__actions.mdl-card--border
			a(
			class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect setup_pay", 
			@click="openStripe") Subscribe
			i.material-icons credit_card
</template>

<script>
import Store from '../vuex/Store'
import {setCustomer} from '../vuex/setCustomer'
import {setLoadState} from '../vuex/setLoadState'

export default {
	methods: {
		openStripe () {
			const self = this
			const handler = StripeCheckout.configure({
				key: 'pk_test_sGsIRcrMlwumzh9pYtBqRAtb',
				token: (token) => {
					const jwtHeader = {'Authorization': 'Bearer ' + localStorage.getItem('idToken')}
					const restUrl = 'http://localhost:3000/stripe/createcustomer'
					self.$http.put(restUrl, {
						token: token.id,
						email: token.email,
						id: self.id
					}, {headers: jwtHeader})
					.then((result) => {
						// you should be getting a nice clean json with the information to update the Store
						const res = result.data
						self.setCustomer({
							cardId: res.cardId,
							stripeStatus: res.stripeStatus,
							stripeEmail: res.stripeEmail,
							stripeCountry: res.stripeCountry,
							stripeDigits: res.stripeDigits,
							stripeBrand: res.stripeBrand,
							stripeExp: res.stripeExp,
							stripeExpMonth: res.stripeExpMonth,
							stripeExpYear: res.stripeExpYear,
							stripeId: res.stripeId
						})
					}).catch((err) => {
						console.log(err)
					})
				}
			})
			handler.open({
				name: 'Matara',
				description: 'Subscription for Halfstak',
				amount: 700,
				zipCode: true
			})
		}
	},

	vuex: {
		actions: {
			setCustomer,
			setLoadState
		}
	},

	props: ['id'],

	store: Store
}
</script>

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
const self = this
const urlRoot = 'http://localhost:3000'
const resource = this.$resource(urlRoot + '/stripe/create')
const handler = StripeCheckout.configure({
	key: 'pk_test_sGsIRcrMlwumzh9pYtBqRAtb',
	token: (token) => {
		resource.save({id: self.id}, {
			token: token.id,
			email: token.email
		})
	}
})

export default {
	methods: {
		openStripe () {
			handler.open({
				name: 'Matara',
				description: 'Subscription for Halfstak',
				amount: 695,
				zipCode: true
			})
		}
	},

	props: ['id'],

	store: Store
}
</script>

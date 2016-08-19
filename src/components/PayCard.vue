<template lang="jade">
//- Change-Card
.mdl-card.mdl-shadow--2dp.card-size-stack#pay_card
	.mdl-card__title
		.mdl-card__title-text.card-title Card Information
	.mdl-card__supporting-text
		.mdl-grid
			.mdl-cell--4-col
				h5 Email
				p  {{stripeEmail}}
			.mdl-cell--4-col
				h5 Country
				p {{stripeCountry}}
			.mdl-cell--4-col
				h5 Last 4 Digits on Card
				p {{stripeDigits}}
			.mdl-cell--4-col
				h5 Brand
				p {{stripeBrand}}
			.mdl-cell--4-col
				h5 Expiration
				p {{stripeExp}}
	.mdl-card__actions.mdl-card--border
		a(
		class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect change_card",
		@click="changeCard()") Change Card
</template>

<script>
import ChangeCard from './ChangeCard'
import Store from '../vuex/Store'
import {getFullProfile} from '../vuex/getFullProfile'
import {setCard} from '../vuex/setCard'
export default {
	components: {
		ChangeCard
	},

	store: Store,

	vuex: {
		getters: {
			profile: getFullProfile
		},
		actions: {
			setCard
		}
	},

	props: [
		'stripeEmail',
		'stripeCountry',
		'stripeDigits',
		'stripeBrand',
		'stripeExp',
		'stripeStatus'
	],

	methods: {
		changeCard () {
			const self = this
			const handler = StripeCheckout.configure({
				key: 'pk_test_sGsIRcrMlwumzh9pYtBqRAtb',
				token: (token) => {
					self.$http.put('http://localhost:3000/stripe/changecard', {
						token: token.id,
						email: token.email,
						id: self.profile.id,
						cardId: self.profile.cardId,
						stripeId: self.profile.stripeId
					}).then((result) => {
						const res = JSON.parse(result.body)
						self.setCard(res)
					}).catch((err) => {
						console.log(err)
					})
				}
			})
			handler.open({
				name: 'Matara',
				description: 'Change card for subscription',
				zipCode: true,
				panelLabel: 'Change Card',
				email: self.profile.stripeEmail,
				allowRememberMe: false
			})
		}
	},

	ready () {
		this.$nextTick(() => {
			componentHandler.upgradeDom()
			componentHandler.upgradeAllRegistered()
		})
	}
}
</script>

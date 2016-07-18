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
		a(class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect change_card") Change Card
</template>

<script>
import ChangeCard from './ChangeCard'
export default {
	components: {
		ChangeCard
	},

	props: [
		'stripeEmail',
		'stripeCountry',
		'stripeDigits',
		'stripeBrand',
		'stripeExp',
		'stripeStatus'
	]
}
</script>

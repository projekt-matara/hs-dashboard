<template lang="jade">
//- Edit-Email-Modal
.mdl-card.mdl-shadow--2dp.card-size-stack#pay_details
	.mdl-card__title
		.mdl-card__title-text.card-title Payment Details
	.mdl-card__supporting-text
		ul.mdl-list
			// Email
			li(class="mdl-list__item mdl-list__item--three-line")
				span.mdl-list__item-primary-content
					i.material-icons.mdl-list__item-avatar email
					span Payment Email
					span.mdl-list__item-text-body {{stripeEmail}}
				span.mdl-list__item-secondary-content
					a(v-link="{name: 'edit-pay-email'}", class="mdl-list__item-secondary-action edit_email")
						i.material-icons create
			// Subscription
			li.mdl-list__item.mdl-list__item--three-line
				span.mdl-list__item-primary-content
					i.material-icons.mdl-list__item-avatar payment
					span Subscription
					span.mdl-list__item-text-body {{status}}
	.mdl-card__actions.mdl-card--border
		a(
		class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect change_card"
		v-link="{name: 'cancel-sub'}") Cancel Subscription
</template>

<script>
import EditEmail from './EditEmail'
export default {
	components: {
		EditEmail
	},

	props: [
		'stripeEmail',
		'stripeStatus'
	],

	computed: {
		status () {
			if (this.stripeStatus === true) {
				return 'Active: $6.95 per month.'
			} else {
				return 'Inactive'
			}
		}
	}
}
</script>

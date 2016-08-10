<template lang="jade">
.mdl-card.mdl-shadow--2dp.card-size-stack#acct_settings
	.mdl-card__title
		.mdl-card__title-text.card-title Account Settings
	.mdl-card__supporting-text
		ul.mdl-list
			// Email
			li.mdl-list__item.mdl-list__item--three-line
				span.mdl-list__item-primary-content
					i.material-icons.mdl-list__item-avatar email
					span Email
					span.mdl-list__item-text-body {{email}}
				span.mdl-list__item-secondary-content
					a(v-link="{name: 'edit-email'}", 
					class="mdl-list__item-secondary-action edit_email")
						i.material-icons create
			// Password
			li.mdl-list__item.mdl-list__item--three-line
				span.mdl-list__item-primary-content
					i.material-icons.mdl-list__item-avatar lock
					span Password
					span.mdl-list__item-text-body Change password.
				span.mdl-list__item-secondary-content
					a(v-link="{name: 'change-password'}",
					class="mdl-list__item-secondary-action")
						i.material-icons create
			// Subscription
			li.mdl-list__item.mdl-list__item--three-line
				span.mdl-list__item-primary-content
					i.material-icons.mdl-list__item-avatar payment
					span Subscription Status
					span.mdl-list__item-text-body {{status}}
</template>

<script>
export default {
	props: [
		'email',
		'id',
		'stripeStatus'
	],

	computed: {
		status () {
			switch (this.stripeStatus) {
				case true:
					return 'Active: $6.95 per month.'
				default:
					return 'Inactive'
			}
		}
	}
}
</script>

<style lang="stylus">
@import '../main.styl'
</style>

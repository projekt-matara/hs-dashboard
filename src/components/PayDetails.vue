<template lang="jade">
//- Edit-Email-Modal
.mdl-card.mdl-shadow--2dp.card-size-stack#pay_details
	.mdl-card__title
		.mdl-card__title-text.card-title Payment Details
	.mdl-card__supporting-text
		ul.mdl-list
			// Email
			li.mdl-list__item.mdl-list__item--three-line
				span.mdl-list__item-primary-content
					i.material-icons.mdl-list__item-avatar email
					span Payment Email
					span.mdl-list__item-text-body email@email.com
				span.mdl-list__item-secondary-content
					a(href="#", class="mdl-list__item-secondary-action edit_email")
						i.material-icons create
			// Subscription
			li.mdl-list__item.mdl-list__item--three-line
				span.mdl-list__item-primary-content
					i.material-icons.mdl-list__item-avatar payment
					span Subscription
					span.mdl-list__item-text-body Active
				span.mdl-list__item-secondary-content
					a(href="#", class="mdl-list__item-secondary-action")
						i.material-icons create
</template>

<script>
import EditEmailModal from './EditEmailModal'
export default {
	components: {
		EditEmailModal
	}
}
</script>

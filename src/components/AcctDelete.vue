<!--
Account Delete Component
Parent: Account_P
Purpose: Allow the user to delete their account
-->
<template lang="jade">
.mdl-card.mdl-shadow--2dp.card-size-stack#acct_delete
	.mdl-card__title
		.mdl-card__title-text.card-title Delete Account
	.mdl-card__supporting-text
		| Please be careful before you take this action. This will cancel your subscription, 
		| delete all data associated with you (including tone data),
		| remove all payment details,
		| and deactivate the downloaded Halfstak app. 
		| Make absolutely sure you want to do this before proceeding as this cannot be revoked. 
	.mdl-card__actions.mdl-card--border
			a(
			v-link="{name: 'kill-account'}",
			class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect") Delete My Account
</template>

<script>
export default {
}
</script>

<style lang="stylus">
@import '../main.styl'
</style>

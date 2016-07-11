<template lang="jade">
#edit_email.mfp-hide.form_modal
	form(action="#", id="edit_email_form")
		.mdl-textfield.mdl-js-textfield
			input(class="mdl-textfield__input", type="email", autofocus="true", id="new_email")
			label(class="mdl-textfield__label", for="new_email") New email
		.mdl-textfield.mdl-js-textfield
			input(class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored submit_new_email", type="submit")
</template>

<script>
export default {
}
</script>

<style lang="stylus">
@import '../main.styl'
</style>

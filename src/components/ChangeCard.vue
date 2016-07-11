<template lang="jade">
#change_card_modal.mfp-hide.form_modal
	form(action="#", id="change_card_form", autocomplete="on")
		.mdl-textfield.mdl-js-textfield
			input(class="mdl-textfield__input", type="email", autofocus, required, id="new_email")
			label(class="mdl-textfield__label", for="new_email") New payment email
		.mdl-textfield.mdl-js-textfield
			input(class="mdl-textfield__input", type="text", required, id="card_number", autocomplete="cc-number")
			label(class="mdl-textfield__label", for="card_number") Card number
		.mdl-textfield.mdl-js-textfield
			input(class="mdl-textfield__input", type="text", required, id="cvc", autocomplete="off")
			label(class="mdl-textfield__label", for="cvc") CVC
		.mdl-textfield.mdl-js-textfield
			input(class="mdl-textfield__input", type="text", required, id="exp", autocomplete="cc-exp")
			label(class="mdl-textfield__label", for="exp") MM/YYYY
		.mdl-textfield.mdl-js-textfield
			input(class="mdl-textfield__input", type="text", required, id="zip_code", size="5")
			label(class="mdl-textfield__label", for="zip_code") Zip Code
		.mdl-textfield.mdl-js-textfield
			input(class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored", type="submit")
</template>

<script>
export default{
}
</script>

<style lang="stylus">
@import '../main.styl'
</style>

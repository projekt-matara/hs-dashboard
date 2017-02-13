<template lang="jade">
.mdl-grid#login
	.mdl-cell--12-col
		h2#headline Forgot Password
		#the_form.demo-card-event.mdl-card.mdl-shadow--2dp
			.mdl-card__title.mdl-card--expand
				h2.mdl-card__title-text Change Password 
			.mdl-card__supporting-text Enter your email below and we will email you a way to create a new password for your account.
				form(@submit.prevent="onSubmit()", @submit="changePassword()")
					.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
						input(class="mdl-textfield__input", type="text", name="email", v-model="email")
						label(class="mdl-textfield__label", for="email") Email
					.mdl-card__actions
						input(type="submit" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" value="Change Password")
		div(
		class="demo-card-event mdl-card mdl-shadow--2dp"
		id="password_success"
		v-if="changeSuccess")
			.mdl-card__title.mdl-card--expand
				h2.mdl-card__title-text Email sent
			.mdl-card__supporting-text
				p Check your email to change your password.
			.mdl-card__actions
						button(
						class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" 
						@click="backToLogin()") Back to login
</template>

<script>
import {router} from '../main'

export default {
	data () {
		return {
			email: '',
			changeSuccess: false
		}
	},

	ready () {
		this.$nextTick(() => {
			componentHandler.upgradeDom()
			componentHandler.upgradeAllRegistered()
		})
	},

	methods: {
		changePassword () {
			this
			.$http
			.post('https://halfstak.auth0.com/dbconnections/change_password', {
				email: this.email,
				clientId: 'LXrECoaQZHEP9TAe8ceisjDd0q49uDDI',
				connection: 'Username-Password-Authentication'
			})
			.then((response) => {
				this.changeSuccess = true
			})
			.catch((err) => {
				console.log(err)
			})
		},

		backToLogin () {
			router.go('login')
		}
	}
}
</script>

<style lang="stylus">
@import '../main.styl'
</style>

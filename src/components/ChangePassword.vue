<template lang="jade">
Topbar(title="Change Password")
Navbar
main.mdl-layout__content.mdl-color--grey-100
	.mdl-grid
	.mdl-cell--12-col
		#edit_email.demo-card-event.mdl-card.mdl-shadow--2dp
			.mdl-card__title.mdl-card--expand
				h2.mdl-card__title-text Change password
			.mdl-card__supporting-text
				p To change your password, click the button below then check your email. From there you will then be able to change your password.
			.mdl-card__actions
						button(
						class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" 
						@click="changePassword") Change Password
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
						@click="backToAccount()") Back to account
</template>

<script>
import Store from '../vuex/Store'
import {userId} from '../vuex/userId'
import {userEmail} from '../vuex/userEmail'
import {router} from '../main'
import Topbar from './Topbar'
import Navbar from './Navbar'
import auth from '../auth/auth'

export default {
	store: Store,

	components: {
		Topbar,
		Navbar
	},

	vuex: {
		getters: {
			userId,
			userEmail
		}
	},

	route: {
		canActivate (transition) {
			if (auth.user.authenticated) {
				transition.next()
			} else {
				transition.redirect('/login')
			}
		}
	},

	data () {
		return {
			password: '',
			confirmPassword: '',
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
				email: this.userEmail,
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
		backToAccount () {
			router.go('account')
		}
	}
}
</script>

<style lang="stylus">
@import '../main.styl'
</style>

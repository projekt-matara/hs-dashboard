<template lang="jade">
Topbar(title="Change Password")
Navbar
main.mdl-layout__content.mdl-color--grey-100
	.mdl-grid
	.mdl-cell--12-col
		#edit_email.demo-card-event.mdl-card.mdl-shadow--2dp
			.mdl-card__title.mdl-card--expand
				h2.mdl-card__title-text Change Password
			.mdl-card__supporting-text
				form(@submit.prevent="onSubmit()", @submit="changePassword()")
					.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
						input(class="mdl-textfield__input", type="password", name="oldpassword", v-model="oldpassword")
						label(class="mdl-textfield__label", for="oldpassword") Old Password
					.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
						input(class="mdl-textfield__input" type="password", name="newpassword", v-model="newpassword")
						label(class="mdl-textfield__label" for="newpassword") New Password
					.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
						input(class="mdl-textfield__input" type="password", name="confirmpassword", v-model="confirmpassword")
						label(class="mdl-textfield__label" for="confirmpassword") Confirm Password
					.mdl-card__actions
						input(type="submit" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" value="Change Password")
		div(v-if="isError")
			.mdl-card.mdl-shadow--2dp.error-message#error-login
				.mdl-card__title.mdl-card--expand
					h1.mdl-card__title-text Error
				.mdl-card__supporting-text
					p {{error}}
		div(
		class="demo-card-event mdl-card mdl-shadow--2dp"
		id="password_success"
		v-if="changeSuccess")
			.mdl-card__title.mdl-card--expand
				h2.mdl-card__title-text Success!
			.mdl-card__supporting-text
				p Your password has successfully been changed.
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
			oldpassword: '',
			newpassword: '',
			confirmpassword: '',
			changeSuccess: false,
			isError: false,
			error: ''
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
			if (this.newpassword === this.confirmpassword) {
				const jwtHeader = {'Authorization': 'Bearer ' + localStorage.getItem('idToken')},
							oldPassword = this.oldpassword,
							newPassword = this.newpassword,
							confirmPassword = this.confirmpassword,
							userId = this.userId,
							payload = {oldPassword, newPassword, confirmPassword, userId}
				this
				.$http
				.put('http://localhost:3000/changepassword', payload, {headers: jwtHeader})
				.then((response) => {
					if (response.data.data.message === 'Password change successful.') {
						this.changeSuccess = true
					} else {
						throw new Error('Ah crap, there has been an error in changing your password. :-(')
					}
				})
				.catch((err) => {
					if (err.message) {
						this.isError = true
						this.error = err.message
					} else {
						this.isError = true
						this.error = err
					}
				})
			} else {
				this.isError = true
				this.error = 'New Password and Confirm Password do not match. Please try entering them again.'
			}
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

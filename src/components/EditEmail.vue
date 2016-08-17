<template lang="jade">
Topbar(title="Edit Email")
Navbar
main.mdl-layout__content.mdl-color--grey-100
	div(v-show="!loadState")
		.mdl-grid.demo-content
		.mdl-cell--12-col
			#edit_email.demo-card-event.mdl-card.mdl-shadow--2dp
				.mdl-card__title.mdl-card--expand
					h2.mdl-card__title-text Enter new email
				.mdl-card__supporting-text
					form(
					@submit.prevent="onSubmit()", 
					@submit="editEmail()")
						.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
							input(
							class="mdl-textfield__input", 
							type="text", 
							name="email", 
							v-model="newEmail")
							label(
							class="mdl-textfield__label", 
							for="email") New email
						.mdl-card__actions
							input(
							type="submit" 
							class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" 
							value="Change Email")
		div(v-if="isError")
			.mdl-card.mdl-shadow--2dp.error-message#error-login
				.mdl-card__title.mdl-card--expand
					h1.mdl-card__title-text Error
				.mdl-card__supporting-text
					p {{error}}
	div(v-else)
		.mdl-grid.demo-content
			.mdl-cell--12-col
				div(
				id="p1",
				class="mdl-spinner mdl-js-spinner is-active")
</template>

<script>
import Store from '../vuex/Store'
import {userEmail} from '../vuex/userEmail'
import {userId} from '../vuex/userId'
import {router} from '../main.js'
import {updateEmail} from '../vuex/updateEmail'
import {getLoadState} from '../vuex/getLoadState'
import {setLoadState} from '../vuex/setLoadState'
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
			userEmail,
			userId,
			loadState: getLoadState
		},
		actions: {
			updateEmail,
			setLoadState
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
			newEmail: this.userEmail,
			isError: false,
			error: ''
		}
	},

	ready () {
		this.setLoadState(false)
		this.$nextTick(() => {
			componentHandler.upgradeDom()
			componentHandler.upgradeAllRegistered()
		})
	},

	methods: {
		editEmail () {
			const newEmail = this.newEmail
			const id = this.userId
			this.setLoadState(true)
			this.$http.put('http://localhost:3000/user/email', {
				newEmail: newEmail,
				userId: id
			})
			.then((response) => {
				const data = JSON.parse(response.body)
				console.log(data)
				if (data.error) {
					this.isError = true
					this.error = data.message
					this.setLoadState(false)
				} else {
					this.updateEmail(JSON.parse(response.body).email)
					this.setLoadState(false)
					router.go('account')
				}
			})
			.catch((err) => {
				console.log(err)
			})
		}
	}
}
</script>

<style lang="stylus">
@import '../main.styl'
</style>
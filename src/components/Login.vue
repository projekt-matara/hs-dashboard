<template lang="jade">
.mdl-grid#login
	.mdl-cell--12-col
		h2#headline Welcome to Halfstak
		#the_form.demo-card-event.mdl-card.mdl-shadow--2dp
			.mdl-card__title.mdl-card--expand
				h2.mdl-card__title-text Login
			.mdl-card__supporting-text
				form(@submit.prevent="onSubmit()", @submit="submit()")
					.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
						input(class="mdl-textfield__input", type="text", name="email", v-model="credentials.username")
						label(class="mdl-textfield__label", for="email") Email/Username
					.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label
						input(class="mdl-textfield__input" type="password", name="password", v-model="credentials.password")
						label(class="mdl-textfield__label" for="password") Password
					.mdl-card__actions
						input(type="submit" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" value="Login")
		div(v-if="isError")
			.mdl-card.mdl-shadow--2dp.error-message#error-login
				.mdl-card__title.mdl-card--expand
					h1.mdl-card__title-text Error
				.mdl-card__supporting-text
					p {{error}}
		p Don't have an account? 
		.alt-link
			a(v-link="{name:'signup'}") Sign up here!
</template>

<script>
import auth from '../auth/auth.js'
import {setProfile} from '../vuex/setProfile'
import Store from '../vuex/Store'
export default{
	data () {
		return {
			// We need to initialize the component with any
      // properties that will be used in it
      credentials: {
        username: '',
        password: ''
      },
      error: '',
      isError: false
    }
	},

	store: Store,

	vuex: {
		actions: {
			setProfile
		}
	},

	methods: {
    submit () {
      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }
      // We need to pass the component's this context
      // to properly make use of http in the auth service
      auth.login(this, credentials, 'home')
    }
  },

  ready () {
    this.$nextTick(() => {
      componentHandler.upgradeDom()
      componentHandler.upgradeAllRegistered()
    })
  }
}
</script>

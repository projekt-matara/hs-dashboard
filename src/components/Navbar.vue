<template lang="jade">
div(class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50")
		header.demo-drawer-header
			img(src="http://s3.amazonaws.com/hs.web/images/user.jpg", class="demo-avatar")
			.demo-avatar-dropdown
				span {{getUsername}}
				.mdl-layout-spacer
				button(id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon")
					i(class="material-icons", role="presentation") arrow_drop_down
					span.visuallyhidden Accounts
				ul(class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect", for="accbtn")
					li(class="mdl-menu__item logout", @click="logout") Logout
		nav(class="demo-navigation mdl-navigation mdl-color--blue-grey-800")
			a.mdl-navigation__link(href="#", v-link="{name: 'home'}")
				i(class="mdl-color-text--blue-grey-400 material-icons" role="presentation") home 
				| Home
			a.mdl-navigation__link(href="#", v-link="{name: 'account'}")
				i(class="mdl-color-text--blue-grey-400 material-icons" role="presentation") account_circle
				| Account
			a.mdl-navigation__link(href="#", v-link="{name: 'payment'}")
				i(class="mdl-color-text--blue-grey-400 material-icons" role="presentation") credit_card
				| Payment
			a.mdl-navigation__link(href="#", v-link="{name: 'plugin-directory'}")
				i(class="mdl-color-text--blue-grey-400 material-icons" role="presentation") folder
				| Plugin Directory
			a.mdl-navigation__link(href="#", v-link="{name: 'learn'}")
				i(class="mdl-color-text--blue-grey-400 material-icons" role="presentation") school
				| Learn
			.mdl-layout-spacer
			a.mdl-navigation__link(href="#")
				i(class="mdl-color-text--blue-grey-400 material-icons" role="presentation") help_outline
				span.visually-hidden Help
</template>

<script>
import Store from '../vuex/Store'
import {getUsername} from '../vuex/getUsername'
import {clearProfile} from '../vuex/clearProfile'
import auth from '../auth/auth'

export default {
	store: Store,

	vuex: {
		getters: {
			getUsername
		},
		actions: {
			clearProfile
		}
	},

	methods: {
		logout () {
			const self = this
			auth.logout(self)
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

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home_p'
import Account from './components/Account_P'
import Learn from './components/Learn_P'
import Payment from './components/Payment_P'
import PluginDirectory from './components/PluginDirectory_P'
import Store from './vuex/Store'

Vue.use(VueRouter)

const router = new VueRouter()
const App = Vue.extend({
	data () {
		return {
			authenticated: false
		}
	},

	methods: {
		login (msg, e) {
			e.stopPropagation()
			const self = this
			const lock = new Auth0Lock('LXrECoaQZHEP9TAe8ceisjDd0q49uDDI', 'halfstak.auth0.com')

			lock.show((err, profile, token) => {
        if (err) {
          // Handle the error
          console.log(err)
        } else {
          // Set the token and user profile in local storage
          localStorage.setItem('profile', JSON.stringify(profile))
          localStorage.setItem('id_token', token)
          self.authenticated = true
        }
      })
		},

		logout () {
			const self = this
			localStorage.removeItem('id_token')
			localStorage.removeItem('profile')
			self.authenticated = false
		}
	}
})

router.map({
	'/': {
		component: Home,
		name: 'home'
	},

	'/account': {
		component: Account,
		name: 'account'
	},

	'/learn': {
		component: Learn,
		name: 'learn'
	},

	'/payment': {
		component: Payment,
		name: 'payment'
	},

	'/plugindirectory': {
		component: PluginDirectory,
		name: 'plugindirectory'
	}
})

router.start({
	Store,
	components: { App }
}, '#app')

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Home from './components/Home_p'
import Account from './components/Account_P'
import Learn from './components/Learn_P'
import Payment from './components/Payment_P'
import Login from './components/Login'
import Signup from './components/Signup'
import EditEmail from './components/EditEmail'
import EditPayEmail from './components/EditPayEmail'
import ChangePassword from './components/ChangePassword'
import ChangeCard from './components/ChangeCard'
import CancelSub from './components/CancelSub'
import PluginDirectory from './components/PluginDirectory_P'
import Store from './vuex/Store'
import auth from './auth/auth'

Vue.use(VueRouter)
Vue.use(VueResource)

auth.checkAuth()

export const router = new VueRouter()
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
			localStorage.removeItem('id_token')
			localStorage.removeItem('profile')
			this.authenticated = false
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
		name: 'plugin-directory'
	},

	'/login': {
		component: Login,
		name: 'login'
	},

	'/signup': {
		component: Signup,
		name: 'signup'
	},

	'/editemail': {
		component: EditEmail,
		name: 'edit-email'
	},

	'/editpayemail': {
		component: EditPayEmail,
		name: 'edit-pay-email'
	},

	'/changepassword': {
		component: ChangePassword,
		name: 'change-password'
	},

	'/changecard': {
		component: ChangeCard,
		name: 'change-card'
	},

	'/cancelsub': {
		component: CancelSub,
		name: 'cancel-sub'
	},

	'*': {
		component: Home
	}
})

router.start({
	Store,
	components: { App }
}, '#app')

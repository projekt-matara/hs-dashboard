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
import CancelSub from './components/CancelSub'
import PluginDirectory from './components/PluginDirectory_P'
import KillAccount from './components/KillAccount'
import ForgotPassword from './components/ForgotPassword'
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

	'/cancelsub': {
		component: CancelSub,
		name: 'cancel-sub'
	},

	'/killaccount': {
		component: KillAccount,
		name: 'kill-account'
	},

	'/forgotpassword': {
		component: ForgotPassword,
		name: 'forgot-password'
	},

	'*': {
		component: Home
	}
})

router.start({
	Store,
	components: { App }
}, '#app')

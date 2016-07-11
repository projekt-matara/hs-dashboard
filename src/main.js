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
const App = Vue.extend({})

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

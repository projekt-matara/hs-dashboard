import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
	email: '',
	username: '',
	stripeId: '',
	id: '',
	cardId: '',
	stripeStatus: false,
	stripeEmail: '',
	stripeCountry: '',
	stripeDigits: '',
	stripeBrand: '',
	stripeExp: '',
	stripeExpMonth: '',
	stripeExpYear: ''
}

const mutations = {
	SET_PROFILE (state, user) {
		state.email = user.email
		state.username = user.username
		state.stripeId = user.stripeId
		state.id = user.id
		state.cardId = user.cardId
		state.stripeStatus = user.stripeStatus
		state.stripeEmail = user.stripeEmail
		state.stripeCountry = user.stripeCountry
		state.stripeDigits = user.stripeDigits
		state.stripeBrand = user.stripeBrand
		state.stripeExp = user.stripeExp
		state.stripeExpMonth = user.stripeExpMonth
		state.stripeExpYear = user.stripeExpYear
	},

	SET_CUSTOMER (state, cus) {
		state.cardId = cus.cardId
		state.stripeStatus = cus.stripeStatus
		state.stripeEmail = cus.stripeEmail
		state.stripeCountry = cus.stripeCountry
		state.stripeDigits = cus.stripeDigits
		state.stripeBrand = cus.stripeBrand
		state.stripeExp = cus.stripeExp
		state.stripeExpMonth = cus.stripeExpMonth
		state.stripeExpYear = cus.stripeExpYear
	},

	UPDATE_EMAIL (state, email) {
		state.email = email
	},

	UPDATE_USERNAME (state, username) {
		state.username = username
	},

	UPDATE_STRIPEID (state, stripeId) {
		state.stripeId = stripeId
	},

	UDPATE_CARDID (state, cardId) {
		state.cardId = cardId
	}
}

export default new Vuex.Store({
	state,
	mutations
})

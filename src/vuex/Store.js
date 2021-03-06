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
	stripeExpYear: '',
	loading: false
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

	CLEAR_PROFILE (state, user) {
		state.email = ''
		state.username = ''
		state.stripeId = ''
		state.id = ''
		state.cardId = ''
		state.stripeStatus = false
		state.stripeEmail = ''
		state.stripeCountry = ''
		state.stripeDigits = ''
		state.stripeBrand = ''
		state.stripeExp = ''
		state.stripeExpMonth = ''
		state.stripeExpYear = ''
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
		state.stripeId = cus.stripeId
	},

	UPDATE_EMAIL (state, email) {
		state.email = email
	},

	UPDATE_PAYMENT_EMAIL (state, email) {
		state.stripeEmail = email
	},

	UPDATE_USERNAME (state, username) {
		state.username = username
	},

	UPDATE_STRIPEID (state, stripeId) {
		state.stripeId = stripeId
	},

	UDPATE_CARDID (state, cardId) {
		state.cardId = cardId
	},

	SET_CARD (state, card) {
		state.stripeCountry = card.stripeCountry
		state.stripeDigits = card.stripeDigits
		state.stripeBrand = card.stripeBrand
		state.stripeExp = card.stripeExp
		state.stripeExpMonth = card.stripeExpMonth
		state.stripeExpYear = card.stripeExpYear
		state.cardId = card.cardId
	},

	SET_LOAD_STATE (state, newState) {
		if (typeof newState === 'boolean') {
			state.loading = newState
		} else {
			state.loading = false
		}
	}
}

export default new Vuex.Store({
	state,
	mutations
})

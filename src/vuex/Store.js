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
	stripeExp: ''
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

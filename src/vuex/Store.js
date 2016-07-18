import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
	email: '',
	username: '',
	stripeId: '',
	id: '',
	cardId: ''
}

const mutations = {
	SET_PROFILE (state, user) {
		state.email = user.email
		state.username = user.username
		state.stripeId = user.stripeId
		state.id = user.id
		state.cardId = user.cardId
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

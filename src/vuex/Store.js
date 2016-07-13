import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
	email: '',
	username: '',
	stripeId: '',
	id: ''
}

const mutations = {
	SET_PROFILE (state, user) {
		state.email = user.email
		state.username = user.username
		state.stripeId = user.stripeId
		state.id = user.id
	}
}

export default new Vuex.Store({
	state,
	mutations
})

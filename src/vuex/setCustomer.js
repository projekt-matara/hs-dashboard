export const setCustomer = ({dispatch, state}, cusData) => {
	console.log('set customer called')
	dispatch('SET_CUSTOMER', cusData)
}

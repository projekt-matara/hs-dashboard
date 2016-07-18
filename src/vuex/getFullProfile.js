export function getFullProfile (state) {
	return {
		username: state.username,
		email: state.email,
		stripeId: state.stripeId,
		id: state.id,
		stripeStatus: state.stripeStatus
	}
}

export function getFullProfile (state) {
	return {
		username: state.username,
		email: state.email,
		stripeId: state.stripeId,
		id: state.id,
		cardId: state.cardId,
		stripeStatus: state.stripeStatus,
		paySetup: state.paySetup,
		stripeEmail: state.stripeEmail,
		stripeCountry: state.stripeCountry,
		stripeDigits: state.stripeDigits,
		stripeBrand: state.stripeBrand,
		stripeExp: state.stripeExp,
		stripeExpMonth: state.stripeExpMonth,
		stripeExpYear: state.stripeExpYear
	}
}

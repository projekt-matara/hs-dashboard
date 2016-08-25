import {router} from '../main.js'
import Auth0 from 'auth0-js'

const auth0 = new Auth0({
  domain: 'halfstak.auth0.com',
  clientID: 'LXrECoaQZHEP9TAe8ceisjDd0q49uDDI',
  callbackURL: 'http://localhost:8080',
  callbackOnLocationHash: true
})

export default {
	// User object will let us check authentication status
  user: {
    authenticated: false
  },

  login (context, creds, redirect) {
    const self = this
    auth0.login({
      connection: 'Username-Password-Authentication',
      username: creds.username,
      password: creds.password
    }, (err, profile) => {
      if (err) {
        context.error = err
        context.isError = true
      } else {
        localStorage.setItem('idToken', profile.idToken)
        const jwtHeader = {'Authorization': 'Bearer ' + localStorage.getItem('idToken')}
        context.$http.get('http://localhost:3000/user/' + profile.idTokenPayload.sub, {
          headers: jwtHeader
        })
        .then((response) => {
          const data = response.data
          context.setProfile({
            email: data.email,
            username: data.username,
            id: data.id,
            stripeId: data.stripeId,
            cardId: data.cardId,
            stripeStatus: data.stripeStatus,
            paySetup: data.paySetup,
            stripeEmail: data.stripeEmail,
            stripeCountry: data.stripeCountry,
            stripeDigits: data.stripeDigits,
            stripeBrand: data.stripeBrand,
            stripeExp: data.stripeExp,
            stripeExpMonth: data.stripeExpMonth,
            stripeExpYear: data.stripeExpYear
          })
          self.user.authenticated = true
          context.isError = false
          if (redirect) {
            router.go(redirect)
          }
        })
        .catch((err) => {
          context.error = err
        })
      }
    })
  },

  signup (context, creds, redirect) {
    const self = this
    context.$http.post('http://localhost:3000/user', {
      email: creds.email,
      username: creds.username,
      password: creds.password
    })
    .then((response) => {
      if (JSON.parse(response.body).id_token) {
        localStorage.setItem('idToken', response.data.id_token)
        context.setProfile({
          email: creds.email,
          username: creds.username,
          id: response.data.id,
          stripeId: '',
          cardId: ''
        })
        self.user.authenticated = true
        if (redirect) {
          router.go(redirect)
        }
      } else {
        context.error = 'This username or email has already been taken. Please try another.'
        context.isError = true
      }
    })
    .catch((err) => {
      context.error = err
    })
  },

  // To log out, we just need to remove the token
  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
    router.go('login')
  },

  checkAuth () {
    const jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}

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
    auth0.login({
      connection: 'Username-Password-Authentication',
      username: creds.username,
      password: creds.password
    }, (err, profile) => {
      if (err) {
        console.log(err)
      } else {
        localStorage.setItem('idToken', profile.idToken)
        context.$http.get('http://localhost:3000/user/' + profile.idTokenPayload.sub)
        .then((response) => {
          const data = JSON.parse(response.data)
          const userProfile = {
            email: data.email,
            username: data.username,
            id: data.user_id,
            stripeId: data.user_metadata.stripe_id
          }
          context.setProfile(userProfile)
          this.user.authenticated = true

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
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    }).catch((err) => {
      context.error = err
    })
  },

  // To log out, we just need to remove the token
  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth () {
    var jwt = localStorage.getItem('id_token')
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

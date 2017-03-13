import {router} from '../main.js'

function setProfileContext (context, data) {
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
}

export default {
	// User object will let us check authentication status
  user: {
    authenticated: false
  },

  login (context, creds, redirect) {
    const self = this
    context.$http.post('http://localhost:3000/login', {
      email: creds.email,
      password: creds.password
    })
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.error)
      } else {
        const data = response.data
        localStorage.setItem('idToken', data.idToken)
        setProfileContext(context, data)
        self.user.authenticated = true
        context.isError = false
        if (redirect) {
          router.go(redirect)
        }
      }
    })
    .catch((err) => {
      context.isError = true
      context.error = err
    })
  },

  signup (context, creds, redirect) {
    const self = this
    context.$http.post('http://localhost:3000/createuser', {
      email: creds.email,
      username: creds.username,
      password: creds.password
    })
    .then((response) => {
      const data = response.data
      if (data.message === 'User validation failed.') {
        console.log('data message thing worked')
        // context.isError = true
        // context.error = 'The username or email was invalid. Please try again.'
      } else {
        if (data.idToken) {
          localStorage.setItem('idToken', data.idToken)
          setProfileContext(context, data)
          self.user.authenticated = true
          router.go(redirect)
        }
      }
    })
    .catch((err) => {
      console.log('now we are in data message business')
      console.log(err)
      const data = err.data
      if (data.message === 'User validation failed') {
        context.isError = true
        context.error = 'The username or email is invalid. Please try again.'
      } else {
        context.isError = true
        context.error = data.message
      }
    })
  },

  // To log out, we just need to remove the token
  logout (context) {
    localStorage.removeItem('idToken')
    this.user.authenticated = false
    context.clearProfile()
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

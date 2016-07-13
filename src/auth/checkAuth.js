export function checkAuth () {
  if (localStorage.getItem('id_token')) {
    return true
  } else {
    return false
  }
}

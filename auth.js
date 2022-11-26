import env from './env'

export const doAuth = async () => {
    const token = localStorage.getItem('token')
    if(token === null) return {}
    try {
      const meJson = await fetch(`${env.url}/admin/account/user/me`, { headers: { 'Authorization': token } })
      const me = await meJson.json()
      return me.data
    } catch (e) {
      console.log(e)
      return "Hello"
    }
}

export const doLogout = (setUser) => {
    localStorage.removeItem('token')
    setUser({})
}

export const getToken = () => localStorage.getItem('token')
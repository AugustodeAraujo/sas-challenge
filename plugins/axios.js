export default function ({ $axios, store, redirect }, inject) {
  $axios.onRequest((config) => {
    const token = store.state.user.token
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`
    }
  })

  $axios.onResponse((response) => {})

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    // if (code === 400) {
    //   redirect('/400')
    // }
    console.log('erro: ', error)
  })
}

export default function ({ store, redirect, app }) {
  if (!store.state.user.token) {
    redirect('/login')
  }
}

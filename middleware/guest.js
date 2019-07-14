export default function ({ store, error }) {
  if (store.state.auth.loggedIn) {
    error({
      message: 'Страница доступна только гостям',
      statusCode: 404
    })
  }
}

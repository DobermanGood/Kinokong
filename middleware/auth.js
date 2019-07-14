export default function ({ store, error }) {
  if (!store.state.auth.loggedIn) {
    error({
      message: 'Станица доступна только авторизированным пользователям',
      statusCode: 404
    })
  }
}

const keys = require('../keys')

module.exports = function (email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Reset Password',
    html: `
      <h1>Forget Password</h1>
      <p>Token sended to - ${email}</p>
      <p><a href="${keys.BASE_URL}/auth/password/${token}">Link to reset password</a></p>
      <hr/>
      <a href="${keys.BASE_URL}">Market of courses</a>
    `,
  }
}

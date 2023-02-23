const keys = require('../keys')

module.exports = function (email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Account created',
    html: `
      <h1>Welcome to our market</h1>
      <p>Succesfully created account email - ${email}</p>
      <hr/>
      <a href="${keys.BASE_URL}">Market of courses</a>
    `,
  }
}

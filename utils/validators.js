const { body } = require('express-validator/check')
const User = require('../models/user')

exports.registerValidators = [
  body('email')
    .isEmail()
    .withMessage('Enter a valid email')
    .custom(async (value, req) => {
      try {
        const user = await User.findOne({ email: value })
        if (user) {
          return Promise.reject('Email is exist!')
        }
      } catch (e) {
        console.log(e)
      }
    })
    .normalizeEmail(),
  body('password', 'Password must be 6 symbols')
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body('confirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password not equal')
      }
      return true
    })
    .trim(),
  body('name')
    .isLength({ min: 3 })
    .withMessage('Name must be 3 symbols')
    .trim(),
]

exports.courseValidators = [
  body('title').isLength({ min: 3 }).withMessage('Minimum character 3').trim(),
  body('price').isNumeric().withMessage('Price is invalid'),
  body('img', 'Enter valid url img').isURL(),
]

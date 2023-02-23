const { Router } = require('express')
const { validationResult } = require('express-validator/check')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const { courseValidators } = require('../utils/validators')
const router = Router()

router.get('/', auth, (req, res) => {
  res.render('add', {
    title: 'Add Course',
    isAdd: true,
  })
})

router.post('/', auth, courseValidators, async (req, res) => {
  const errors = validationResult(req)
  const body = req.body
  if (!errors.isEmpty()) {
    return res.status(422).render('add', {
      title: 'Add Course',
      isAdd: true,
      error: errors.array()[0].msg,
      data: {
        title: body.title,
        price: body.price,
        img: body.img,
      },
    })
  }

  const course = new Course({
    title: body.title,
    price: body.price,
    img: body.img,
    userId: req.user,
  })

  try {
    await course.save()
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router

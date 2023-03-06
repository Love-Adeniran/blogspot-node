const User = require('../models/userModel')
const { compare } = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { sendMail } = require('../mail')
dotenv.config()
const register = (req, res) => {
  const { firstname, lastname, email, password } = req.body
  //   if({firstname}=='' || {lastname}== ''|| {email} == '' || {password}==''){
  //     res.send(<div>You are wrong</div>)
  //   }else{
  User.create(
    { firstname, lastname, email, password },
    async (err, message) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'An error',
        })
        console.log(err)
      } else {
        try {
          // await  sendMail(email)
          await sendMail({
            to: email,
            subject: 'Registration sucessful',
            html: `<div>
            <h3 style='font-size:20px'>Welcome</h3>
            <p>You are welcome ${firstname} to BlogLifestyle<p>
                </div>`,
          })
        } catch (error) {
          console.log('An error occured when trying to send mail'+ error)
        }
        res.json({
          success: true,
          message: 'User registration successful',
          message,
        })
      }
    },
  )
  //   }
}

const login = (req, res) => {
  const { email, password } = req.body
  User.findOne({ email })
    .select('+password')
    .exec(async (err, data) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'An error',
        })
      } else {
        if (data) {
          try {
            const validPassword = await compare(password, data.password)
            if (validPassword) {
              const token = jwt.sign(
                { email: data.email, _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: 60 },
              )
              data.password = ''
              res.json({
                token,
                success: true,
                message: 'Login Successful',
                data,
              })
            } else {
              res.status(400).json({
                success: false,
                message: 'Password is nor correct',
              })
            }
          } catch (error) {
            res.send(error)
            console.log(error)
          }
        } else {
          res.status(400).json({
            success: false,
            message: 'Email does not Exist',
          })
        }
      }
    })
}
const getUser = (req, res) => {
  // res.send('Profile is Here');
  User.findById(req.user._id, (err, data) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'An error occured when fetching user profile',
      })
    } else {
      res.json({
        success: true,
        data,
        message: 'User profile fetched',
      })
    }
  })
}
module.exports = { register, login, getUser }

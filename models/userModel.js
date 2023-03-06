const { genSalt, hash } = require('bcrypt')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  firstname: {
    type:String,
    require: true
},
  lastname: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
},
  password: {
    type: String,
    select: false,
  },
})
// npm i bcrypt
userSchema.pre('save', async function () {
  const { password } = this
  const salt = await genSalt(10)
  const hashedPassword = await hash(password, salt)
  this.password = hashedPassword
})

const User = mongoose.model('User', userSchema)

module.exports = User

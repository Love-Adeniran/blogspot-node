const { mongoose } = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  more: {
    type: String,
    required: true,
  },
  imageFile: String,
  imageLink: String
})

blogSchema.pre('save', function () {
    
})
// const PostInfo = mongoose.model('PostInfo', blogSchema)

module.exports = blogSchema

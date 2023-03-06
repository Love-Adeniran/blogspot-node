const  mongoose = require("mongoose")
const blogSchema = require("../models/postModels")

const PostInfo = mongoose.model('PostInfo',blogSchema)

const createPost = (req, res) => {
    let { title, more } = req.body
   
     const {filename,path} = req.file;
    console.log(req.file);
    // const {filename} = req.file
    PostInfo.create({ title, more, imageFile: filename, imageLink: path}, (error, message) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: 'An error occured!'
      })
      console.log('An Error occured' + error)
      } 
      else {
        res.json({
          success: true,
          data: message,
          message,
        })
        // res.redirect('/')
      }
    })
  }

  const displayPost = (req,res)=>{
    PostInfo.find((error,message)=>{
        if(error){
            console.log('ERROR! '+ error)
                res.status(500).json({
                    success: false,
                    message: 'An error occured!'
                })
        }
        else{
            console.log(message);
            res.json({
                success: true,
                data: message,
                message,
              })
        }
    })
}
const deletePost = (req,res)=>{
    PostInfo.findByIdAndDelete(_id,(error,message)=>{
        // console.log(res);
        if(error){
            console.log('O ti ni error' + error)
            res.status(500).json({
                success: false,
                message: 'Error ti wa oo'
            })
        }
        else{
            console.log(message);
            res.json({
                success: true,
                data: message,
                message
            })
        }
    })

}

  module.exports = {createPost, displayPost,deletePost}
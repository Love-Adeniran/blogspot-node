const express = require('express')
const app = express()
// const path = require('path')
const PORT = process.env.PORT || 5200
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const mongoose = require('mongoose')
// const PostInfo = require('./models/postModels')
const router = require('./router')

const {Server} = require('socket.io')
const http = require('http')

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})
let users = []
io.on('connection', (socket)=>{
    socket.on('join-socket',(_id)=>{
        const exist = users.find((each)=>each._id)
        if(exist){
            users = users.map(each => each._id == _id ? { socketId:socket.id,...each}: each)
        }
        else{
            users.push({_id,'socketId': socket.id})
        }
    })
    console.log('User connected' + " " +socket.id);
    socket.on('user-active', (message)=>{
        console.log(message);
    })
    socket.on("send-message", (message)=>{
        socket.broadcast.emit("message-sent", message)
    })
    socket.on('join-group', (group)=>{
        socket.join(group)
    })
    socket.on('send-msg-to-group', ({group,Chat})=>{
        socket.to(group).emit('msg-sent-to-group', Chat) // sending to a dm, try to get the socket id of the user and replace the 'group' with the socket id.
    })
})

mongoose.set('strictQuery', true)
mongoose.connect(process.env.URI, (error) => {
  if (error) {
    console.log('An Error occured' + error)
  } else {
    console.log('Proceed')
  }
})

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use('/', router)

// Mongoose Virtual
// document is relating to an entity
// we are a library called bcrypt

server.listen(PORT, () => {
    // app.listen(PORT, () => {
  console.log('Server has started')
})

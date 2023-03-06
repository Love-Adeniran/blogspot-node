const express = require('express')
const router = express.Router()
const {createPost, displayPost, deletePost} = require('./controllers/postController')
const multer = require('multer')
const { register, login, getUser } = require('./controllers/userController')
const { storage } = require('./upload')
const { verifyUser } = require('./authMiddleware')
// const upload = multer({ dest: 'assets/postImages' })
const upload = multer({ storage })

router.post('/', upload.single('picture'), createPost)
router.get('/', displayPost)
// router.get('/:_id', deletePost)
router.post('/register', register)
router.post('/login', login)
router.get('/Profile',verifyUser, getUser)


module.exports = router

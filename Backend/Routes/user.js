const express = require('express')
const Router = express.Router()
const auth = require('../Middlewares/authenticate')
const multer  = require('multer')
const {login, register, check} = require('../Controllers/user')

const FILE_TYPE_MAP = {
    'image/png':'png',
    'image/jpg':"jpg",
    'image/jpeg':"jpeg",
    'application/pdf':"pdf"
}
//define multer storage
const storage  = multer.diskStorage({
    destination:function (req,file,cb){
        const isValid = FILE_TYPE_MAP[file.mimetype]
        let error = 'File type is not valid'
        if(isValid){
            error = null
        }

        cb(error, 'backend/public/docs/cv')
    },
    filename:function(req,file,cb){
        const name = file.originalname.split(' ').join('-')
        const extention = FILE_TYPE_MAP[file.mimetype]

        cb(null, `${name}-${Date.now()}.${extention}`)

    }

})
//upload option
const uploadOption = multer({storage:storage})


Router.post('/register',uploadOption.single('cv'),register)
Router.post('/login', login)
Router.get('/check',auth, check)

module.exports = Router
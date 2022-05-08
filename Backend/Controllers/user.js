const mongoose = require('mongoose')
const UserModel = require('../Models/user')
//import jsonwebtoken as jwt
const jwt = require('jsonwebtoken')


//register controller for register route
exports.register = async (req,res) =>{
    console.log(req.body.image)
    //get file name
    const filename = req.file.filename
    //base path
    const basePath = `${req.protocol}://${req.get('host')}/public/docs/cv/`
    //combine filename and base path
    req.body.cv = `${basePath}${filename}`
    //create new user
    const user = await UserModel.create(req.body)
    //generate token using the method that created at user model
    const token = await user.genToken()
    //set cookie
    res.cookie('auth', token, {expire:36000 + Date.now()})
    res.status(200).send({user:user, token:token})
}

exports.login = async(req,res) =>{
    //destructure email and password from req.body
    const {email, password} = req.body
    //find the use by email
    const user = await UserModel.findOne({email:email})
    //check is the user is exists
    if(!user){
       return res.status(401).send({message:"user cannot be found"})
    }
    //check are the passwords same using a method that created at user model
    const isAuth = await user.comparePassword(password)
    //if user is authenticated the method will return 1 and is not it returns 0
    if(!isAuth){
        return res.status(401).send({msg:"password is incorrect"})
    }


    //generate token if the user is authenticated
    const token = await user.genToken()
    //store token inside a cookie
    res.cookie('auth', token, {expire:36000 + Date.now()})
    res.status(200).send({user:user, token:token})



}

exports.check = async(req,res) => {
    const {profile} = req
    if(profile){
        res.status(200).send(profile)

    }else{
        res.status(401).send({msg:"bad auth"})
    }
}

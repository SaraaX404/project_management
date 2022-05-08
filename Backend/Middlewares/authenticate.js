const jwt = require('jsonwebtoken')
const UserModel = require('../Models/user')

//authentication middleware
const auth = async (req,res,next) =>{
    //destructure token from cookies
   const {auth} =  req.cookies
    //check is the token is exists
    if(!auth){
        return res.status(401).send({msg:"no token provided"})
    }
    //verify token using try catch

    try {
        const user = await jwt.verify( auth, process.env.SECRET)
        console.log(user)
        //get user is from decoded token and search the user id is database to get user details
        const profile = await UserModel.findById(user.id)
        //store user details as profile in request
        req.profile = profile
        next()
    }catch (e) {
        console.log(e)
       return res.status(500).send(e.message)
    }

}
module.exports = auth

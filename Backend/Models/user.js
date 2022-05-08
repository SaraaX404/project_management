const mongoose  = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Provide Your Name"],
        maxLength:[50, "length should be less than 50 characters"]
    },
    age:{
        type:Number,
        required:[true, "Please Provide Your Age"],

    },
    email:{
        type:String,
        required:[true, "Please Provide Your Email"],
        maxLength:[200, "length should be less than 15 characters"]
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:[true, "Please Provide Your Image"],

    },
    cv:{
        type:String,
        required:[true, "Please Provide Your CV"],

    },
    telephone:{
        type:Number,
        required:[true, "Please Provide Your Telephone"],
        maxLength:[13, "length should be less than 13  characters"]
    }

})

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(8)
    this.password = await bcrypt.hash( this.password, salt)
})

userSchema.methods.genToken = async function (){
    return jwt.sign({name:this.name, id:this._id}, process.env.SECRET, {expiresIn:"30d"})
}

userSchema.methods.comparePassword = async function(pwd){
    return bcrypt.compare(pwd,this.password)
}

module.exports = mongoose.model('User', userSchema)
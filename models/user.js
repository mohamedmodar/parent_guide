const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi =require("joi");
//user schema
 const UserSchema = new mongoose.Schema({
  
    email:{
        type : String,
        required : true,
        trim : true,
        minlength :5,
        maxlength: 100,
        unique : true
    },
    password: {
        type : String,
        required : true,
        trim : true,
        minlength :8,
    },
    profilePicture :{
        type: Object,
        default:{
        url: "https://woodfibreinsulation.co.uk/wp-content/uploads/2017/04/blank-profile-picture-973460-1-1-768x768.png",
        publicId : null
    }},
  
    isParent:{
       type:Boolean,
       default: false
    },
 
 },{
    //time add created at
    timestamps: true
 });

 //generate auth token
UserSchema.methods.generateAuthToken = function(){
return jwt.sign({id: this._id, isParent: this.isParent}, process.env.JWT_SECRET, 
  { expiresIn: "30d"} 
    )
} 

 //user model
 const User = mongoose.model("User",UserSchema);

 //validate of register user 

  function validateRigesterUser (obj){
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).required().email(),
        password: joi.string().trim().min(8).required(),
        profilePicture: joi.object()

    });

    return schema.validate(obj);

  }
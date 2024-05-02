const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {User,validateRigesterUser, validateLoginUser} = require("../models/user");
/**--------------------------
 * @desc reqgister
 * @router /api/auth/register
 * @method Post
 * @access public
 ---------------------------*/
 module.exports.registerUserCtrl = asyncHandler( async(req,res) => {
    
   const {error} =validateRigesterUser(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }
    //is user already exist
    let user = await User.findOne({ email: req.body.email});
    if(user){
        return res.status(400).json({message: "user is already exist"});
    }
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password , salt)
    //new user and saving to db
    user = new User({
        email: req.body.email,
        password: hashedpassword,
        profilePicture :req.body.profilePicture
    });
     await user.save();
     

    //send res to client
    res.status(201).json({ message: "you registerd succussfuly please login"});
 }); 

 /**--------------------------
 * @desc login
 * @router /api/auth/login
 * @method Post
 * @access public
 ---------------------------*/
 module.exports.loginUserCtrl = asyncHandler (async(req,res) =>{
//validation.

   const {error} =validateLoginUser(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }
// if user exist.

const user = await User.findOne({email: req.body.email});
if(!user){
    return res.status(400).json({message: "invalid email or password"});
}

// check the password.

 const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
 if(!isPasswordMatch){
    return res.status(400).json({message: "invalid email or password"});
}

// generate token(jwt).
const token = user.generateAuthToken();
 
// response to client.

res.status(200).json({
    id :user._id,
    isParent :user.isParent,
    profilePicture: user.profilePicture,
    token 
})
 });
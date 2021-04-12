const User=require('../models/user');
const {errorHandler} = require('../helpers/dbErrorHandler')
const jwt = require('jsonwebtoken');//to generate signed token
const expressjwt = require("express-jwt");//for auth check


exports.signup=(req,res)=>{
    console.log("req.body:",req.body);
    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:errorHandler(err)
            });
        }
        // to remove important creds we need to undefine it , it will not show on json data
        user.salt= undefined;
        user.hashed_password=undefined;
        res.json({
            user
        });

    })
};

exports.signin = (req,res) =>{
    //find the user based on Email
    const {email,password} = req.body;
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                err:"User with that email does not exist. Pleasesignup"
            });
        }
        //if user is found make sure teh email and password match
        //create authenticate in user model

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }

        //generate a signed token with user id and secrst
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);

        //persist teh token as 't' in cookie with expiry date

        res.cookie('t',token,{expire: new Date()+9999});

        // return response with user and token to frontend client 
        const{_id,name,email,role}=user;
        return res.json({token, user:{_id,name,email,role}});


    });
}

exports.signout = (req,res) =>{
    res.clearCookie('t');
    res.json({message:'Signout success'});
};

// for authenttication means only logged in user can see this also known as protecting routes
exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty:"auth",
});



//for auth
exports.isAuth = (req,res,next)=>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        return res.status(403).json({
            error:"Access Denied"
        });
    }
    next();
};


exports.isAdmin = (req,res,next) =>{
    if(req.profile.role ===0){
        return res.status(403).json({
            error: 'Admin resource! Access denied'
        });
    }
    next();
};
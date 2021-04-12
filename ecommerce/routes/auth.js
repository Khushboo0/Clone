const express = require('express');
const router = express.Router();

const{signup,signin,signout,requireSignin}=require('../controllers/auth');
// const {userSignupValidator}=require("../validator")

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/signout',signout);




// router.get('/',(req,res))
// =>{
    // res.send('hello from user node')

// });

module.exports=router;
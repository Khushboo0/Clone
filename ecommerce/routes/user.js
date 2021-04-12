const express = require('express');
const router = express.Router();

const{userByID}=require('../controllers/user');

const{requireSignin,isAuth,isAdmin}=require('../controllers/auth');


//isAuth mmethod make sure that agr kisi doosre ki id bhi ho toh uski sari details ya panel hum access na kar paye
router.get('/secret/:userId',requireSignin,isAuth,isAdmin,(req,res)=>{
    res.json({
        user: req.profile
    });
});

// router parameter will check if the id of the usder exist and then it will the user by id method which is going to be defined in controllers

router.param('userId',userByID);

module.exports=router;
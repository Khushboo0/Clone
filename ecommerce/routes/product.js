const express = require('express');
const router = express.Router();

const{create,productByID,read,remove,update}=require('../controllers/product');
const{requireSignin,isAuth,isAdmin}=require('../controllers/auth');
const{userByID}=require('../controllers/user');

router.get('/product/:productId',read);
router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create);
router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,remove);
router.put('/product/:productId/:userId',requireSignin,isAuth,isAdmin,update);

router.param('userId',userByID);
router.param('productId',productByID);

module.exports=router;
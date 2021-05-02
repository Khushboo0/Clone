const express = require('express');
const router = express.Router();


const{requireSignin,isAuth,isAdmin}=require('../controllers/auth');



const{userByID,addOrderToUserHistory}=require('../controllers/user');

const{create,listOrders,getStatusValues,updateOrderStatus,orderByID}=require('../controllers/order');
const{decreaseQuantity}=require('../controllers/product');


// router.get('/braintree/getToken/:userId',requireSignin,isAuth);
router.post('/order/create/:userId',requireSignin,isAuth,addOrderToUserHistory,decreaseQuantity,create);

router.get('/order/list/:userId',requireSignin,isAuth,isAdmin,listOrders)
router.get('/order/status-values/:userId',requireSignin,isAuth,isAdmin,getStatusValues);
router.put('/order/:orderId/status/:userId',requireSignin,isAuth,isAdmin,updateOrderStatus);


router.param("userId",userByID)
router.param("orderId",orderByID)


module.exports =router
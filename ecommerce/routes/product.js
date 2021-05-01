const express = require('express');
const router = express.Router();

const{create,productByID,read,remove,update,list,listRelated,listCategories,listBySearch,photo,listSearch}=require('../controllers/product');
const{requireSignin,isAuth,isAdmin}=require('../controllers/auth');
const{userByID}=require('../controllers/user');


//single product read karne ke liye
router.get('/product/:productId',read);

// single product create karne ke liye
router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create);

// single product del karne ke liye
router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,remove);

//single product update ke liye
router.put('/product/:productId/:userId',requireSignin,isAuth,isAdmin,update);

//sare products dekhne ke liye
router.get('/products',list);

//Related products ke liye (single product ke )
router.get('/products/related/:productId',listRelated);


router.get('/products/categories',listCategories);

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

// route - make sure its post
router.post("/products/by/search", listBySearch);

//specific product searching
router.get("/products/search", listSearch);





//show product photo
router.get('/product/photo/:productId',photo);





router.param('userId',userByID);
router.param('productId',productByID);

module.exports=router;
const formidable = require("formidable");
const _ = require("lodash");
const fs = require('fs');
const {errorHandler} = require('../helpers/dbErrorHandler')
const Product = require("../models/product");


exports.productByID = (req,res,next,id)=>{
    Product.findById(id).exec((err,product)=>{
        if(err || !product){
            return res.status(400).json({
                error:'product not found'
            });
        }
        req.product=product;
        next();
    });
};

exports.read=(req,res)=>{
    req.product.photo = undefined;
    return res.json(req.product);
};

exports.create =(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:'Image could not be uploaded'
            });
        }
        let product = new Product(fields);

        if(files.photo){
            // console.log("files photo:",files.photo);
            if(files.photo.size>1000000){
                return res.status(400).json({
                    error:"image should be less than 1 mb"

                });
            }


            //check for all fields
            const{name,description,price,category,quantity,shipping} = fields;
            if(!name || !description ||!price || !category ||!quantity || !shipping){
                return res.status(400).json({
                    error:"all fields required"

                });}
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType=files.photo.type;
        }
        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)

                });
            }
            res.json(result);
        });
    });

};

//deldetion

exports.remove =(req,res)=>{
    let product =req.product;
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)

            });
        }
        res.json({
            deletedProduct,
            "message":'Product deleted!!' 
        });
    });
};

//update product
//similar to create
exports.update =(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:'Image could not be uploaded'
            });
        }
        let product = req.product;
        // we use lodash to take input to update

        product=_.extend(product,fields);

        if(files.photo){
            // console.log("files photo:",files.photo);
            if(files.photo.size>1000000){
                return res.status(400).json({
                    error:"image should be less than 1 mb"

                });
            }


            //check for all fields
            const{name,description,price,category,quantity,shipping} = fields;
            if( !name || !description || !price || !category || !quantity || !shipping){
                return res.status(400).json({
                    error:"all fields required"

                });}
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType=files.photo.type;
        }
        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)

                });
            }
            res.json(result);
        });
    });

};
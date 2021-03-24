const express = require('express');
const env = require('dotenv');
const app = express();



//Environment variable/ constants
env.config(); 


app.use(express.json());


app.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Hello from server'
    });

});

app.post('/',(req,res,next)=>{
    res.status(200).json({
        message: req.body
    });

});


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
});
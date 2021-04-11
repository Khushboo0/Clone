const express = require('express');
const mongoose=require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator'); 




require('dotenv').config();

//import routes
const UserRoutes =  require ('./routes/user');

//app
const app= express();

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true

}).then(() =>console.log('DB connected'));


//routes
// app.get('/',(req,res)=>{
//     res.send('Hello from node');

// });




//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(expressValidator(req));



//routes middleware
app.use('/api',UserRoutes);



const port=process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server running on port 8000`);
});
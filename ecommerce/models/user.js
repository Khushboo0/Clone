const mongoose = require ('mongoose');
//core node js module to hash the password
const crypto = require('crypto');

//unique id
const { v4: uuidv4 } = require('uuid');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required: true,
        maxLength:32
    },
    email: {
        type: String,
        trim:true,
        required: true,
        unique:32
    },
    //virtual field: we will take the password of the user but will save the hashed version of it.
    hashed_password: {
        type: String,
        required: true,
        
    },
    about: {
        type: String,
        trim:true,
        
    },

    //salt will be a long unique string will be used to generate the highest password again 
    salt: String,

    //two types of user 0: for regular user(default), 1: admin
    role:{
        type: Number,
        default: 0

    },
    //when user purchase item from out shop then those his parties will be stored he can see later the purchased items
    history:{

        type:Array,
        default:[]
    }
    
},{ timestamps: true });

//Virtual fields

userSchema.virtual('password')

//need to secure password so we are settig it using setter method getting will be done with getter method
// in setter method this is 'salt' field which where encrypted parts are stored 
// there is this method for encryption which is later on defined in schema 
.set(function(password){
    this._password=password
    this.salt=uuidv4()
    this.hashed_password=this.encryptPassword(password)

})

.get(function(){
    return this._password
})

userSchema.methods = {

    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;

    },




    encryptPassword: function(password){
        if(!password) return '';
        try{
            //Hmac is one of the encrypting method
            return crypto.createHmac('sha1',this.salt)
                        .update(password)
                        .digest("hex");

        }catch(err){
            return "";
        }
    }
};


module.exports=mongoose.model("User",userSchema);
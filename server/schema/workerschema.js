const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const workerschema=new mongoose.Schema({
    email:String,
    username:String,
    firstname:String,
    lastname:String,
    password:String,
    verified:Boolean,
    token:String,
    resettoken:String,
    country:String,
    city:String,
    area:String,
    postalcode:Number,
    position:String,
    work:[
        {
            location:{
                type:String,
                // required:true
            },
            message:{
                type:String,
                // required:true
            }
        }
    ],
    tokens:[
    {    
        token:{
            type:String,
            required:true
        }}
    ],
},
{
    collection:'worker'
}
)
workerschema.methods.generateAuthToken = async function ()
{
    try{
    let jwtoken = jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({token:jwtoken});
    await this.save();
    return jwtoken;
    }
    catch(err){
        console.log(err);
    }
}

const Schema=mongoose.model("Worker",workerschema);

module.exports=Schema;
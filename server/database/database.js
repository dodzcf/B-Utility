const mongoose=require('mongoose');
const dotenv=require('dotenv');

const db=process.env.DATABASE;

mongoose.connect(db,{
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
    useNewUrlParser:true
})
.then(()=>{
    console.log("connected to database")
})
.catch(()=>{
    console.log('Sorry not connected');
})
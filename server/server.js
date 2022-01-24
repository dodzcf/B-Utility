const express=require('express');
const cookieParser = require('cookie-parser');
const mongoose=require('mongoose');
const bp=require('body-parser');
const dotenv=require('dotenv');
const nodemailer=require('nodemailer');
const jwt=require('jsonwebtoken');
const config= require('./config');
const argon2 = require('argon2');
const sgMail=require("@sendgrid/mail")
const {google}=require('googleapis');
const app=express();
app.use(cookieParser());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }));
var cors = require('cors')

app.use(cors());

const result = dotenv.config()

if (result.error) {
  throw result.error
}


const port=result.parsed.port;

app.listen(port,(req,res)=>{
    console.log(port);
})

require('./database/database.js');

const User=require('./schema/schema.js');

const Worker=require('./schema/workerschema.js');
const { listenerCount } = require('./schema/schema.js');


app.post('/',async (req,res)=>{
    res.json({title: "GeeksforGeeks"});
    console.log({title: "GeeksforGeeks"});
})

const CLIENT_ID='1041154936057-p40ji4313itsrtuvhd5q954a669qut3t.apps.googleusercontent.com';
const CLIENT_SECRET='F7UfY0aYghagShGqPXxLBtYW';
const REDIRECT_URI='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//04OOOUF7g7DwtCgYIARAAGAQSNwF-L9IrKbwMrbo2FTzSL8xrQdXxqnWHN57SUlaw2-4Z8X-6RFjYpoDcEYkVRTMFAd5Ix7ex41g';

const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});

/////////////////////SIGN UP CODE /////////////////////////////

app.post('/signup',async (req,res)=>{

    
    const {username,firstname,lastname,password,email,country,city,area,postalcode,positions}=req.body;
    if(positions=="Customer")
    {
        console.log("Yes i am Customer");
    
    // console.log(req.body);
    try{
        let useremail = await User.findOne({ email:req.body.email });
        if(useremail){
            console.log("User with this Email already exists");
            // console.log(JSON.stringify(email));
            res.send("User with this Email already exists"); 
            return;
        }
        let userusername = await User.findOne({ username:req.body.username });
        // console.log(userusername);
        if(userusername){
            console.log("User with this username already exists");
            // console.log(JSON.stringify(username));
            res.send('User with this username already exists'); 
            return;
        }
     
     
    ///////////Token Generator/////////////////////
    function generate_token(length){
        //edit the token allowed characters
        var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        var b = [];  
        for (var i=0; i<length; i++) {
            var j = (Math.random() * (a.length-1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    }

    const hash = await argon2.hash(password);


    token =generate_token(32);
    //////////////////CREATING NEW USER////////////////////
    const newuser=new User({
        username:username,
        firstname:firstname,
        lastname:lastname,
        password:hash,
        email:email,
        verified:false,
        token:token,
        resettoken:"",
        jwtoken:"",
        country:country,
        city:city,
        area:area,
        postalcode:postalcode,
        position:positions,
        work:[{location:"Islamabad",message:"Welcome"}],
    })
    await newuser.save();
    
    const accessToken=await oAuth2Client.getAccessToken();

    //////////SENDING MAIL FOR VERIFICATION///////////////
    let transporter=nodemailer.createTransport({
        service: 'gmail',
        auth:{
            type: 'OAuth2',
            user:"dodzcorporation@gmail.com",
            pass:"N0rt@3212",
            clientId:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            refreshToken:REFRESH_TOKEN,
            accessToken:accessToken
        }
    });

    const url="http://"+req.get('host')+"/verify-email?token="+token;
    
    const msg={
        from:'dodzcorporation@gmail.com',
        to:email,
        subject:"Verification Link",
        html: '<h1>Hello</h1><br></br><p>Thank you for Registering</p><p>Click<a href="'+url+'"> here</a> to verify your account: </p>'
    }



    transporter.sendMail(msg,function(err,data){
        if(err){
            console.log('Error Occurs',err)
            res.send(err);
        }
        else
        {
            console.log('Email sent');
            res.send('sent');
            
        }
    })
    
    return res.send("Account Created Successfully");
    }
    
    catch(error){
        console.log(error);
    }  
}



/////////////WORKER Data////////////////////////////////////

if(positions=="Worker")
{
    console.log("Yes i am Worker");

console.log(req.body);
try{
    let useremail = await Worker.findOne({ email:req.body.email });
    if(useremail){
        console.log("User with this Email already exists");
        // console.log(JSON.stringify(email));
        res.send("User with this Email already exists"); 
        return;
    }
    let userusername = await Worker.findOne({ username:req.body.username });
    // console.log(userusername);
    if(userusername){
        console.log("User with this username already exists");
        // console.log(JSON.stringify(username));
        res.send('User with this username already exists');
        return;
    }
 
 
///////////Token Generator/////////////////////
function generate_token(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

const hash = await argon2.hash(password);


token =generate_token(32);
//////////////////CREATING NEW USER////////////////////
const newuser=new Worker({
    username:username,
    firstname:firstname,
    lastname:lastname,
    password:hash,
    email:email,
    verified:false,
    token:token,
    resettoken:"",
    jwtoken:"",
    country:country,
    city:city,
    area:area,
    postalcode:postalcode,
    position:positions,
    work:[{location:"Islamabad",message:"Welcome"}],
})
await newuser.save();

const accessToken=await oAuth2Client.getAccessToken();

//////////SENDING MAIL FOR VERIFICATION///////////////
let transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        type: 'OAuth2',
        user:"dodzcorporation@gmail.com",
        pass:"N0rt@3212",
        clientId:CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        refreshToken:REFRESH_TOKEN,
        accessToken:accessToken
    }
});

const url="http://"+req.get('host')+"/verify-email?token="+token;

const msg={
    from:'dodzcorporation@gmail.com',
    to:email,
    subject:"Verification Link",
    html: '<h1>Hello</h1><br></br><p>Thank you for Registering</p><p>Click<a href="'+url+'"> here</a> to verify your account: </p>'
}



transporter.sendMail(msg,function(err,data){
    if(err){
        console.log('Error Occurs',err)
        res.send(error);
    }
    else
    {
        console.log('Email sent');
        res.send('sent');
        
    }
})

return res.send("Account Created Successfully");
}

catch(error){
    console.log(error);
}  
}


///////////////Customer Data///////////////

if(positions=="Customer")
{
    console.log("Yes i am Customer");

console.log(req.body);
try{
    let useremail = await User.findOne({ email:req.body.email });
    if(useremail){
        console.log("User with this Email already exists");
        // console.log(JSON.stringify(email));
        res.send("User with this Email already exists"); 
        return;
    }
    let userusername = await Worker.findOne({ username:req.body.username });
    // console.log(userusername);
    if(userusername){
        console.log("User with this username already exists");
        // console.log(JSON.stringify(username));
        res.send('User with this username already exists');
        return;
    }
 
 
///////////Token Generator/////////////////////
function generate_token(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

const hash = await argon2.hash(password);


token =generate_token(32);
//////////////////CREATING NEW USER////////////////////
const newuser=new Worker({
    username:username,
    firstname:firstname,
    lastname:lastname,
    password:hash,
    email:email,
    verified:false,
    token:token,
    resettoken:"",
    jwtoken:"",
    country:country,
    city:city,
    area:area,
    postalcode:postalcode,
    position:positions,
    work:[{location:"Islamabad",message:"Welcome"}],
})
await newuser.save();

const accessToken=await oAuth2Client.getAccessToken();

//////////SENDING MAIL FOR VERIFICATION///////////////
let transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        type: 'OAuth2',
        user:"dodzcorporation@gmail.com",
        pass:"N0rt@3212",
        clientId:CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        refreshToken:REFRESH_TOKEN,
        accessToken:accessToken
    }
});

const url="http://"+req.get('host')+"/verify-email?token="+token;

const msg={
    from:'dodzcorporation@gmail.com',
    to:email,
    subject:"Verification Link",
    html: '<h1>Hello</h1><br></br><p>Thank you for Registering</p><p>Click<a href="'+url+'"> here</a> to verify your account: </p>'
}



transporter.sendMail(msg,function(err,data){
    if(err){
        console.log('Error Occurs',err)
        res.send(error);
    }
    else
    {
        console.log('Email sent');
        res.send('sent');
        
    }
})

return res.send("Account Created Successfully");
}

catch(error){
    console.log(error);
}  
}


})



/////////////////////SIGN IN CODE /////////////////////////////

app.post('/signin',cors(),async (req,res,next)=>{
    const{usernameoremail,password}=req.body;
    console.log(JSON.stringify(usernameoremail));
    let jwtoken;
    try{
    let useremail=await User.findOne({email:usernameoremail});
    let userusername=await User.findOne({username:usernameoremail});
    let useremailworker=await Worker.findOne({email:usernameoremail});
    let userusernameworker=await Worker.findOne({username:usernameoremail});


    if(useremail){
        console.log("Csutomer Email");
        const hash = await argon2.hash(password);
        try{
        if(await argon2.verify(useremail.password, password)!=true)
        {
            res.send("Wrong Password");
        }
        else
        {
            try{
            if(useremail.verified!=true)
            {
                return res.send("Account Not Verified");
                
            }
            else
            {
                // console.log("hey");
                ///SESSIONS
            const jwtoken = await useremail.generateAuthToken();
            res.cookie("jwtt",jwtoken,{
            expires:new Date(Date.now()+298501000),
            httpOnly:true
            });
            
           
                // console.log("The cookies are: ",JSON.stringify(req.cookies.jwtt));
                // console.log("Logged In");
                await useremail.save();
                const tok=useremail.tokens;
                const toke=tok[0].token;
                // console.log("came costu");
                return res.send(toke);
                
   
            
            
            }
        }
        catch(error)
        {

        }
    }
}
catch
{
    // console.log("Wrong pass");
    // return res.status(100).send("Wrong Password");
}
}
if(useremailworker){
    console.log("Came email worker");
    const hash = await argon2.hash(password);
    try{
    if(await argon2.verify(useremailworker.password, password)!=true)
    {
        res.send("Wrong Password");
    }
    else
    {
        try{
        if(useremailworker.verified!=true)
        {
            // console.log("Account Not Verified");
            res.send("Account Not Verified");
            
        }
        else
        {
            // console.log("hey");
            ///SESSIONS
        const jwtoken = await useremailworker.generateAuthToken();
        // console.log(jwtoken+" heybb");
        res.cookie("jwtt",jwtoken,{
        expires:new Date(Date.now()+298501000),
        httpOnly:true
        });
        
       
            // console.log("The cookies are: ",JSON.stringify(req.cookies.jwtt));
            // console.log("Logged In");
            await useremailworker.save();
            const tok=useremailworker.tokens;
            const toke=tok[0].token;
            // console.log(useremailworker.position);
            return res.send(toke);

        }
    }
    catch(error)
    {

    }
}
}
catch
{
// console.log("Wrong pass");
// return res.status(100).send("Wrong Password");
}
}
    if(userusername){
        // console.log("Came userusername");

            const hash = await argon2.hash(password);
            try{
            if(await argon2.verify(userusername.password, password)!=true)
            {
                res.send("Wrong Password");
            }
            else
            {
                try{
                if(userusername.verified!=true)
                {
                    // console.log("Account Not Verified");
                    res.send("Account Not Verified");
                    
                }
                else
                {
                    ///SESSIONS
                const jwtoken = await userusername.generateAuthToken();
                console.log(jwtoken);
                res.cookie("jwtt",jwtoken,{
                expires:new Date(Date.now()+298501000),
                httpOnly:true
                });
                
               
                await userusername.save();
                const tok=userusername.tokens;
                const toke=tok[0].token;
                return res.send(toke);
                
       
                
                
                }
            }
            catch(error)
            {
    
            }
        }
}
catch
{
    // console.log("Wrong pass");
    // return res.status(100).send("Wrong Password");
}
}

if(userusernameworker){
    console.log("Came 1");
    const hash = await argon2.hash(password);
    try{
    if(await argon2.verify(userusernameworker.password, password)!=true)
    {
        res.send("Wrong Password");
    }
    else
    {
        try{
        if(userusernameworker.verified!=true)
        {
            // console.log("Account Not Verified");
            res.send("Account Not Verified");
            
        }
        else
        {
            ///SESSIONS
        const jwtoken = await userusernameworker.generateAuthToken();
        console.log(jwtoken);
        res.cookie("jwtt",jwtoken,{
        expires:new Date(Date.now()+298501000),
        httpOnly:true
        });
        
       
        await userusernameworker.save();
        const tok=userusernameworker.tokens;
        const toke=tok[0].token;
        return res.send(toke);
        

        
        
        }
    }
    catch(error)
    {

    }
}
}
catch
{
// console.log("Wrong pass");
// return res.status(100).send("Wrong Password");
}
}
    if(!useremail && !userusername && !useremailworker && !userusernameworker)
    {
        res.send("No Account with this email or username");
    }
    
    }
    catch(error)
    {
        console.log(error);
    }
})

app.get('/verify-email',async (req,res,next)=>{
    const user=await User.findOne({token:req.query.token});
    const worker=await Worker.findOne({token:req.query.token});
    if(!user && !worker){
        console.log("No userd");
        return;
    }
    if(user){
    user.token=null;
    user.verified=true;
    await user.save();
    // res.send("<h1 class='d-flex justify-content-center'>Account Verified<h1><br></br><p>Please go back to the Login Page of the website to Login into your Account.</p>");
    res.redirect('http://dannylingual.com/');
    }
    if(worker){
        worker.token=null;
        worker.verified=true;
        await worker.save();
        // res.send("<h1 class='d-flex justify-content-center'>Account Verified<h1><br></br><p>Please go back to the Login Page of the website to Login into your Account.</p>");
        res.redirect('http://dannylingual.com/');
        }
})


app.post('/forgotpassword', async (req,res)=>{

    const usernameoremail=req.body.usernameoremail;
    // console.log(usernameoremail);

    try{
    let useremail=await User.findOne({email:usernameoremail});
    let userusername=await User.findOne({username:usernameoremail});
    
    if(useremail)
    {
/////////////////////// RESET PASSWORD////////////////////


        const accessToken=await oAuth2Client.getAccessToken();

        //////////SENDING MAIL FOR VERIFICATION///////////////
        let transporter=nodemailer.createTransport({
            service: 'gmail',
            auth:{
                type: 'OAuth2',
                user:"dodzcorporation@gmail.com",
                pass:"N0rt@3212",
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        });
        function generate_token(length){
            //edit the token allowed characters
            var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
            var b = [];  
            for (var i=0; i<length; i++) {
                var j = (Math.random() * (a.length-1)).toFixed(0);
                b[i] = a[j];
            }
            return b.join("");
        }

        const rtoken=generate_token(32);

      

        useremail.resettoken=rtoken;

        await useremail.save();
        const url="http://"+req.get('host')+"/resetpassword/"+rtoken;

        const msg={
            from:'dodzcorporation@gmail.com',
            to:usernameoremail,
            subject:"Verification Link",
            html: '<h1>Hello</h1><br></br><p>You have requested to reset your password.</p><p>Click<a href="'+url+'"> here</a> to reset your password: </p><br></br><p>If this is not you then ignore the mail.</p>'
        }

        

        transporter.sendMail(msg,function(err,data){
            if(err){
                console.log('Error Occurs',err)
            }
            else
            {
                console.log('Email sent');
                res.send("Password Request Sent");
                
            }
            return;
        })
        
        }   



////////////////////////////////////////////
    if(userusername)
    {
        
            // console.log(userusername);
    /////////////////////// RESET PASSWORD////////////////////
    
    const accessToken=await oAuth2Client.getAccessToken();

    //////////SENDING MAIL FOR VERIFICATION///////////////
    let transporter=nodemailer.createTransport({
        service: 'gmail',
        auth:{
            type: 'OAuth2',
            user:"dodzcorporation@gmail.com",
            pass:"Mezuniyet3",
            clientId:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            refreshToken:REFRESH_TOKEN,
            accessToken:accessToken
        }
    });
            function generate_token(length){
                //edit the token allowed characters
                var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
                var b = [];  
                for (var i=0; i<length; i++) {
                    var j = (Math.random() * (a.length-1)).toFixed(0);
                    b[i] = a[j];
                }
                return b.join("");
            }
    
            const resettingtoken=generate_token(32);
    
            userusername.resettoken=resettingtoken;

            await userusername.save();

            const url="http://"+req.get('host')+"/resetpassword?token="+resettingtoken;
    
            const msg={
                from:'dodzcoeporation@gmail.com',
                to:userusername.email,
                subject:"Verification Link",
                html: '<h1>Hello</h1><br></br><p>You have requested to reset your password.</p><p>Click<a href="'+url+'"> here</a> to reset your password: </p><br></br><p>If this is not you then ignore the mail.</p>'
            }
    
            
    
            transporter.sendMail(msg,function(err,data){
                if(err){
                    console.log('Error Occurs',err)
                }
                else
                {
                    console.log('Email sent');
                    res.send("Password Request Sent");
                    
                }
            })
    }
    if(!userusername && !useremail)
    {
        console.log("No such account");
        res.send("No account");
    }


}
    catch(err)
    {
        console.log(err);
    }
    

})
app.post('/resetpassword/:token',async (req,res)=>
{
    console.log(req.params.token)
    const token=req.params.token;
    const password=req.body.pass1;
    const password2=req.body.pass2;

    if(password!=password2)
    {
        res.send(alert("Passwords Not Equal"));
        res.render('fpass');
        return;
    }
    else
    {
        try{
            let person=await User.findOne({resettoken:token});
            console.log(person.email);
            if(person)
            {
                const hash = await argon2.hash(password);
                person.password=hash;
                person.resettoken="";
                await person.save();
                // res.render('success');
                res.redirect("http://dannylingual.com/")
                // return;
            }


        }
        catch(error)
        {
            console.log("Error Found"+error);
        }
    }
    
})


app.set('view engine','ejs');
app.get('/resetpassword/:token',async (req,res)=>
{   
    res.render('fpass');
    
})
app.post('/resetpassword/:token',async (req,res)=>
{
    console.log(req.params.token)
    const token=req.params.token;
    const password=req.body.pass1;
    const password2=req.body.pass2;

    if(password!=password2)
    {
        res.send(alert("Passwords Not Equal"));
        res.render('fpass');
        return;
    }
    else
    {
        try{
            let person=await User.findOne({resettoken:token});
            console.log(person.email);
            if(person)
            {
                const hash = await argon2.hash(password);
                person.password=hash;
                person.resettoken="";
                await person.save();
                // res.render('success');
                res.redirect("/")
                // return;
            }


        }
        catch(error)
        {
            console.log("Error Found"+error);
        }
    }
    
});

app.post('/user_pos',async (req,res)=>
{
    console.log(req.body.token);
    const token=req.body.token;
    console.log (token);
    const user=await User.findOne({"tokens.token":token});
    const worker=await Worker.findOne({"tokens.token":token});
    console.log("Hey");
    if(user){
        res.send(user.position);
    }
    else if(worker){
        res.send(worker.position);
    }
    else
    {
        res.send("No User userpos");
    }

});

app.post('/getData',async (req,res)=>
{
    const tokent=req.body.token;
    const tt=tokent.token;
    console.log(tokent);

    const tokenn=JSON.stringify(req.body.token);
    console.log(tokenn);
    const user=await User.findOne({"tokens.token":req.body.token});
    
    const worker=await Worker.findOne({"tokens.token":req.body.token});
    if(user){
        // console.log(user);
        res.send(user);
    }
    else if(worker){
        // console.log(worker);
        res.send(worker);
    }
    else
    {
        res.send("No User");
    }

});


app.post('/addPost',async (req,res)=>
{
    
    let worker=await Worker.findOne({"tokens.token":req.body.token});

    console.log(worker);

    let workk=worker.work;

    let i=0;
    while(workk[i])
    {
        i=i+1;
    }

    workk[i]=req.body;
    worker.work=workk;
    await worker.save();
    

    res.send("Success");

});

app.post('/getPost',async (req,res)=>
{

    let worker=await Worker.findOne({"tokens.token":req.body.token});
    

    // console.log(worker);

    // if(!worker.work){
    return res.send(worker.work);
    // }

});


app.post('/deleteMessage',async (req,res)=>
{

    const {token,id}=req.body;

    


    let worker=await Worker.findOne({"tokens.token":req.body.token});
    

    

    
    if(worker)
    {
        var workk=worker.work;

        for(var i=0;workk[i]!=null;i++){
            // console.log(workk[i]);
            if(workk[i]._id==id)
            {
                workk.pop(workk[i]) ;
                // workk[i]=null;  
                await worker.save();
                // workk=null;
                console.log(worker.work);
                console.log("Yes");
                
                res.status(200);
                return;
            }
        }
        
    }


    
    res.send("Deleted");

});

app.post('/editPost',async (req,res)=>
{

    const {token,id}=req.body;

    


    let worker=await Worker.findOne({"tokens.token":token});
    
   
    console.log("came");

    
    if(worker)
    {
        console.log("came2");
        var workk=worker.work;

        for(var i=0;workk[i]!=null;i++){
            // console.log(workk[i]);
            console.log(id);
            console.log(workk[i]._id);
            if(workk[i]._id==id)
            {
                console.log("came4");
                workk[i].location=req.body.location;
                workk[i].message=req.body.message;
                await worker.save();
                console.log(worker.work);
                res.send("Done");
                return;
            }
        }
        
    }


    
    res.send("Deleted");

});


app.post('/getFeed',async (req,res)=>
{

    let worker=await Worker.find();    

    console.log("came here");
    // console.log(typeof worker.work[0]._id);
    return res.send(worker.work);

});

app.post('/text',async (req,res)=>
{
    // const {id}=req.body;
    // console.log(typeof id);
    // var aid=parseInt(id);
    let worker=await Worker.find();

    console.log(worker[0]);

    return res.send(worker);

});

app.post('/getFeed2',async (req,res)=>
{

    let worker=await Worker.find();    

    console.log(JSON.stringify(worker[0].work[0]));
    // console.log(typeof worker.work[0]._id);
    return res.send(worker[0].work);

});
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const { authenticated, users } = require('./router/auth_users.js');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());
const authenticatedUser = (username,password)=>{
    let validUser =users.filter((user)=>{
        return(user.username === username && user.password === password);
    })
    if(validUser.length>0)
    {
        return true;
    }
    else{
        false;
    }
}

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
const username = req.body.username;
const password = req.body.password;
if(!username || !password){
    return res.status(404).json({message:"Error loggin in"});
}
//Authenticate user 
if(authenticatedUser(username,password))
{
    let accessToken = jwt.sign({
        data:password
    },'access',{expiresIn:60*60});

    req.session.authorization = {
     accessToken,username
}
return res.status(200).send("User logged successfully")
} 
else{
    return res.status(208).json({message:"Invalid login. check username and password"})
}
});
const authenticateJWT = (req,res,next)=>{
    const token = req.headers['authorization'];
    if(!token){
    return res.status(403).json({message:"No token provided"})
    }
    jwt.verify(token,'access_secret',(err,decoded)=>{
        if(err){
            return res.status(401).json({message:"Invalid token"})
        }
        req.user = decoded;
        next();
    })
}

 
const PORT =5000;
app.use("/customer",authenticateJWT)
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));

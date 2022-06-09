const express = require("express")
const app = express()
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const bodyParser=require("body-parser")
 // connection of express to mongoDb with mongoose
var session = require('express-session')
const User = require('./models/user')
const Questions = require("./models/questions")



const connection = mongoose.connect("mongodb://127.0.0.1:/imageAnnotation_db", {useNewUrlParser:true , useUnifiedTopology:true})
.then(()=>{
    console.log("Connection Open MongoDB")
}).catch(err =>{
    console.log("Oh no Error")
})




app.use(session({
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/imageAnnotation_db' }),
    //genid: function(req) {
      //  return genuuid() // use UUIDs for session IDs
      //},
    secret : "some secret" ,
    resave : false,
    saveUninitialized:true,
    cookie : {
        maxAge : 1000* 60 * 60 * 24
    }
}))

//Middleware for dataTypes , raw , Jason
//app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));



app.get("/" , (req,res)=>{
    console.log(req.session)
    res.send("<h1>Hello World Sessions</h1>")
})

app.get("/app" , async (req,res)=>{
    await res.send({"Users":["user1","user2","user3"]})
    
})

app.get('/user/:token', async (req, res) => {
    const token = req.params.token;

    console.log(token)

    const newUser = new User();
    newUser.token = token;

    const user = await newUser.save();

    console.log(user);

    res.status(200).send(user)

})

app.post("/Questionaries",(req,res)=>{
    console.log(req.body)
    
})


app.listen("4000",()=>{console.log("Server listening on port 4000")})

//Express
const express = require("express");
const mongoose= require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./routes/users.routes'); 
const currenciesRouter = require('./routes/currencies.routes');
const blogRouter = require('./routes/blog.routes')
// const verifyAuth = require('./middlewares/verifyAuth'); 
const verifyBody = require('./middlewares/verifyBodyType');


const app = express();
const PORT= 8082; 



const {getCurrencies,getCurrencyBySymbol} = require("./controllers/currencies.controller");
const {getUsers,getUserByUserId,searchUser}= require("./controllers/users.controller");
const verifyBodyType = require("./middlewares/verifyBodyType");
// const { default: mongoose } = require("mongoose");
const DB_URI=process.env.DB_URI;

app.use(verifyBodyType);
app.use(express.json()) // this particular middleware will help to send the body along with the  request as json 

//because in general body is sent in a binary format  

const connectDB= async ()=>{
    try{
    await mongoose.connect(`${DB_URI}`)
    console.log("connected to DB at", DB_URI);
    }

    catch(error){
        console.log("failed to connect to DB",e )

    }
}

connectDB();





 
app.get('/',(req,res)=>{
    res.send('<h1>Currency Database </h1>');
});

// app.get('/status', verifyAuth, (req,res)=>{
//     res.send("API WORKING");
// })
app.get('/status', (req,res)=>{
    res.send("API WORKING");
})

// app.use(verifyAuth);
 

app.use('/currencies',currenciesRouter);


// app.get('/currencies/:symbol', getCurrencyBySymbol);


//  users/:uuid



app.use('/users',userRouter);
app.use("/blogs", blogRouter);

app.post('/',(req,res)=>{
    res.status(200)
    .header({"Content-Type": "application/json"})
    .send({message: "Api Working"});


});



app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

})
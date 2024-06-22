//Express
const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./routes/users.routes'); 
const currenciesRouter = require('./routes/currencies.routes');


const app = express();
const PORT= 8082; 

const {getCurrencies,getCurrencyBySymbol} = require("./controllers/currencies.controller");
const {getUsers,getUserByUserId,searchUser}= require("./controllers/users.controller");



app.get('/',(req,res)=>{
    res.send('<h1>Currency Database </h1>');
});


app.use('/currencies',currenciesRouter);


// app.get('/currencies/:symbol', getCurrencyBySymbol);


//  users/:uuid

app.use('/users',userRouter);

app.post('/',(req,res)=>{
    res.status(200)
    .header({"Content-Type": "application/json"})
    .send({message: "Api Working"});


});



app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

})
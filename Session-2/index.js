//Express
const express = require("express");

const app = express();

const {getCurrencies,getCurrencyBySymbol} = require("./controllers/currencies.controller");

const PORT= 8082;

app.get('/',(req,res)=>{
    res.send('<h1>Currency Database </h1>');
});


app.get('/currencies',getCurrencies);


app.get('/currencies/:symbol', getCurrencyBySymbol);




app.post('/',(req,res)=>{
    res.status(200)
    .header({"Content-Type": "application/json"})
    .send({message: "Api Working"});


})



app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

})
//Express

const express = require("express");

const app = express();
currencyData = require('./currencies.json');

const PORT= 8082;

app.get('/',(req,res)=>{
    res.send('<h1>Currency Database </h1>');
});


app.get('/currencies',(req,res)=>{
    
    res.send(currencyData);
});


app.get('/currencies/:symbol',(req,res)=>{
    
    console.log(req.params.symbol);


    const reqCurrObj = currencyData.data.find((curr)=> curr.id.toLowerCase() == req.params.symbol);

    if(reqCurrObj === undefined){
       return  res.status(404).send("wrong request")
    }
    res.json(reqCurrObj);
   
})




app.post('/',(req,res)=>{
    res.status(200)
    .header({"Content-Type": "application/json"})
    .send({message: "Api Working"});


})



app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

})
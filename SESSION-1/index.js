

// const sum = require("./cal");

// console.log(sum(2,53));

//Creating Http 

const { application, json } = require("express");
const http =  require("http");
const axios = require('axios');


 const server =  http.createServer(async (req,res)=>{
    // console.log("request received!");

    const currenciesData = require('./currencies.json');

    console.log(req.url);


    switch(req.url){
        case '/': 
        res.writeHead(200, { "Content-Type" : 'application/html'});
        res.write('<h1> Currecny Database</h1>');
        res.end();
        break;


        case '/currencies': 
        // res.writeHead(200, { "Content-Type" : 'application/json'});
        // res.write(JSON.stringify(currenciesData));
        // res.end();
        const response = await axios.get('https://api.coinbase.com/v2/currencies');
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(response.data));
        break;

        default:
            res.writeHead(404);
            res.end("path not found");

    }




//     const date = new Date().toLocaleDateString();
//     const time = new Date().toLocaleTimeString();

//     // sending JSON object->

//     const serverInfo = {
//         name: "xyz",
//         version: "1.0.0",
//        currentDate: new Date().toLocaleDateString(),
//        currentTime: new Date().toLocaleTimeString()
//  };

//     res.writeHead(200,{"Content-Type": "application/json" });


//     // res.write(`server started on ${date}, ${time}\n`);
//     res.write(JSON.stringify(serverInfo));
    // res.end();

});

const port = 8082
server.listen(port, ()=>{
    console.log(`server started ${port}`);
})









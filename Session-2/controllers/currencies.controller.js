const getCurrencies = (req,res)=>{
    console.log(req.query);
    // console.log(req.params.symbol);
    const {min_value} = req.query;
    if(min_value){
       return res.json(currencyData.data.filter((curr)=>{
            curr.min_size === min_value;

        }))
}

return res.json(currencyData);
};

const getCurrencyBySymbol = (req,res)=>{
    
    
    console.log(req.params.symbol);


    const reqCurrObj = currencyData.data.find((curr)=> curr.id.toLowerCase() == req.params.symbol);

    if(reqCurrObj === undefined){
       return  res.status(404).send("wrong request")
    }
    res.json(reqCurrObj);
   
};

module.exports = {getCurrencies,getCurrencyBySymbol};



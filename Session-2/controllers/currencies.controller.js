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

module.exports = {getCurrencies};
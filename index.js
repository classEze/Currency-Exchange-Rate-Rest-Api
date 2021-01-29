const express = require('express')
const app = express()
const axios = require('axios')

app.get('/api/rates' , async (req,res) => {
    if(!req.query.base || !req.query.currency)
    return res.status(400).send(" Request Failed, You must include all required parameters");

    let {base,currency} = req.query

    // Allow for case insensitivity
    base = base.toUpperCase();
    currency = currency.toUpperCase();

     // set endpoint to query using user entered parameters
    const url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`

 try{
    const result = await axios.get(url)
     res.status(200).json({ result: result.data})
 }
 catch(error){
     res.status(400).send( ` ${error.message}. You might want to check your url endpoint again` )
 }
})

const port = process.env.port || 2021
app.listen( port, console.log(`Server started on port ${port}`))
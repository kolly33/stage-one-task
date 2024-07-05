const express = require("express")
const app = express();
const axios = require('axios');
const requestIP = require("request-ip");
require('dotenv').config();

const PORT = process.env.PORT || 5005

app.get("/api/hello", async (req,res)=>{

try {
    //const remoteAddress = requestIP.getClientIp(req);
    
    //console.log(remoteAddress)
    const remoteAddress = req.ip;
    
    const isIPv6 = remoteAddress.includes(':');
    //console.log(isIPv6)
    const ipv4Address = isIPv6 ? remoteAddress.split(':').reverse()[0] : remoteAddress;
    console.log(ipv4Address)
    const visitor_name = req.query.visitor_name

    const response = await axios.get( `http://api.weatherapi.com/v1/current.json?key=583df8ebb99c4a91bb9210247240307&q=100.0.0.1`)
  
    const data = response.data
    console.log(data)
    return res.status(200).json({
      client_ip:'100.0.0.1',
      country:data.location.country,
      location:data.location.name,
      greeting:`Hello, ${visitor_name}!, the temperature is ${data.current.temp_c} celcius in ${data.location.name}`,

  })

 } catch (error) {


    res.status(500).json({ error: error.message });

  };


})

   
     
    

app.listen(5001, (req, res)=>{
    console.log(`The server is runing at ${PORT}`)

})
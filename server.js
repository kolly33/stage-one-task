const express = require("express")
const app = express();
const axios = require('axios');
const requestIP = require("request-ip");
require('dotenv').config();

const PORT = process.env.PORT || 5005
app.set('trust proxy', true)
app.get("/api/hello", async (req,res)=>{

try {
    //const remoteAddress = requestIP.getClientIp(req);
    const { visitor_name } = req.query || {}; 
    const ipv4Address = req.ip;
    console.log(ipv4Address)
    
    // const remoteAddress = req.ip;
    
    // const isIPv6 = remoteAddress.includes(':');
  
    // const ipv4Address = isIPv6 ? remoteAddress.split(':').reverse()[0] : remoteAddress;
    
    // const visitor_name = req.query.visitor_name

    const response = await axios.get( `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${ipv4Address}`)
  
    const data = response.data
    console.log(data)
    return res.status(200).json({
      client_ip:ipv4Address,
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
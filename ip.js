const express = require("express");
const ip = require("ip");
const app = express()
const PORT = 8000

app.get("/",(req,res)=>{
     const serverIp = ip.address();
     return res.json({
        ping: 'Pong',
        message: serverIp
     })
})



app.listen(PORT , ()=>{console.log("server started at ",PORT)})
// set up server using express js

const express = require("express");

const app = express();

app.get("/blogs",(request,response)=>{
    console.log(request.pathname)
    response.send("Hello from server");
})


app.listen(3000,()=>{
    console.log("server started a port : 3000")
})
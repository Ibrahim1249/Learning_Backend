const fs = require("fs");
const http = require("http");
const url = require("url")


const myServer = http.createServer((req,res)=>{
    if(req.url === "/favicon.ico") return res.end()
    const log = `${Date.now()} : ${req.url} New Request Received \n`;
    const myUrl = url.parse(req.url,true)
    console.log(myUrl)
    fs.appendFile("./log.txt",log,(err,data)=>{
// req.url in switch
        switch(myUrl.pathname){
            case "/" : res.end("Home Page");
            break;
            case "/about" : 
            const username = myUrl.query.name;
            res.end(`hy ${username}`);
            break;
            case "/search" : 
            const search = myUrl.query.search_query;
            res.end(`This is your result ${search}`)
            break;
            default : res.end( "404 Not Found");
        }
    })
})

myServer.listen(8000,()=>{console.log("Server is Started")})
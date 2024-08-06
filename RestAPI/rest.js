
const express = require("express");
const path = require('path');
const users = require("../MOCK_DATA.json")

const PORT = 8000;
const app = express();
const fs = require("fs");
const filePath = path.join(__dirname, '../MOCK_DATA.json');

// middleware - > plugin basically help us to read post req 
app.use(express.urlencoded({extended : false}))

// route
// for html
app.get("/users",(req,res)=>{
     const html = `<ul>
      ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
     </ul>`
     res.send(html)
})

// for cross platform 

app.get("/api/users",(req,res)=>{
     return res.json(users);
})

// for single user
app.route("/api/users/:id").get((req,res)=>{
       const id = Number(req.params.id);
     const user = users.find((user)=> user.id === id);
     if(user === undefined){
          return res.json({ status: "error", message: "User not found" });
     }
     return res.json(user);       
}).patch((req,res)=>{
     // edit user with id 
     const id = Number(req.params.id);
     const body = req.body;

     const updatedIndex = users.findIndex((user)=> user.id === id);
     if(updatedIndex === -1){
          return res.json({ status: "error", message: "User not found" });
     }
      
     users[updatedIndex] = {...users[updatedIndex] , ...body}
      fs.writeFile(filePath,JSON.stringify(users),(err)=>{
          if(err){
             return res.json({status:"error" , message : "Failed to update data"})
          }
          return res.json({status:"success " , id : id})
      })

}).delete((req,res)=>{
   const id = Number(req.params.id);
   const findObjIndex = users.findIndex((user)=>user.id === id);
    if(findObjIndex === -1){
      return res.json({status:"error",message:"user not found"});''
    }
      users.splice(findObjIndex,1);
    fs.writeFile(filePath,JSON.stringify(users),(err)=>{
       if(err){
          return res.json({status:"error",message:"Failed to delete user"})
       }
       return res.json({status:"success", id : id})
    })
})

// create new user 
app.post("/api/users",(req,res)=>{
     const newUser = req.body;
     users.push({...newUser , id : users.length + 1});
     // we have to write the user in data base / or dummy data as well
     fs.writeFile(filePath,JSON.stringify(users),(err,data)=>{
          return res.json({status:"success",id:users.length})
     })
})

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})
const fs = require("fs");

// fs.writeFileSync("./test.txt","hello my name is ibrahim")
// fs.writeFile("./test.txt","hello my name is ibrahim is here" ,(err)=>{})

// const result = fs.readFileSync("./test.txt","utf-8");
// console.log(result);

// fs.readFile("./test.txt","utf-8",(err, result)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// })

// fs.appendFileSync("./test.txt",`${Date.now()} Hey their\n`)

// copy
fs.copyFileSync("./test.txt","./copy.txt");

// delete

fs.unlinkSync("./copy.txt");
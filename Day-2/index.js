import express from "express"

const app = express();

app.get("/Jagrut", (req,res) => {res.send("Jagrut Tawade")})
//Sending Responses
app.get("/",(req,res)=>{res.send(`<h1 style="color: red">Hold up! I am Cookin.</h1>`)})//HTML and JSON (Converts Auto)
app.get("/json",(req,res) => {res.json({'name':'Jagrut', 'age':24})})//specific JSON
app.get("/error",(req,res)=> {res.status(404).send("Not Found!")})

app.listen(3000, () => {console.log("Server is runnning on port 3000")})
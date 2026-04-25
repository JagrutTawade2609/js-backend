import express from "express";

const app = express();

app.use(express.json()) //parse json to read req.body

let users =[{id:1,name:"Jagrut"}]


app.get("/users",(req,res) => {
    res.json(users)
})

app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body }
  users.push(newUser)
  res.json(newUser)
})
app.put("/users/:id", (req,res) => {
    const user = users.find( u => u.id == req.params.id)
    user.name = req.body.name
    res.json(user)
})
app.delete("/users/:id", (req,res) => {
     users = users.filter( u => u.id != req.params.id)
    res.json({message: "User is deleted"})
})
app.listen(8000,() =>{
    console.log("I am listening: This is server 8000")
})
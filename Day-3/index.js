import express from "express";

const app = express();

app.use(express.json()) //parse json to read req.body

let users =[
    {id:1, name:"Jagrut"},
    {id:2, name:"Aditya"}
]

let orders = [
    {orderId:1, name:'mobile'},
    {orderId:2, name:'laptop'}
]


app.get("/users",(req,res) => {
    res.json(users)
})

//multiple route parameter
//specific users and orders data according to the id
app.get("/users/:id/orders/:orderId", (req,res) => {
    const user = users.find( u => u.id === Number(req.params.id))//req.params are always strings
    const order = orders.find(o => o.orderId === Number(req.params.orderId))
    res.json({user,order})//res.json() only takes ONE argument — wrap multiple in an object { }

})
//query parameter
app.get("/orders",(req,res) => {
    res.json(req.query) //http://localhost:8000/orders?orderId=1&name=mobile
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
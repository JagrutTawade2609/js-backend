import express from "express"

const app = express();

app.use(express.json())

let users = [
    {id:1, name:"Jagrut"}
]

//Logger middleware 
app.use((req,res,next) => { //runs for every route request
    const time = new Date().toISOString(); //returns date & time 
    console.log(time,req.url,req.method,"Logger Middleware executed") //contains time, requested url, requested method and string
    next()
})//Purpose (debugging, monitoring)

//Global authentication 
app.use((req,res,next) => {
    if(req.body?.isAuthenticated == true){
        console.log("Global middleware executed")
        //res.send() --> this is not allowed //route will not execute because of 2 responses
        return next()
    }
    else {
        return res.send("Unauthorized")
    }

})

const userAuth = ((req,res,next) => {
    try {
    console.log("User Middleware executed");
    const isUserAuthenticated = true;
    if (isUserAuthenticated) {
      return next();
    } else {
      return res.send("Not authenticate.");
    }
    console.log("Middleware executed after next");
  } catch (error) {
    return res.status(500).json({ error });
  }
})

//Route
app.get("/users", userAuth, (req,res) => {
    res.json(users)
})

app.listen(6000, () => {
    console.log("Server started succesfully on port 6000")
});
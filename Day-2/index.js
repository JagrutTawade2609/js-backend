import express from "express"

const app = express();

app.get("/Jagrut", (req,res) => {res.send("Jagrut Tawade")})

app.listen(3000, () => {console.log("Server is runnning on port 3000")})
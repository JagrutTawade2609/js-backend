const http = require("http") //This is how http module is imported and stored it in http variable

const myServer = http.createServer((req, res)=> {
    console.log(req.url, "req.url");
    console.log(req.headers)
    if (req.url === "/"){
        res.write("This is Homepage")
    }else if (req.url === "/login"){
        res.write("This is login page")

    }else if (req.url === "/about"){
        res.write("This is about page")

    }else{
        res.write("page not found !!!")
    }
    res.end();


})
//listen(PORT, CALLBACK)
myServer.listen(8000, () => {
    console.log("Server is running on port 8000");
})
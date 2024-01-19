const datas = "mongodb+srv://hariprasad:hariprasad@cluster0.eqdo1uy.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");

mongoose.connect(datas, {})
.then(()=> console.log("Connect sucessfully...."))
.catch((error)=> console.log(error));

const express = require("express");
const app = express();
app.use(express.json());

var cors = require('cors')
app.use(cors());

const userSchema = new mongoose.Schema(
    {
    name: String,
    city: String,
    age: Number  
}
);


const DB_data = new mongoose.model("Users", userSchema);



app.get("/users", async (req, res)=> {
    let data = await DB_data.find();
    res.send(data)
})

app.get("/users/:id", async (req, res)=> {
    let data = await DB_data.find({_id: req.params.id});
    res.send(data[0]);
})
app.delete("/users", async(req, res)=> {
    let data = await DB_data.deleteOne({_id: req.query.id});
    res.send(data);
})

app.put("/users", async(req, res)=>{
    let u_data = await DB_data.updateOne({_id: req.body.id}, {
        "$set":{
            "name": req.body.name,
            "city": req.body.city,
            "age": req.body.age
        }
    });
    res.send(u_data);
})

app.use(express.json());
app.post("/users", async (req, res)=>{
    let obj = new DB_data(req.body)
    let result = await obj.save();
    res.send(result)
})

app.listen(9090, ()=> {
    console.log("Listening 9090..... ")
})
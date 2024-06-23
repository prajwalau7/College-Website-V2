const express = require("express");
const Joi = require("joi");
const port = process.env.PORT || 3000;
const app = express();
const mongoose=require('mongoose')


mongoose.connect('mongodb+srv://root:admin@nodeapi.fwd0g0d.mongodb.net/?retryWrites=true&w=majority&appName=NodeApi')
  .then(() => console.log('DB Connected!'));
app.use(express.json());


let arr = [
  { id: 1, name: "A1" },
  { id: 2, name: "A2" },
  { id: 3, name: "A3" },
  { id: 4, name: "A4" },
];

app.get("/", (req, res) =>{
  res.send("You are in Hope page....!");
});

app.get('/crud/arr',(req,res)=>{
    res.send(arr);
})

//end point
app.get('/crud/arr/:id',(req,res)=>{
    const idcheck=arr.find(c => c.id===parseInt(req.params.id));
    if(!idcheck) res.status(404).send("No data found on this id");
    res.send(idcheck);
})

app.post('/crud/arr',(req,res)=>{

    const validate=validation(req.body);
    if(validate.error){
        res.status(400).send(validate.error.details[0].message);
        return;
    }

    const data={
        id:arr.length+1,
        name:req.body.name,
    }

    arr.push(data);
    res.send(data);
})

app.put('/crud/arr/:id',(req,res)=>{
    const idcheck=arr.find(c => c.id===parseInt(req.params.id));
    if(!idcheck) res.status(404).send("No data avaoilabe on this ID");

    idcheck.name=req.body.name;
    res.send(idcheck);
})

app.delete('/crud/arr/:id',(req,res)=>{
    const idcheck=arr.find(c => c.id===parseInt(req.params.id));
    if(!idcheck) res.status(404).send("No data avaoilabe on this ID");

    const index=arr.indexOf(idcheck);
    arr.splice(index,1);
    res.send(idcheck);
})

function validation(idcheck){
    const schema={
        name:Joi.string().min(3).required(),
    }
    return Joi.validate(idcheck,schema);
}

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

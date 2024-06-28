const express = require('express');
const app = express();
const cors = require('cors');
const {MongoClient} = require('mongodb')

let user = []
let db = '';


async function mongoConnect() {
    let client = new MongoClient('mongodb+srv://anshif:nesRoWgW5SqAD0yF@cluster0.8dtglzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    await client.connect();
    db = client.db('test');
   ;
 }
 
 

app.use(cors());    
app.use(express.json());

app.get('/users', async function (req, res) {
    let output = await db.collection('user').find({"userName":"human"}).toArray();
    res.json(output);
});

app.get('/users',function(req,res){
    res.json(user)
})


app.post('/signup', async function(req, res) {
    let output = await db.collection('user').insertOne(req.body);
    console.log(req.body);
})
app.post('/login',async function(req,res) {
    console.log(req.body);
    let output = await db.collection('user').find({"email":req.body.email}).toArray();
    console.log(output);
    if(output.length==0){
        return res.json('email not found')}
        else{
            if(output[0].password==req.body.password){
                return res,json(output[0])}
            }
        }
);
        
/*app.post('/login',function(req,res) {
    console.log(req.body);
    for(let i = 0;i < info.length;i++){
        if(info[i].input1 == req.body.input1){
            if(info[i].input2 == req.body.input2){
                return response.json(info[i]);
            }
        }
    
    return response.json("email not found")
       // user.push(req.body);
})*/


app.listen(5001,function() {
    console.log('server is ready,Listening on port 5001')
    mongoConnect()
})

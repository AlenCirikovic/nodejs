const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
const app = express();
mongoose.set('strictQuery',false);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const PORT = process.env.PORT || 3000; // Common setup for setting ports
const CONNECTION = process.env.CONNECTION;


const customers = [
    {
        "name": "Alen",
        "industry": "Music"
    },
    {
        "name": "John",
        "industry": "Networking"
    },
    {
        "name": "Marko",
        "industry": "Sports"
    }
];

const customer = new Customer({
    name:'John',
    industry:'Marketing'
});


app.get('/', (req,res) =>{
    res.send("Welcome");
})

app.get('/api/customers',async (req,res)=>{
    // console.log(await mongoose.connection.db.listCollections().toArray()); // Meta data about DB 
    try{
        const result = await Customer.find();
        res.json({"customers": result});
    }catch(e){
        res.status(500).json({error: e.message})
    }
})

app.get('/api/customers/:id/', async(req,res)=>{
    console.log({
        requestParams: req.params,
        requestQuery: req.query
    });
    try{
        const {id} = req.params;
        console.log(id);
        const customer = await Customer.findById(id);
        console.log(customer);
        if(!customer){
            res.status(404).json({error:"User not found"});
        }else{
            res.json({customer});
        }
    }catch(e){
        res.status(500).json({error:'Something went wrong'});
    }

});

app.post('/',(req,res)=>{
    res.send('This is a post request!');
})

app.post('/api/customers', async (req,res) => {
    console.log(req.body);
    const customer = new Customer({
        name: req.body.name,
        industry: req.body.industry
    });
    try{
        await customer.save();
        res.status(201).json({customer});
    }catch(e){
        res.status(400).json({error:e.message});
    }

} );



const start = async() => {
    try{
        await mongoose.connect(CONNECTION);

        app.listen(PORT,() => {
            console.log('App listening on port' + " " + PORT);
        });
    }catch(err){
        console.log(err.message);
    }

};

start();
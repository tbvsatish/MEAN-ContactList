var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

//add route file
//This statement creates the route file object.
const route = require('./routes/route');


//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

mongoose.connection.on('connected',()=>{
    console.log('connected to database mongodb @27017');
});

mongoose.connection.on('error', (err)=>{
    if(err)
    {
        console.log('Error in database connection:' + err);
    }
});
//port number
const port = 3000;


//adding middle-ware cors
app.use(cors());

//body-parser
app.use(bodyParser.json());

//static files.

app.use(express.static(path.join(__dirname,'public')));

//Register the route file with a particular route.
//This is important to bind the request to an appropritate processor.
app.use('/api',route);

//testing server
app.get('/',(req,res)=>{
    res.send("Hello World from Contact List app.")
});

app.listen(port,()=>{
    console.log("Server started at port : " + port);
});
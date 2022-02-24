const {Client} = require('pg');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const client= new Client({
  host:"localhost",
  user:"postgres",
  password:"Sanu@123",
  database:"calculator",
  port:5432
})

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");
app.get("/", (req, res)=>{
  res.render("index");
});

client.connect(function(err){
  if(!err)
    console.log('DB Connected')
})

app.get("/user/history1",(req, res)=>{
  client.query('select * from cal', (err, result)=>{
    if(!err){
      res.render("history",{'item':result.rows});
    }else{
      console.log(err.message);
      console.log('Server Stopped for HIstory');
    }
  })
})

app.post("/",(req, res) =>{

  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var operator =req.body.submit;

  function calculate(num1, num2) {
    var result = 0;
    const no1 = Number(req.body.num1);
    const no2 = Number(req.body.num2);
    if (req.body.submit == '+') {
        const result = no1 + no2;
        res.send(' ' + result);
        client.connect(function (err) {
            var pg = "insert into cal(first_no, second_no ,operator, sum, doe) values('" + req.body.num1 + "', '" + req.body.num2 + "','" + req.body.submit + "','" + result + "',current_timestamp)";
            client.query(pg, function (err) {
                console.log("Inserted!");
        })
          })
    }
    else if (req.body.submit == '-') {
        const result = no1 - no2;
        res.send(' ' + result);
        client.connect( (err) => {
            var pg = "insert into cal(first_no, second_no ,operator, sum, doe) values('" + req.body.num1 + "', '" + req.body.num2 + "','" + req.body.submit + "','" + result + "',current_timestamp)";
            client.query(pg, function (err) {
                console.log("Inserted!");
        })
          })
    }
    else if (req.body.submit == '*') {
        const result = no1 * no2;
        res.send(' ' + result);
        client.connect( (err) => {
            var pg = "insert into cal(first_no, second_no ,operator, sum, doe) values('" + req.body.num1 + "', '" + req.body.num2 + "','" + req.body.submit + "','" + result + "',current_timestamp)";
            client.query(pg, function (err) {
                console.log("Inserted!");
        })
          })
    }
    else if (req.body.submit == '/') {
        const result = no1 / no2;
        res.send(' ' + result);
        client.connect( (err) => {
            var pg = "insert into cal(first_no, second_no ,operator, sum, doe) values('" + req.body.num1 + "', '" + req.body.num2 + "','" + req.body.submit + "','" + result + "',current_timestamp)";
            client.query(pg, function (err) {
                console.log("Inserted!");
        })
          })
    }
    else if (req.body.submit == '%') {
        const result = no1 % no2;
        res.send(' ' + result);
        client.connect( (err) => {
            var pg = "insert into cal(first_no, second_no ,operator, sum, doe) values('" + req.body.num1 + "', '" + req.body.num2 + "','" + req.body.submit + "','" + result + "',current_timestamp)";
            client.query(pg, function (err) {
                console.log("Inserted!")
        })
          })
    }
    else {
        res.send('SomeThing Went Wrong!');
    }
  }

    calculate(num1, num2, operator);
})



app.listen(5000, (res) =>{
    console.log('> Server is up and running on port :' + 5000) 
})
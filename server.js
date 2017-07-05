"use strict";
const express = require('express');
const mongojs = require('mongojs');
const db = mongojs('mydb',['accounts']);
const ObjectId = mongojs.ObjectId;
const bodyParser = require('body-parser');
const multer = require('multer');

//multer .............
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/images")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })


const app = express();




app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended : false }))

app.use(bodyParser.json())

//get all data
app.get('/api',function (req,res) {
	db.accounts.find(function (err,docs) {
		res.send(docs)
	})
})

// form collection
app.post('/insertAccount',upload.single('image'),function (req,res) {
	
	db.accounts.insert({ name : req.body.name , deposit : req.body.deposit , cCard : req.body.cCard , image : req.file.originalname},function (err,docs) {
		res.redirect('/');
		
	})
})

app.listen(3000,function () {
	console.log("listenin to PORT 3000");
})
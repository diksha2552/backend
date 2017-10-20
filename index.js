var express = require('express');
var connect = require('connect');
var mongoose = require('mongoose');
var crypto = require('crypto')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/login');

var app = express();

var schema = new mongoose.Schema({
	username : String,
	password : String
});

var user = mongoose.model('user', schema);



app.get('/register', function(req,res){
var user1 = new user({username : req.query.login , password : req.query.pass})

user.findOne({
    username: req.query.login
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
		user1.save(function(err){
		  if(err) throw err
		  else
		    console.log(user1);
		});
		res.send({success: true, msg: 'Authentication successfully'});    
}
else{
    	
		res.send({success: false, msg: 'User Already registered. Please log in'});
    }
	
})


	
});


app.get('/login', function(req,res){
var id = req.query.login
var pass = req.query.pass

user.findOne({
    username: req.query.login
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      res.send({success: false, msg: 'Login failed, User not found. Please try again.'});
    }else{
    	var password = user.password
    	if(req.query.pass == password){
    		var token = crypto.randomBytes(10).toString('hex');
    	    res.send({success: true,
    	    	token: token, 
    	    	msg: 'Authentication successfully. User found.'});
    	  }
    	  else
    	  	      res.send({success: false, msg: 'Wrong password , Please try again later'});

    }
	
})
})

app.listen(3000, function(){
	console.log("server is running")
})
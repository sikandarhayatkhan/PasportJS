var express = require('express');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
const passport = require('passport');
var user_instance = require('../models/users');


// db connection
mongoose.connect('mongodb://localhost:27017/userlogin');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error',console.error.bind(console,'Mongoose Connection Error'));

//app.use(passport.initialize());
//app.use(passport.serializeUser());


var token;

exports.login = function(req, res)
 {

    var nam = req.body.name;
    var pass = req.body.password;
    if(nam != 'sikandar')
    {
        console.log(req.json);
        return res.send({msg:'invalid Username'});
    
    }
    else if(pass != "1234")
    {
        console.log(req.json);
        return res.send({msg:'password Invalid'});
   
    }
    else
    {
        const payload = {
        name: nam
    };
      token = jwt.sign(payload, "sikandar", {expiresIn: 86400 // expires in 24 hours
    });
        return res.json({
            success: true,
            message: 'Enjoy your token!',
            type: 'head',
            form: req.body
          });
    }
        };

        exports.tokenverification = (req, res, next) => {
            // decode token
            if (token) {
          
              // verifies secret and checks exp
              jwt.verify(token, "sikandar", function(err, decoded) {       if (err) {
                  return res.json({ success: false, message: 'Failed to authenticate token. This security violation will be reported to admin.' });
                }
                else
                {
                  console.log('pass');
                  next();
                  req.decoded = decoded;
                }
              });
          
            } else {
              // if there is no token
              // return an error
              return res.status(403).send({
                  success: false,
                  message: 'No token provided.'
              });
          
            }
          };

 
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: 'root',
  database: 'microme'
}); 


function genHash(password){
  return bcrypt.hashSync(password,bcrypt.genSalt(9));
}

function validatePassword(password, dbPass){
  return bcrypt.compareSync(password,dbPass);
}

router.post('/', function(req, res, next) {
  
  const username = req.body.username;
  const password = req.body.password;




  connection.query(
    "SELECT * FROM microme.user WHERE username = ? AND password = ?",
    [username,password], function(err, row, field){
      
      if(err){
        console.log(err);
        res.send({'success': false, message: 'could not connect to database'})
      }

      if(row.length > 0){
        res.send({'success': true, 'user': row[0].username})
      }
      
      else{
        res.send({'success': false, message: 'user not found'});
      }

    });

});

module.exports = router;

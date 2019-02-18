const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'microme'
});


function genHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSalt(9));
}

function validatePassword(password, dbPass) {
  return bcrypt.compareSync(password, dbPass);
}

router.post('/', function (req, res, next) {

  const username = req.body.username;
  const password = req.body.password;


  connection.query(
    "SELECT * FROM microme.user WHERE username = ?",
    [username], function (err, row, field) {

      if (err) {
        console.log(err);
        res.send({ 'success': false, message: 'could not connect to database' })
      }

      if (row.length > 0) {
        bcrypt.compare(password, row[0].password, function (err, resB) {
          if (resB) {
            res.send({ 'success': true, 'user': row[0].username })
          }
          else {
            res.send({ 'success': false, message: 'Incorrect Username or Password' });
          }
        });
      }

      else {
        res.send({ 'success': false, message: 'Incorrect Username or Password' });
      }

    });

});


router.post('/signup', function (req, res, next) {

  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM microme.user WHERE username = ?",
    [username], function (err, row, field) {
      if (err) {
        console.log(err);
        res.send({ 'success': false, 'message': 'could not connect to database' })
      }
      if (row.length > 0) {
        res.send({ 'success': false, 'message': 'Username taken!' })

      }
      else {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          connection.query(
            "INSERT into microme.user (username, password) VALUES (?, ?)",
            [username, hash], function (err, row, field) {

              if (err) {
                console.log(err);
                res.send({ 'success': false, 'message': 'could not connect to database' })
              }
              else {
                res.send({ 'success': true, 'message': 'Signup Successful!' })
              }

            });
        });
      }
    })
});

router.post('/PostRoute', function (req, res, next) {
  const RouteName = req.body.RouteName;
  const coords = req.body.coords;
  const creator = req.body.creator

  connection.query(
    "SELECT * FROM microme.routes WHERE Name = ?",
    [RouteName], function (err, row, field) {
      if (err) {
        console.log(err);
        res.send({ 'success': false, 'message': 'could not connect to database' })
      }
      if (row.length > 0) {
        res.send({ 'success': false, 'message': 'A Route with that name already exists!' })

      }
      else {
        connection.query(
          "INSERT into microme.routes (name, RouteJSON, routeCreator) VALUES (?, ?, ?)",
          [RouteName, coords, creator], function (err, row, field) {

            if (err) {
              console.log(err);
              res.send({ 'success': false, 'message': 'could not connect to database' })
            }
            else {
              res.send({ 'success': true, 'message': 'succesfully added route!'})
            }

          });
      }
    })
})

router.post('/getRoutes', function (req, res, next) {

  connection.query(
    "SELECT * FROM Microme.routes", function(err, row, field){
      if(err){
        console.log(err);
        res.send({'success': false, 'message': 'could not connect to database'})
      }
      else{
        res.send({'success': true, data: row })
      }
    }
  )
})

module.exports = router;

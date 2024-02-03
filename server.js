const session = require('express-session');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // Fix typo here

var mysql = require('mysql');

var server = app.listen(3000, function () {
    console.log('Server is listening on port 3000');
});


const db = require('./db'); // Adjust the path based on your project structure

app.use(bodyParser.json());
app.use(express.static('public'));
app.set("view engine", "pug");

app.use(session({
  secret: '',
  resave: false,
  saveUninitialized: true,
}));

// Run your SQL queries
db.query(`
  -- Your SQL script here
`, (error, results, fields) => {
  if (error) {
    console.error('Error executing SQL script: ' + error.stack);
    return;
  }
  console.log('SQL script executed successfully.');
});

// Close the database connection when done
db.end();

// server.js
app.get('/charities', (req, res) => {
  // Fetch charities from the database
  db.query('SELECT * FROM user_table', (error, results) => {
    if (error) {
      console.error('Error fetching login:', error);
      return res.status(500).send('Internal Server Error');
    }
    res.render('login', { login: results });
  });
});




app.post('/login', urlencodedParser, (req, res) => {
  // After successful authentication, store user information in the session
  req.session.user = { /* user data from the database */ };
  // Redirect to the user's dashboard or home page
});


app.get('home', (req, res) => {
    res.render('home');
});

app.get('/charities', (req, res) => {
    res.render('charities');
});

app.get('/areas', (req, res) => {
    res.render('areas');
});

app.get('/feedback', (req, res) => {
    res.render('feedback');
});

app.get('/visits', (req, res) => {
    res.render('visits');
});

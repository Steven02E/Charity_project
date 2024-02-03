const express = require('express');
const session = require('express-session');
const sessionSecret = '20steveE02';
const app = express();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const mysql = require('mysql');

const db = require('./db'); // Adjust the path based on your project structure

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'pug');

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);



// Insert data
const insertDataQueries = [
  `INSERT INTO user_table (user_name, phone_number, email, password, user_type)
   VALUES ('Simon', '0674955388', 'simon@gmail.com', 'steve12345', 'ADMIN')`,
  // ... (add other data insertion queries)
];



// Run insert data queries
insertDataQueries.forEach((query) => {
  db.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error inserting data: ' + error.stack);
    } else {
      console.log('Data inserted successfully.');
    }
  });
});

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

app.get('/', function (req, res) { // Fix parentheses to curly braces
    res.render('index');
});

app.get('/home', (req, res) => {
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


const server = app.listen(3000, function () {
  console.log('Server is listening on port 3000');
});

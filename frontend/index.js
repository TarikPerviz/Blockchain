// Used to get the server up and running:
const express = require('express');
const app = express();
const path = require('path');   
const morgan = require('morgan');
const cors = require("cors");
const ejs = require('ejs');

// Serve the page in the views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');  
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('dev'));
app.use(cors());

// Load the actual page
app.get('/', (req, res) => {
    res.render('home.ejs')
});

app.get('/register', (req, res) => {
    res.render('register.ejs')
});

app.get('/pending', (req, res) => {
    res.render('pending.ejs')
})

app.get('/cars', (req, res) => {
    res.render('allcars.ejs')
})

app.get('/sell', (req, res) => {
    res.render('sellcar.ejs')
})

app.get('/profile', (req, res) => {
    res.render('profile.ejs')
})



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen('8080', () => {
    console.log("Listening on port 8080: Directory: blockchain")
})
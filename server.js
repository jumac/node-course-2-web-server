const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//register middleware
app.use((req, res, next) => {
    //this is like an interceptor
    //request can not continue if next() is not invoke
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }        
    });
    console.log(`${now}: ${req.method} ${req.url}`);
    next();
});

//app.use((req, res, next) => {
//    res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    //res.send({
    //    name: 'Jumac', 
    //    likes: [
    //        'Walking', 
    //        'Cities'
    //    ]
    //});
    res.render('home.hbs', {
        pageTitle: 'Home Page', 
        welcomeMessage: 'Welcome to the Jungle'
    });
});

app.get('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to process request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
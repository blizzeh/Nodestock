// Stock market portfolio app

const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser'); //Post functie zoekbalk
const PORT = process.env.PORT || 5000;

// Use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

//API Key pk_886fe442ef8b45c8bc762c0811810c77
//Create call API
function call_api(finishedAPI, ticker){
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_886fe442ef8b45c8bc762c0811810c77', {json: true}, (err, res, body) => {
        if(err) {return console.log(err);}
        if(res.statusCode === 200) {
            //console.log(body);
            finishedAPI(body);
        };
    });
};

// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "Hallo! Dit is onzin :)....";

// Set Handlebar getroutes
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
        res.render('home', {
        stock: doneAPI
        });
    }, "fb");
});

// Set Handlebar Index postoutes -> Post-request zoekbar
app.post('/', function (req, res) {
    call_api(function(doneAPI) {
        //posted_stuff = req.body.stock_ticker; //Als je spul nodig hebt uit de zoekfunctie: req.body...
        res.render('home', {
        stock: doneAPI,
        });
    }, req.body.stock_ticker);
});

// About  page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));
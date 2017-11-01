var express = require('express');
var app = express();
var mongoose   = require('mongoose');
var Message = require('./app/models/messageModel');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOURL || 'mongodb://localhost:27017/js2017');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/chat');
});

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();

}
  
app.use(allowCrossDomain);

var routes = require('./app/routes/messageRoutes');
routes(app);
  
app.listen(app.get('port'), function() {
  console.log('Node app is running on http://localhost:' + app.get('port'));
});
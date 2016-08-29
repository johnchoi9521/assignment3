// server.js
    // To setup ========================
    var bodyParser = require('body-parser');    // Push the information from HTML POST (express4)
    var express  = require('express');          // express
    var app = express();                        // Establish the app
    var morgan = require('morgan');             // Request log to the console (express4)
    var mongoose = require('mongoose');         // mongoose for mongodb
    var methodOverride = require('method-override'); // Simulate PUT and DELETE (express4)
    var addresses = ["Tokyo"]; //weather location
    var http = require( 'http' );
    //app.set( 'port', process.env.PORT || 3001 );
    
    //http.createServer( app ).listen( app.get( 'port' ), function (){
    //    console.log( 'Express server listening on port ' + app.get( 'port' ));
    //});
    
    // To config =================
    mongoose.connect('mongodb://admin:admin@ds017886.mlab.com:17886/johnchoi9521');  // To connect mongodb database on modulus.io

    app.use(morgan('dev'));                                         // To log all of the request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // To analyze application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // To analyze application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // To analyze application/vnd.api+json as json
    app.use(methodOverride());





    
// To define the model =================
    var Todo = mongoose.model('Todo', {
        city: String,
        cloudiness: String,
        temperature: Number
    });







// To route ======================================================================
    // API ---------------------------------------------------------------------
    // To get all of the todos
    app.get('/api/todos', function(req, res) {

        // To use mongoose getting all of the todos from the database
        Todo.find(function(err, todos) {

            // If there has an error retrieving, after res.send(err) execute, send the error.
            if (err)
                res.send(err)

            res.json(todos); // Return all of the todos in JSON format
        });
    });



    // Create todo and send back all of the todos after the todo has been created
    app.post('/api/todos', function(req, res) {

        // Create a todo, and the information came from AJAX and requested from Angular
        Todo.create({
            city : req.body.city,
            cloudiness : req.body.cloudiness,
            temperature : req.body.temperature,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);
            // Get and return all of the todos after the another has been created 
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });




    // Delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // Get and return all of the todos after the another has been created 
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });




// Get weather using the openweather API
    var request = require('request');
    var async = require('async');

    app.get('/api/getweather', function(req, res){
        async.concat (addresses, handleGetWeatherRequest, function(err, result) {
            if (err) {
                console.error(err);
            } else {
                res.send(result);
                console.log(result);
            }
        });
    });
    
    function handleGetWeatherRequest( address, callback ) {  
        options ={
            headers: {'user-agent': 'Mozilla/5.0'},
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + address + '&APPID=31538fe27dd36887159b09eb67838b37',
            json: true
        };
        request.get(options, function(err, response, body_json) {
            if( !err && response.statusCode === 200 ){
                return callback(null, body_json);
            }
            else{
                return callback(err);
            }
        });
    }
    
app.listen(process.env.PORT);
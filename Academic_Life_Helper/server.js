// server.js

    // set up ========================
    var express        = require('express');
    var app            = express();                  // create our app w/ express
    var mongoose       = require('mongoose');        // mongoose for mongodb
    var morgan         = require('morgan');          // log requests to the console (express4)
    var bodyParser     = require('body-parser');     // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    // configuration =================
    var MongoDB = 'mongodb://magistrall:avasconcelos114@127.0.0.1:27017/admin';
    mongoose.Promise = global.Promise;
    mongoose.connect(MongoDB);     // connect to mongoDB database on modulus.io

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection failed.'));


    app.use(express.static(__dirname + '/'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // define schema & Models =================
    var Schema = mongoose.Schema;

    var activitySchema = new Schema({
      title: String,
      tags: { type: [Number], index: true } // field level
    }, { collection : 'activities'});

    var Activity = mongoose.model('Activity', activitySchema);

    var assignmentSchema = new Schema({
      activityId  : {type: Schema.Types.ObjectId, ref: 'Activity'},
      title       : String,
      dueDate     : Date,
      completedYn : String
    });

    var Assignment = mongoose.model('Assignment', assignmentSchema);


    // listen (start app with node server.js) ======================================
    app.listen(1337);

    console.log("App listening on port 1337");

    // routes ======================================================================

    // Activity api ---------------------------------------------------------------------

    app.get('/api/activities', function(req, res) {
        Activity.find(function(err, activities) {
            if (err)
                res.send(err)
            res.json(activities);
        });
    });

    app.post('/api/activity', function(req, res) {
      console.log('Adding activity: ' + JSON.stringify(req.body.title));
        var activity = new Activity(req.body);
        activity.save(function (err) {
          if (err) {
              console.log(err)
              res.send(err);
          } else {
              Activity.find(function(err, activities) {
                if (err) { res.send(err) }
                res.json(activities);
            });
          }
        });
    });

    app.delete('/api/activities/:activity_id', function(req, res) {
        Activity.remove({
            _id : req.params.activity_id
        }, function(err, activity) {
            if (err)
                res.send(err);

            Activity.find(function(err, activities) {
                if (err)
                    res.send(err)
                res.json(activities);
            });
        });
    });

    // Activity api ---------------------------------------------------------------------

    app.get('/api/:activity_id/assignments', function(req, res) {
        Assignment.find(function(err, assignments) {
            if (err)
                res.send(err)
            res.json(assignments);
        });
    });

    app.post('/api/:activity_id/assignment', function(req, res) {
        Assignment.create({
          activityId  : Number,
          title       : String,
          dueDate     : Date,
          completedYn : String,
          done : false
        }, function(err, assignment) {
            if (err)
                res.send(err);

            Activity.find(function(err, assignments) {
                if (err)
                    res.send(err)
                res.json(assignments);
            });
        });
    });

    app.delete('/api/:activity_id/assignments/:assignment_id', function(req, res) {
        Assignment.remove({
            _id : req.params.assignment_id
        }, function(err, assignment) {
            if (err)
                res.send(err);

            Assignment.find(function(err, assignments) {
                if (err)
                    res.send(err)
                res.json(assignments);
            });
        });
    });


    // // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./src/index.html');
    });

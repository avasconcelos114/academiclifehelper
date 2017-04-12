// server.js

    // set up ========================
    var express        = require('express');
    var app            = express();
    var mongoose       = require('mongoose');
    var morgan         = require('morgan');
    var bodyParser     = require('body-parser');
    var methodOverride = require('method-override');
    var autoIncrement  = require('mongoose-auto-increment');
    // configuration =================
    var MongoDB = 'mongodb://magistrall:avasconcelos114@127.0.0.1:27017/admin';
    mongoose.Promise = global.Promise;
    mongoose.connect(MongoDB);     // connect to mongoDB database on modulus.io

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection failed.'));
    autoIncrement.initialize(mongoose);

    app.use(express.static(__dirname + '/'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // define schema & Models =================
    var Schema = mongoose.Schema;

    var activitySchema = new Schema({
      title : String,
      index : Number
    }, { collection : 'activities'});

    activitySchema.plugin(autoIncrement.plugin, 'Activity');
    var Activity = mongoose.model('Activity', activitySchema);

    var assignmentSchema = new Schema({
      activityId  : Number,
      index       : Number,
      title       : String,
      type        : String,
      dueDate     : Date,
      completedYn : String
    }, { collection : 'assignments'});

    assignmentSchema.plugin(autoIncrement.plugin, 'Assignment');
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

    app.delete('/api/activity/:activity_id', function(req, res) {
        Activity.remove({
            _id : req.params.activity_id
        }, function(err, activity) {
            if (err) { res.send(err); }

            Activity.find(function(err, activities) {
                if (err) { res.send(err); }
                res.json(activities);
            });
        });

    });

    app.delete('/api/assignmentFromActivity/:activity_id', function(req, res){
      Assignment.remove({
        activityId : { $eq : req.params.activity_id},
      }, function(err){
        if(err) { res.send(err); }
      })
    });

    // Assignments api ---------------------------------------------------------------------

    app.get('/api/:activity_id/assignments', function(req, res) {
      Assignment.find({
        activityId : { $eq : req.params.activity_id},
      }).exec(function (err, assignments) {
        res.json(assignments)
      });
    });

    app.get('/api/assignments/search/:title', function(req, res) {
      console.log(req.params.title)
      var value = new RegExp(req.params.title,'i');
      Assignment.find({
        title :  { $regex: value }
      }).exec(function(err, assignments) {
        if(err) { res.send(err); }
        console.log(assignments)
        res.json(assignments)
      });
    });

    app.put('/api/assignment/date/:assignment_id', function(req, res){
        var query = { _id  : req.params.assignment_id };

        Assignment.findOneAndUpdate(query, { dueDate : req.body.dueDate }, {upsert : true}, function(err){
          if(err) { return res.send(err) }
          return res.send("SUCCESS")
        });
    });

    app.put('/api/assignment/status/:assignment_id', function(req, res){
      var query = { _id  : req.params.assignment_id };

      Assignment.findOneAndUpdate(query, { completedYn :  req.body.completedYn }, {upsert : true}, function(err){
        if(err) { return res.send(err) }
        return res.send("SUCCESS")
      });
    });

    app.put('/api/assignment/type/:assignment_id', function(req, res){
      var query = { _id  : req.params.assignment_id };

      Assignment.findOneAndUpdate(query, { type :  req.body.type }, {upsert : true}, function(err){
        if(err) { return res.send(err) }
        return res.send("SUCCESS")
      });
    });

    app.post('/api/:activity_id/assignment', function(req, res) {
      console.log('Adding Assignment: ' + JSON.stringify(req.body.title));
        var requestBody = {
          activityId  : req.params.activity_id,
          title       : req.body.title,
          type        : req.body.type ? req.body.type : 'assignment',
          dueDate     : req.body.dueDate ? req.body.dueDate : new Date(),
          completedYn : req.body.completedYn ? req.body.completedYn : 'N'
        }
        var assignment = new Assignment(requestBody);
        assignment.save(function (err) {
          if (err) {
              console.log(err)
              res.send(err);
          } else {
              Activity.find(function(err, assignments) {
                if (err) { res.send(err) }
                res.json(assignments);
            });
          }
        });
    });

    app.delete('/api/assignment/:assignment_id', function(req, res) {
      Assignment.remove({
          _id : req.params.assignment_id
      }, function(err, assignments) {
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
    app.get('/', function(req, res) {
        res.sendfile('./src/index.html');
    });

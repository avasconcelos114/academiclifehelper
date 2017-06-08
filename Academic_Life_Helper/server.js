// server.js

    // set up ========================
    var express          = require('express');
    var app              = express();
    var mongoose         = require('mongoose');
    var morgan           = require('morgan');
    var bodyParser       = require('body-parser');
    var methodOverride   = require('method-override');
    var autoIncrement    = require('mongoose-auto-increment');
    var bcrypt           = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
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
      userId: Number,
    }, { collection : 'activities'});

    activitySchema.plugin(autoIncrement.plugin, 'Activity');
    var Activity = mongoose.model('Activity', activitySchema);

    var assignmentSchema = new Schema({
      activityId  : Number,
      title       : String,
      type        : String,
      startDate   : Date,
      dueDate     : Date,
      description : String,
      completedYn : String
    }, { collection : 'assignments'});

    assignmentSchema.plugin(autoIncrement.plugin, 'Assignment');
    var Assignment = mongoose.model('Assignment', assignmentSchema);


    var UserSchema = new Schema({
      username     : { type: String, required: true, index: { unique: true } },
      creationDate : Date,
      password     : String,
    }, { collection : 'users'});

    UserSchema.pre('validate', function(next){
      var user = this;

      if (!user.isModified('password')) return next();

      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next();
          });
        });
    });

    UserSchema.methods.comparePassword = function(candidatePassword, cb) {
      bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
      });
    };

    UserSchema.plugin(autoIncrement.plugin, 'User');
    var User = mongoose.model('User', UserSchema);

    var typeSchema = new Schema({
      typeName : String,
    }, { collection : 'types'});

    typeSchema.plugin(autoIncrement.plugin, 'Type');
    var Type = mongoose.model('Type', typeSchema);

    // listen (start app with node server.js) ======================================
    app.listen(1337);

    console.log("App listening on port 1337");

    // routes ======================================================================

    // Activity api ---------------------------------------------------------------------

    app.get('/api/:logged_user_id/activities', function(req, res) {
        Activity.find({
          userId : { $eq : req.params.logged_user_id},
        }).exec(function (err, activities) {
          res.json(activities)
        });
    });

    app.post('/api/:logged_user_id/activity', function(req, res) {
        var requestBody = {
          userId : req.params.logged_user_id,
          title  : req.body.title
        }
        var activity = new Activity(requestBody);
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

    app.get('/api/:activity_id/assignments/search/:title', function(req, res) {
      var title = new RegExp(req.params.title,'i');
      Assignment.find({
        title      :  { $regex: title },
        activityId : { $eq : req.params.activity_id }
      }).exec(function(err, assignments) {
        if(err) { res.send(err); }
        console.log(assignments)
        res.json(assignments)
      });
    });

    // Edit any details on right sidebar
    app.put('/api/assignment/details/:assignment_id', function(req, res){
        var query = { _id  : req.params.assignment_id };

        Assignment.findOneAndUpdate(query,
          {
            title       : req.body.title,
            startDate   : req.body.startDate,
            dueDate     : req.body.dueDate ,
            description : req.body.description,
            completedYn : req.body.completedYn
          }, {upsert : true}, function(err){
          if(err) { return res.send(err) }
          return res.send("SUCCESS")
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
        var requestBody = {
          activityId  : req.params.activity_id,
          title       : req.body.title,
          type        : req.body.type ? req.body.type : 'assignment',
          startDate   : req.body.startDate ? req.body.startDate : new Date(),
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

    // Users api ---------------------------------------------------------------------

    app.post('/api/userVerify', function(req, res) {
      // check if username exists
      User.findOne({
        username : { $eq : req.body.username }
      }, function(err, user_info){
        if(err) res.send(err);

        if(user_info !== null) res.json({ status : 'EXISTING_USERNAME' })
        else res.json({ status : 'SUCCESS' })
      })
    });

    app.post('/api/user', function(req, res) {
      var user = new User({
        username: req.body.username,
        password: req.body.password,
        creationDate: new Date()
      })

      user.save(function(err, user){
        if(err) res.send(err);

        res.json(user)
      });
    });

    app.post('/api/login', function(req, res){
      User.findOne({
        username : { $eq : req.body.username }
      }, function(err, user_info){
        if(err) res.send(err);

        if(user_info === null) {
          res.json({ status : 'USERNAME_NOT_FOUND' })
          return;
        }
        var password_input = req.body.password;
        console.log(user_info)
        bcrypt.hash(password_input, function(err, hash){
          password_input = hash;
        });

        bcrypt.compare(password_input, user_info.password, function(err, resp) {
          if(resp) res.json({ redirect : '/classes', status: 'SUCCESS', user_info })
          else res.json({ status: 'INCORRECT_PASSWORD' })
        });


        // res.send({ redirect : '/classes', status: 'SUCCESS' })
      })
    });

    // // route to handle all angular requests
    app.get('/', function(req, res) {
        res.sendFile('./src/register.html', {root: __dirname});
    });
    app.get('/classes', function(req, res) {
        res.sendFile('./src/index.html', {root: __dirname});
    });
    app.get('/calendar', function(req, res) {
        res.sendFile('./src/index.html', {root: __dirname});
    });
    app.get('/dashboard', function(req, res) {
        res.sendFile('./src/index.html', {root: __dirname});
    });
    app.get('/classesMobile', function(req, res) {
        res.sendFile('./src/mobile.html', {root: __dirname});
    });

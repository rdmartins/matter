var assert = require('assert'),
  bodyParser = require('body-parser'),
  consolidate = require('consolidate'),
  express = require('express'),
  mongo = require('mongodb').MongoClient,
  ObjectID = require('mongodb').ObjectID,
  app = express();

app.engine('html', consolidate.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));

mongo.connect('mongodb://localhost:27017/matter', function(err, db) {
  assert.equal(null, err);

  app.get('/', function(req, res) {
    res.render('index');
  });
  app.get('/login', function(req, res) {
    res.render('login');
  });
  app.post('/login', function(req, res) {
    res.render('login');
  });

  app.post('/payment', function(req, res) {
    db.collection('users', function(err, collection) {
      assert.equal(null, err);
      collection.find({ email: req.body.email }).limit(1).next(function(err, user) {
        var renderNext = function(u) {
          res.render('payment', {
            userId: u._id,
            quantity: req.body.quantity,
            name: u.name,
            email: u.email
          });
        }
        if ( ! user)
          collection.insertOne({
            name: req.body.name,
            email: req.body.email
          }, function(err, r) {
            var newUser = r.ops[0];
            renderNext(newUser);
          });
        else
          renderNext(user);
      });
    });
  });
  app.post('/thank-you', function(req, res) {
    var data = {
      userId: new ObjectID(req.body['user-id']),
      donation: req.body.quantity,
      cpf: req.body.cpf,
      birthdate: req.body.birthdate,
      phone: req.body.phone,
      address: {
        cep: req.body.cep,
        description: req.body.address,
        number: req.body.number,
        complement: req.body.complement,
        district: req.body.district,
        city: req.body.city,
        state: req.body.state
      }
    }

    db.collection('users', function(err, collection) {
      collection.updateOne({ _id: data.userId }, {
        $set: {
          cpf: data.cpf,
          birthdate: data.birthdate,
          phone: data.phone,
          address: data.address
        },
        $push: {
          donations: {
            date: Date.now(),
            amount: data.donation
          }
        }
      }, function(err, r) {
        assert.equal(1, r.result.ok);
        res.render('thanks');
      });
    });
  });

  app.use(function(req, res) { res.sendStatus(404) });
  app.listen(3000, function() {
    console.log('Server iniciado: http://localhost:3000/');
  });
});

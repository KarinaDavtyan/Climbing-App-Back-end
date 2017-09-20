const mongoose = require('mongoose');

const db = mongoose.connection;

mongoose.connect('mongodb://localhost/climbingRoutes-db', {
  useMongoClient: true
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to climbingRoutes-db');
});

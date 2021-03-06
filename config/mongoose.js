const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/srconstruction');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in creating database'));

db.once('open', function() {
    console.log('Database succesfully created');
});

module.exports = db;
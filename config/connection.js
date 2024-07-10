const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/SMNetwork');
module.exports = mongoose.connection;

// require mongoose package
// mongoose connect to mongodb database
// export connection
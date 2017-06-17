var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var date = new Date();
var AccountSchema   = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    occupation: String,
    education: String,
    hear: String,
    email: String,
    password: String,
    assessment: { type: Array, default: []},
    admin: { type: Boolean, default: false},
    survey: { type: Array, default: []},
    dimensions: { type: Array, default: []},
    otherElements: { type: Array, default: []},
    steps: { type: Array, default: new Array(7)}
},{
  timestamps: true
});

module.exports = mongoose.model('Account', AccountSchema);

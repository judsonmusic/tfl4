var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var date = new Date();
var AccountSchema   = new Schema({
    companyCode: {type: String, trim: true},
    firstName: String,
    lastName: String,
    phone: String,
    occupation: String,
    ethnicity: String,
    income: String,
    education: String,
    hear: String,
    email: String,
    password: String,
    assessment: { type: Array, default: []},
    admin: { type: Boolean, default: false},
    survey: { type: Array, default: []},
    dimensions: { type: Array, default: []},
    otherElements: { type: Array, default: []},
    steps: { type: Array, default: new Array(7)},
    deleted: { type: Boolean, default: false},
    birthDate: Date,
    gender: String
},{
  timestamps: true
});

module.exports = mongoose.model('Account', AccountSchema);

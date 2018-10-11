var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var date = new Date();
var AssessmentSchema   = new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId},
    companyCode: {type: String, trim: true},
    lastName: String,
    assessment: { type: Array, default: []},
    survey: { type: Array, default: []},
    dimensions: { type: Array, default: []},
    otherElements: { type: Array, default: []},
    steps: { type: Array, default: new Array(7)},
    deleted: { type: Boolean, default: false},
},{
  timestamps: true
});

module.exports = mongoose.model('Assessments', AssessmentSchema);
var ObjectId = require('mongoose-simpledb').Types.ObjectId;
var md5 = require('MD5');

exports.schema = {

    text: {
        type: String,
        required: true
    },

    creator: {
        type: String,
        required: true
    },

    whoDeleted: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    },

    question: {
        type: ObjectId,
        required: true,
        ref: 'Questions'
    },

    status: {
        type: String,
        default: 'created'
    },

    amountOfClicks: {
        type: Number,
        default: 0
    }

};

exports.methods = {
    setPassword: function() {
        this.password = md5(this.password);
        return this;
    }
};
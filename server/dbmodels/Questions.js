var ObjectId = require('mongoose-simpledb').Types.ObjectId;

exports.schema = {

    text: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    creator: {
        type: String,
        required: true
    },

    whoDeleted: {
        type: String
    },

    user: {
        type: ObjectId,
        required: true,
        ref: 'Users'
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

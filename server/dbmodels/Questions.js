var ObjectId = require('mongoose-simpledb').Types.ObjectId;

exports.schema = {
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    creator: { type: String, required: true },
    group: { type: ObjectId, required: true, ref: 'Groups' }
};

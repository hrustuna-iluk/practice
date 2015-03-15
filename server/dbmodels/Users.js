var md5 = require('MD5');

exports.schema = {

    email: {
        type: String,
        required: true,
        unique: true
    },

    firstName: {
        type: String,
        required: true,
        unique: true
    },

    lastName: {
        type: String,
        required: true,
        unique: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    password: {
        type: String,
        required: true
    }

};

exports.methods = {
  setPassword: function() {
      this.password = md5(this.password);
      return this;
  }
};
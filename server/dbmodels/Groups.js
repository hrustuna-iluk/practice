var md5 = require('MD5');

exports.schema = {
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    password: { type: String, required: true }
};

exports.methods = {
  setPassword: function() {
      this.password = md5(this.password);
      return this;
  }
};
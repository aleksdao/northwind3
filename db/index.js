var Promise = require('bluebird');
var mongoose = require('mongoose');
var employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  regions: {
    type: [String]
  }
})

var Employee = mongoose.model('employee', employeeSchema);
var _conn;
function connect(){
  if(_conn)
    return _conn;
  _conn = new Promise(function(resolve, reject){
    mongoose.connect(process.env.CONN || "mongodb://localhost/northwind3", function(err){
      if(err)
        return reject('make sure mongo is running and connection string is set');
      resolve(mongoose.connection);
    });
  });
  return _conn;
}

module.exports = {
  Employee: Employee,
  connect: connect
}

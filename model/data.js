const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: true
    }
  }
);

var Data = mongoose.model("Data", DataSchema);

// DataSchema.pre('save', function (next) {
//   var self = this;
//   Data.find({login : self.login}, function (err, docs) {
//       if (!docs.length){
//           next();
//       }else{                
//           console.log('user exists: ',self.login);
//           next(new Error("User exists!"));
//       }
//   });
// }) ;

module.exports = Data;
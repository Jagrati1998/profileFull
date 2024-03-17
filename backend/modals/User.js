const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
   
  profile_name: {
        type: String,
        required: true,
        
      },
   
}, {strict:false, minimize: false});

module.exports = mongoose.model(`${process.env.Mongo_Collection}`, userSchema);
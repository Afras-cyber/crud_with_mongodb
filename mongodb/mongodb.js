const mongoose = require("mongoose");
//mongodb+srv://dbuser:xog6e8CtM2MhRDmH@cluster0.1wrr2.mongodb.net/vehicle?retryWrites=true&w=majority
mongoose.connect(
  "mongodb+srv://dbuser:xog6e8CtM2MhRDmH@cluster0.1wrr2.mongodb.net/vehicle?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("mongodb connected");
    } else {
      console.log("mongodb connection failed");
    }
  }
);
module.exports.mongoose;
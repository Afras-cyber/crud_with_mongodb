const express = require("express");
const mongoose = require("mongoose");
require("./mongodb/mongodb");
const Car = require("./mongodb/mongoSchema");
const signUp = require("./mongodb/signup");
var jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { userInfo } = require("os");

const app = express();

app.use(express.json());

//post
try {
  app.post("/create", async (req, res) => {
    const carOne = await new Car({
      model: req.body.model,
      color: req.body.color,
      brand: req.body.brand,
      owner: req.body.owner,
    });
    const postData = await carOne.save();
    res.status(200).json(postData);
  });
} catch (e) {
  console.log(e);
}
//getAll
try {
  app.get("/", async (req, res) => {
    const getAll = await Car.find();
    res.status(200).json(getAll);
  });
} catch (e) {
  console.log(e);
}
//getByID
try {
  app.get("/by:id", async (req, res) => {
    const getBy = await Car.findById(req.params.id);
    res.status(200).json(getBy);
  });
} catch (e) {
  console.log(e);
}
//UpdateOne
try {
  app.put("/update:id", async (req, res) => {
    const upOne = await Car.updateOne(
      { _id: req.params.id },
      { $set: { model: req.body.model } }
    );
    res.status(200).json(upOne);
  });
} catch (e) {
  console.log(e);
}

//UpdateOne
try {
  app.delete("/delte:id", async (req, res) => {
    const del = await Car.remove({ _id: req.params.id });
    res.status(200).json(del);
  });
} catch (e) {
  console.log(e);
}

//Signup
try {
  app.post("/signup", async (req, res) => {
    const hmac = crypto
      .createHmac("sha256", "94dev")
      .update(req.body.password)
      .digest("hex");
    const mkToken = jwt.sign({ foo: req.body.email }, "94dev");
    const sign = await new signUp({
      email: req.body.email,
      name: req.body.name,
      password: hmac,
      token: mkToken,
    });
    const addUser = await sign.save();
    res.status(200).json(addUser);
  });
} catch (e) {
  console.log(e + "Signup Issue");
}

//Login
try {
  app.get("/login", async (req, res) => {
    var email = await req.body.email;
    var pass = await req.body.password;
    const lHmac = await crypto
      .createHmac("sha256", "94dev")
      .update(pass)
      .digest("hex");
   
    await signUp.findOne({ email: req.body.email },(err,result)=>{
      if(err)return handleError(err);
        const password = result.password;
        if(lHmac===password){
            console.log("matching password");
            if(result.token===null || result.token==="")
            {res.status(401).json("Your Token not found plz sign in");}
            else{
                try {
                    var decoded = jwt.verify(result.token, '94dev');
                  } catch(err) {
                    console.log("token Decorded Error");
                  }
                  
                if(decoded.foo===email){
                    console.log('Token matched');
                    res.status(200).json("Successfully login");
                }else{
                  console.log("Token not matched")
                  res.status(200).json("Failed to login, Token not matching");
                }
            }
    
        }else{
            res.status(401).json("password not match");
            console.log('password not match');
        }
    });

  
  });
} catch (e) {
  console.log(e + "login Issue");
}
//------------------------------------------------------------------------------------------------------//
const PORT = process.env.PORT || 2500;
app.listen(PORT, () => {
  console.log("port connected");
});

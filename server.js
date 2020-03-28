const express = require("express");
const mongoose = require("mongoose");
const users = require('./routes/api/users')
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyparser = require('body-parser');
const passport = require('passport');
const app = express();

//Body parser middleware
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Db Config
const db = require("./config/keys").mongoURI;
//Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDb connected!"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

//First route
app.get("/", (req, res) => res.send("Hello"));

//Use routes
app.use('/api/users', users)
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = 5557;
app.listen(port, () => console.log(`Server running on port ${port}`));

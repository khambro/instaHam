const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyparser = require('body-parser');
const passport = require('passport');
const app = express();

//Body parser middlewear
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//DB Config
const db = require('./config/keys').mongoURI;
//console.log(db);
//Connect to mongodb
mongoose
    .connect(db)
    .then(() => console.log('MongoDb connected!'))
    .catch(err => console.log(err));

//Passport middlewear
app.use(passport.initialize());

//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


//Routes
app.get('/', (req, res) => res.send('Hi Karen, have a great day!!!'));



const port = 5557;
app.listen(port, () => console.log(`Server running on port ${port}`));
const express = require("express");
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get("/test", (req, res) =>
  res.json({
    msg: "Users api works!"
  })
);

// Load input validation
const validateRegisterInput = require('../../validation/register');
// @route   POST api/users/register
// @desc    Register user
// @access  public
router.post('/register', (req, res) => {

  const {errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({email: req.body.email})
    .then(user => {
      if (user){
        errors.email = 'Email already exists'
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @route   POST api/users/login
// @desc    Login user / Return JWT token
// @access  public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user
  User.findOne({email})
    .then(user => {
      if(!user){
        return res.status(404).json({email: 'User not found'});
      }
      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch){
            //create payload
            const payload = {id: user.id, name: user.name};

            //sign token
            jwt.sign(
              payload, 
              keys.secretOrKey,
              {expiresIn: 3600},
              (err, token) => {
                return res.json({
                  token: 'Bearer ' + token
                });
              }
            );
          }else {
            return res.status(404).json({password: 'Password incorrect!'})
          }
        });
    })
    .catch(err => console.log(err));

});

// @route   GET api/users/current
// @desc    Return current user
// @access  private
router.get('/current', 
passport.authenticate('jwt', {session: false}), 
(req, res) => {
  res.json({msg: success});
  // res.json(res.user);
})



module.exports = router;
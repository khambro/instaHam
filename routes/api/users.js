const express = require("express");
const User = require('../../models/User');
const gravatar = require("gravatar");
const router = express.Router();

router.get("/test", (req, res) =>
  res.json({
    msg: "Users api works!"
  })
);


// @route   POST api/users/register
// @desc    Register user
// @access  public
router.post('/register', (req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (user){
        return res.status(400).json({
          email: 'Email already exists'
        });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          username: req.body.username
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


module.exports = router;
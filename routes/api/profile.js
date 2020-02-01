const express = require('express');
const Profile = require('../../models/Profile');
const router = express.Router();


router.get('/test', (req,res) => res.json({
    'msg': 'Profile api works!'
}));

// @route   POST api/users/register
// @desc    Register user
// @access  public
router.post('/create', (req, res) => {
    Profile.findOne({username: req.body.username})
      .then(profile => {
        if (profile){
          return res.status(400).json({
            username: 'Username already exists'
          });
        } else {
          const newProfile = new Profile({
            email: req.body.email,
            username: req.body.username,
            photo: req.body.photo
          });
          newProfile.save()
          .then(profile => res.json(profile))
          .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  });


module.exports = router;
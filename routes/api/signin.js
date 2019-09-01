const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const router = require("express").Router();


// module.exports = (app) => {
  /*
   * Sign up
   */
router.route('/signup').post( function (req, res, next) {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;
    
    if (!email) {
      // alert('Error: Email cannot be blank.');
      return res.send({
        success: false,
        message:'EMAIL CANNOT BE BLANK!'
       });

      
    }
    if (!password) {
      // alert('Error: Password cannot be blank.');
      return res.send({
        success: false,
        message: 'PASSWORD CANNOT BE BLANK!'
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        // alert('Server Error');
        return res.send({
          success: false,
          message: 'UNKNOWN SERVER ERROR'
        });
      } else if (previousUsers.length > 0) {
      //  alert('')
        return res.send({
          success: false,
          message: 'ACCOUNT EXISTS - PLEASE LOG IN'
        });
      }
      // Save the new user
      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          // alert('Error:Server Error')
          return res.send({
            success: false,
            message: 'UNKNOWN SERVER ERROR'

          });
        }
        // alert('Signed Up')
        return res.send({
          success: true,
          message: 'SIGNED UP'
        });
      });
    });
  }); // end of sign up endpoint












  router.route('/signin').post(function (req, res, next) {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;
    if (!email) {
      return res.send({
        success: false,
        message: 'EMAIL CANNOT BE BLANK'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'PASSWORD CANNOT BE BLANK'
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'UNKNOWN SERVER ERROR'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'USER DOES NOT EXIST - PLEASE SIGN UP'
        });
      }
      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'INVALID PASSWORD'
        });
      }
      // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'UNKNOWN SERVER ERROR'
          });
        }
        return res.send({
          success: true,
          message: 'SESSION STORED',
          token: doc._id,
          name:email
        });
      });
    });
  });





  router.route('/logout').get(function (req, res, next) {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'SESSION ERROR'
        });
      }
      return res.send({
        success: true,
        message: 'LOGGED OUT'
      });
    });
  });









  router.route('/verify').get(function (req, res, next) {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'SERVER VERIFICATION ERROR'
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'INVALID SESSION'
        });
      } else {
        // DO ACTION
        return res.send({
          success: true,
          message: 'VERIFIED'
        });
      }
    });
  });



module.exports = router;



// };
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
 done(null, user);
});

passport.deserializeUser(function(user, done) {
 done(null, user);
});

passport.use(
 new GoogleStrategy(
  {
   clientID: "662875513618-gqr6092bnrjp8f668fhsln0m3pdiaqin.apps.googleusercontent.com",
   clientSecret: "tTJgpHnLWeZ1D_uzH3qIETSy",
   callbackURL: "http://localhost:4500/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   var userData = {
    email: profile.emails[0].value,
    name: profile.displayName,
    token: accessToken
   };
   done(null, userData);
  }
 )
);

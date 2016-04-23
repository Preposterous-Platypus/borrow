var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/userModel.js');
var configAuth = require('./fb.js');

module.exports = function(app, session, passport) {
  app.use(session({
    secret: 'asdf',
    reset: true,
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: null }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  //restore authentication through HTTP requests
  passport.serializeUser(function(user, callback) {
    callback(null, user);
  });

  passport.deserializeUser(function(user, callback) {
    callback(null, user);
  });

  passport.use(new FacebookStrategy({
    clientID: fbConfig.facebookAuth.appID,
    clientSecret: fbConfig.facebookAuth.appSecret,
    callbackURL: fbConfig.facebookAuth.callbackUrl,
    // enableProof: true,
    profileFields: ['id', 'first_name', 'last_name', 'email'],
  }, function(accessToken, refreshToken, profile, callback) {
    process.nextTick(function() {
      User
      .findOne({ 'facebookUserId': profile.id }, function(err, found) {
        if (found) {
          callback(null, found);
        } else {
          User.create({
            facebookUserId: profile.id,
            accessToken: accessToken,
            firstName: profile.givenName,
            lastName: profile.familyName,
            email: profile.emails[0].value
          }, function(err, newUser) {
            console.log('user created ', newUser);
            callback(null, newUser);
          });
        }
        //if user exists
        // if (user) {
        //   return callback(null, user);
        // } else {
        //   //create new user in database if none exists
        //   var newUser = new User();

        //   newUser.facebook.id = profile.id;
        //   newUser.facebook.accessToken = accessToken;
        //   newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
        //   newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

        //   newUser.save(function(err) {
        //     if (err) {
        //       console.log(err);
        //       // res.send(err);
        //     }
        //     return callback(null, newUser);
        //   });
        // }
      });
    });
  }));
};
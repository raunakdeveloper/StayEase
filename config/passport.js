const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id); // Store the user ID in the session
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user); // Retrieve the user object from the database by the stored ID
  });
});

// Local strategy for username/password authentication
passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // Optional: specify the username field (default is "username")
    (username, password, done) => {
      // Find the user by email (or username)
      User.findOne({ email: username }, (err, user) => {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }

        // Check if the password is correct
        user.comparePassword(password, (err, isMatch) => {
          if (err) return done(err);

          if (isMatch) {
            return done(null, user); // If passwords match, log the user in
          } else {
            return done(null, false, { message: "Incorrect password." });
          }
        });
      });
    }
  )
);

module.exports = passport;

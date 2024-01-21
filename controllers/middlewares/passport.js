const passport = require("passport");
const User = require("../../models/user");
const config = require("../../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// create local strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(
  localOptions,
  async (email, password, username, done) => {
    try {
      const existingUser = await User.findOne({
        email: email,
        username: username,
      });
      if (!existingUser) {
        return done(null, false);
      }

      const isMatch = await existingUser.comparePassword(password);
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, existingUser);
    } catch (error) {
      return done(error, false);
    }
  }
);

// create jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, false);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);

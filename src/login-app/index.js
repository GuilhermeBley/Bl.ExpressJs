import express from "express";
import bodyParser from "body-parser";
import FacebookStrategy from "passport-facebook"
import passport from "passport";
import session from "express-session";
import dotenv from 'dotenv';

const port = process.env.PORT || 3000;

const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ 
  secret: process.env.SESSION_SECRET || 'your-secret-key', 
  resave: false, 
  saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: process.env['FACEBOOK_APP_ID'] || 'clientID',
    clientSecret: process.env['FACEBOOK_APP_SECRET'] || 'clientSecret',
    callbackURL: 'http://localhost:3000/oauth2/redirect/facebook',
    state: true,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    scope: ['email', 'public_profile']
    }, 
    function verify(accessToken, refreshToken, profile, cb) {
      // AI: HOW TO GET THE EMAIL HERE?
      console.log(`Access token: ${accessToken}; refreshToken: ${refreshToken}; profile: ${JSON.stringify(profile)}`)
      return cb(profile, false);
    }))


app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.redirect("/");
  });
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
    console.log('Authenticated successfully.')
  } else {
    console.log('secrets redirecting to "/login"...')
    res.redirect("/login");
  }
});

app.get('/login/facebook', passport.authenticate('facebook'));

app.get('/oauth2/redirect/facebook',
  passport.authenticate('facebook', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    console.log('oauth redirecting to "/"...')
    res.redirect('/');
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
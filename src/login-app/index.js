import express from "express";
import bodyParser from "body-parser";
import FacebookStrategy from "passport-facebook"
import passport from "passport";

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

passport.use(new FacebookStrategy({
    clientID: process.env['FACEBOOK_APP_ID'],
    clientSecret: process.env['FACEBOOK_APP_SECRET'],
    callbackURL: 'http://localhost:3000/oauth2/redirect/facebook',
    state: true
}), function verify(accessToken, refreshToken, profile, cb) {
  console.log(`Access token: ${accessToken}; refreshToken: ${refreshToken}; profile: ${profile}`)
})

app.get('/login/facebook', passport.authenticate('facebook'));

app.get('/oauth2/redirect/facebook',
  passport.authenticate('facebook', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
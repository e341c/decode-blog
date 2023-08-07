const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const GitHubStrategy = require('passport-github2').Strategy

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function (email, password, done) {
        User.findOne({ email }).then(user => {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) { return done(err) }
                if (result) { return done(null, user) }
            });
        }).catch(e => {
            return done(e)
        })
    }
))

passport.use(new GitHubStrategy({
    clientID: '091f2ce4f1aa74d38a6b',
    clientSecret: '88bde695c7378f77052183c175739adb2fc5e884',
    callbackURL: "http://localhost:8001/api/auth/github/"
},
    async function (accessToken, refreshToken, profile, done) {
        const user = await User.findOne({githubId: profile.id})
        if(!user){
            const newUser = await new User({ 
                githubId: profile.id,
                email: profile.email,
                full_name: profile.displayName,
            }).save()
            return done(null, newUser) 
        }
        return done(null, user) 
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id).then((user, err) => {
        done(err, user)
    })
})
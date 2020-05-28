import passport from "passport";
import passportLocal from "passport-local";
import loginService from "../services/loginService";

let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
    passport.use("localLogin", new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                await loginService.findUserByEmail(email).then(async (user) => {
                    if (!user) return done(null, false, { message: `This user email "${email}" doesn't exist` })
                    if (user) {
                        //compare password
                        let match = await loginService.compareUserPassword(user, password);
                        if (match === true) return done(null, user, null);
                        return done(null, false, { message: match });
                    }
                });

            } catch (err) {
                return done(null, false, { message: err });
            }
        }));
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    loginService.findUserById(id).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
});

module.exports = initPassportLocal;
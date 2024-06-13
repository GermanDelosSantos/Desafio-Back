import * as services from '../service/user.services.js';
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';

const strategyConfig = {
    usernameField: 'email',
    passportField: 'password',
    passReqToCallback: true
};

const signUp = async (req, email, password, done) => {
    try {
        const user = await services.getByEmailUser(email);
        console.log(user)
        if(user) return done(null, false);
        const newUser = await services.register(req.body);
        return done(null, newUser);
    } catch (error) {
        console.log(error);
        return done(null, false);
    }
};

const login = async (req, email, password, done) => {
    const userLogin = await services.login({ email, password });
    if(!userLogin){
        req.session.destroy()
        return done({ msg: 'Alto ahí Rufián ⛔' }, false);
    } 
    return done(null, userLogin)
};

const signUpStrategy = new LocalStrategy(strategyConfig, signUp);
const loginStrategy = new LocalStrategy(strategyConfig, login);

passport.use('register', signUpStrategy);
passport.use('login', loginStrategy);

passport.serializeUser((user, done)=>{
    done(null, user._id)
});

passport.deserializeUser(async(id, done)=>{
    const user = await services.getUserById(id);
    return done(null, user);
});
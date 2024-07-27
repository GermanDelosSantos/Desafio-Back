import UserService from '../service/user.services.js';
const services = new UserService();
import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import 'dotenv/config';
import UserDao from '../persistence/daos/mongodb/user.dao.js';

const userDao = new UserDao();

const strategyConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile);
        
        const email = profile._json.email ?? `no-email-${profile.id}@github.com`;
        const first_name = profile.username.split(' ')[0];
        // const last_name = profile._json.last_name ?? 'NoLastName';
        
        const last_name = profile.username.split(' ').length === 3 ? profile.username.split(' ')[1].concat(' ', profile.username.split(' ')[2]) : profile.username.split(' ')[1];
        
        const user = await services.getUserByEmail(email);
        if (user) return done(null, user);
        
        const newUser = await services.register({
            first_name,
            last_name,
            email,
            password: ' ',
            isGithub: true
        });
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
};

passport.use('github', new GithubStrategy(strategyConfig, registerOrLogin));

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await services.getUserById(id);
        console.log(user);
        return done(null, user);
    } catch (error) {
        done(error);
    }
});
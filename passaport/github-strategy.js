import * as services from '../service/user.services.js';
import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import 'dotenv/config';
import UserDao from '../daos/mongodb/user.dao.js';

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
        const name = profile._json.name ?? profile.username ?? 'NoName';
        
        const nameParts = name.split(' ');
        const first_name = nameParts[0] ?? 'NoFirstName';
        const last_name = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'NoLastName';
        
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
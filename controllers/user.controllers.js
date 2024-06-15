import * as services from "../service/user.services.js";

export const registerResponse = (req, res, next) => {
  try {
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};

export const loginResponse = async (req, res, next) => {
  try {
    let id = null;
    if(req.session.passport && req.session.passport.user) id = req.session.passport.user;
    const user = await services.getUserById(id);
    if(!user) res.status(401).json({ msg: 'Error de autenticacion' });
    const { first_name, last_name, email, age, role } = user;
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
};
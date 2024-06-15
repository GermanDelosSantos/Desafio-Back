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
    res.render('profile', {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ msg: 'Error al cerrar sesión' });
    }
    res.redirect('/login');
  });
};
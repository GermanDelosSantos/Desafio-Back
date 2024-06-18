import * as services from "../service/user.services.js";

export const registerResponse = (req, res, next) => {
  try {
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};


export const loginResponse = async(req, res, next)=>{
  try {
      const user = await services.getById(req.session.passport.user);
      const { first_name, last_name, email, age, role } = user;
      res.json({
          msg: 'Login OK',
          session: req.session,
          userData: {
              first_name,
              last_name,
              email,
              age,
              role
          }
      })
  } catch (error) {
      next(error);
  }
}

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ msg: 'Error al cerrar sesión' });
    }
    res.redirect('/login');
  });
};

export const githubResponse = async(req, res, next)=>{
  try {
      const { first_name, last_name, email, isGithub } = req.user;
      res.json({
          msg: 'Register/Login Github OK',
          session: req.session,
          userData: {
              first_name,
              last_name,
              email,
              isGithub
          }
      })
  } catch (error) {
      next(error);
  }
}
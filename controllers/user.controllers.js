import * as service from "../service/user.services.js";


export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.getByIdUser(id);
    if (!user) return res.status(404).json({ msg: "User not found!" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await service.getByEmailUser(email);
    if (!user) return res.status(404).json({ msg: "User not found!" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, name, sort } = req.query;
    const response = await service.getAll(page, limit, name, sort);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const user = { ...req.body };
    const newUser = await service.createUser(user);
    if (!newUser) return res.status(400).json({ msg: "Validation Error!" });
    res.json({ data: newUser });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = { ...req.body };

    const user = await service.getByIdUser(id);
    if (!user) return res.status(404).json({ msg: "User not found!" });

    const userUpdated = await service.updateUser(id, userData);
    res.json({ msg: "User updated", data: userUpdated });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDeleted = await service.deleteUser(id);
    if (!userDeleted) return res.status(404).json({ msg: "User not found!" });
    res.json({ msg: "User deleted" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  //req.session.passport.user
  try {
    let id = null;
    if(req.session.passport && req.session.passport.user) id = req.session.passport.user;
    const user = await service.getUserById(id);
    if(!user) res.status(401).json({ msg: 'Error de autenticacion' });
    const { first_name, last_name, email, age, role } = user;
    res.json({
      msg: 'LOGIN OK!',
      user: {
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
};

export const register = (req, res, next) => {
  try {
    res.json({
      msg: 'Register OK',
      session: req.session
    })
  } catch (error) {
    next(error);
  }
};

export const visit = (req, res) => {
  req.session.info = req.session.info || { username: 'User', contador: 0 };
  req.session.info.contador++;
  res.json({ msg: `${req.session.info.username} has visited the site ${req.session.info.contador} times` });
};

export const infoSession = (req, res) => {
  res.json({
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies
  });
};

export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ msg: "Unable to destroy session" });
    res.send('Session destroyed');
  });
};
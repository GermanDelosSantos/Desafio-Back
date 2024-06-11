import UserDaoMongoDB from "../daos/mongodb/user.dao.js";
const userDao = new UserDaoMongoDB();

export const getByIdUser = async (id) => {
  try {
    const user = await userDao.getById(id);
    if (!user) return false;
    else return user;
  } catch (error) {
    console.log(error);
  }
};

export const getByEmailUser = async (email) => {
  try {
    const user = await userDao.getByEmail(email);
    if (!user) return false;
    else return user;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (obj) => {
  try {
    const newUser = await userDao.create(obj);
    if (!newUser) throw new Error("Validation Error!");
    else return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id, obj) => {
  try {
    let item = await userDao.getById(id);
    if (!item) {
      throw new Error("User not found!");
    } else {
      const userUpdated = await userDao.update(id, obj);
      return userUpdated;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const userDeleted = await userDao.delete(id);
    return userDeleted;
  } catch (error) {
    console.log(error);
  }
};

export const getAll = async (page, limit, name, sort) => {
  try {
    return await userDao.getAll(page, limit, name, sort);
  } catch (error) {
    console.log(error);
  }
};
export const login = async(req, res) => {
  try {
      const { email, password } = req.body;
      console.log(email, password)
      const user = await userDao.login(email, password);
      console.log(user)
      if(!user) res.status(401).json({ msg: 'No estas autorizado' });
                  //res.redirect('/views/error-login)
      else {
          req.session.email = email;
          req.session.password = password;
          res.redirect('/views/profile')
      }
  } catch (error) {
      throw new Error(error)
  }
};

export const register = async (user) => {
  try {
    const { email } = user;
    const existUser = await userDao.getByEmail(email);
    if (!existUser) {
      return await userDao.create(user);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const visit = (req, res) => {
  req.session.info && req.session.info.contador++;
  res.json({ msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces` })
};

export const infoSession = (req, res) => {
  res.json({
      session: req.session,
      sessionId: req.sessionID,
      cookies: req.cookies
  })
};

export const logout = (req, res) => {
  req.session.destroy();
  res.send('session destroy')
};
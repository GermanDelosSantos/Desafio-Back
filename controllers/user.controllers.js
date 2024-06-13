import * as service from "../service/user.services.js";


export const getById = async (req, res) => {
  try {
    const user = await service.getByIdUser(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const create = async (req, res) => {
  try {
    const newUser = await service.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const update = async (req, res) => {
  try {
    const userUpdated = await service.updateUser(req.params.id, req.body);
    if (userUpdated) {
      res.json(userUpdated);
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const remove = async (req, res) => {
  try {
    const userDeleted = await service.deleteUser(req.params.id);
    if (userDeleted) {
      res.json(userDeleted);
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getAll = async (req, res) => {
  try {
    const { page, limit, name, sort } = req.query;
    const users = await service.getAllUsers(page, limit, name, sort);
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await service.login(email, password);
    if (user) {
      req.session.email = email;
      req.session.password = user.password;
      res.redirect("/profile");
    } else {
      res.status(401).json({ msg: "Authentication failed" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, ...additionalInfo } = req.body;
    const user = await service.register(email, password, additionalInfo);
    if (user) {
      res.redirect("/login");
    } else {
      res.status(401).json({ msg: "User exists" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
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
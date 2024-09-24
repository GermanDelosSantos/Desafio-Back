import * as service from "../service/message.services.js";

export const getAll = async (req, res, next) => {
  try {
    const response = await service.getAll();
    res.json(response);
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const msg = await service.getById(id);
    if (!msg) res.status(404).json({ msg: 'message not found' });
    else res.json(msg);
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const newMsg = await service.create(req.body);
    if (!newMsg) res.status(404).json({ msg: 'Error creating message' });
    else res.json(newMsg);
  } catch (error) {
    next(error.message);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const msgUpd = await service.update(id, req.body);
    if (!msgUpd) res.status(404).json({ msg: 'Error updating message' });
    else res.json(msgUpd);
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const msgDel = await service.remove(id);
    if (!msgDel) res.status(404).json({ msg: 'Error removing message' });
    else res.json(msgDel);
  } catch (error) {
    next(error.message);
  }
};

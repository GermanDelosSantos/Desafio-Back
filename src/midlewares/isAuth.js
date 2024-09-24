import {logger} from "../logs/logger.js";

export const isAuth = (req,res,next) => {
  logger.info(req.session);
  logger.info('isAuth: ', req.isAuthenticated());
  if(req.isAuthenticated()) return next();
  res.status(401).send({ msg: 'Unauthorized for middlewar isAuth' })
}
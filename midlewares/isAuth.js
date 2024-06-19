export const isAuth = (req,res,next) => {
  console.log(req.session);
  console.log('isAuth: ', req.isAuthenticated());
  if(req.isAuthenticated()) return next();
  res.status(401).send({ msg: 'Unauthorized for middlewar isAuth' })
}
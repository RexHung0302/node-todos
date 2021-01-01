module.exports = {
  verifyAuth: (req, res, next) => {
    if(!req.sessionID || !req.session.auth || !req.session.auth.uid || !req.session.auth.email) {
      res.redirect('users/login');
    } else {
      next();
    }
  }
}
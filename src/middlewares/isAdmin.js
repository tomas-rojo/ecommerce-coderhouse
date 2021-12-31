exports.isAdmin = async (req, res, next) => {
    if(req.user.role == "admin") {
      return next();
    }
    res.render('pageNotFound')
  }
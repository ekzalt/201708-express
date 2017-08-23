const checkAuth = (req, res, next) => {
	req.isAuthenticated() ? next() : res.redirect('/login');
};

module.exports = checkAuth;

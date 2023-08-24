// Authentication Middleware
function Auth(req, res, next) {
    const password = req.body.password;
    if (password === process.env.ADMIN_PASSWORD) {
       next(); // Authentication successful, proceed to the route
    } else {
      res.status(403).json({ error: 'Authentication failed' });
    }
  }

  module.exports = Auth;
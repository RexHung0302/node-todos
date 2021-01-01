var csrf = require('csurf');
// setup route middlewares
var csrfProtection = csrf({ cookie: true })

module.exports = csrfProtection;
'use strict';

/**
 * Module dependencies.
 */

const home = require('../app/controllers/home');
const routes = require('./../routes')
/**
 * Expose
 */

module.exports = function(app) {
  app.use(routes)

  /**
   * Error handling
   */

  app.use(function(err, req, res, next) {
    // treat as 404
    if (
      err.message &&
      (~err.message.indexOf('not found') ||
        ~err.message.indexOf('Cast to ObjectId failed'))
    ) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).json({ error : 'not found'});
  });
};

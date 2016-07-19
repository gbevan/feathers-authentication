import Debug from 'debug';

const debug = Debug('feathers-authentication:not-authenticated');

export default function notAuthenticated(options = {}) {
  debug('Registering notAuthenticated middleware with options:', options);

  return function(error, req, res, next) {
    debug('An authentication error occurred.', error);

    // clear any previous JWT cookie
    // if (options.cookie) {
    //   res.clearCookie(options.cookie.name);
    // }

    // NOTE (EK): If we are not dealing with a browser or it was an
    // XHR request then just skip this. This is primarily for
    // handling redirecting on an oauth failure.
    // console.log('Auth Error', error, options);
    // if (!options.failureRedirect || req.xhr || req.is('json') || !req.accepts('html')) {
    //   return next(error);
    // }

    if (error.code === 401 && options.failureRedirect !== undefined) {      
      return res.redirect(options.failureRedirect);
    }
    
    next(error);
  };
}
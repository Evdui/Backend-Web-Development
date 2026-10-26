
const sessionStore = require('../session/sessionStore');
const userRepository = require('../repositories/userRepository');

module.exports = async function requireSession(req, res, next) {
  try {
    const sid = req.signedCookies?.sid;

    if (typeof sid !== 'string' || !sid) {
      return res.status(401).json({
        error: {
          code: 'AUTH_REQUIRED',
          message: 'Authentication required',
        },
      });
    }

    const session = sessionStore.get(sid);

    if (!session) {
      return res.status(401).json({
        error: {
          code: 'AUTH_REQUIRED',
          message: 'Authentication required',
        },
      });
    }

    const user = await userRepository.findPublicById(session.userId);

    if (!user) {
      sessionStore.destroy(sid);

      return res.status(401).json({
        error: {
          code: 'AUTH_REQUIRED',
          message: 'Authentication required',
        },
      });
    }

    req.user = user;
    req.sessionId = sid;

    return next();
  } catch (error) {
    return next(error);
  }
};

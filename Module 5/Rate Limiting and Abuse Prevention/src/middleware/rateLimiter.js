
'use strict';

// middleware/rateLimiter.js

const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum 5 attempts per IP
  skipSuccessfulRequests: true, // Only failed requests count
  standardHeaders: true,
  legacyHeaders: false,

  // express-rate-limit automatically returns 429 and includes Retry-After
  // when the request limit is exceeded.

  // For multi-instance deployments, rate-limit-redis can replace the default
  // in-memory store by providing a shared RedisStore through the `store` option.
  // With multiple instances behind a load balancer, each instance otherwise
  // maintains its own counter, allowing clients to exceed the intended limit.
  // Redis provides one shared counter across all instances.
});

module.exports = authLimiter;

// Description: This file contains the rate limiter middleware for the API.
// parameters: windowMs, maxRequests, allowInfiniteCalls, timeLimit
// windowMs: The time window for which requests are checked.
// maxRequests: The maximum number of requests allowed in the time window.
// allowInfiniteCalls: If true, the rate limiter will allow infinite calls to the API after the time limit has passed.
// timeLimit: The time limit in seconds for which the rate limiter will allow infinite calls to the API.

const rateLimit = require("express-rate-limit");

function createRateLimiter(
  windowMs,
  maxRequests,
  allowInfiniteCalls,
  timeLimit
) {
  const limiter = rateLimit({
    windowMs: windowMs,
    max: maxRequests,
    message: "Too many requests from this IP, please try again later.",
  });

  return (req, res, next) => {
    if (allowInfiniteCalls) {
      const timeLimitMs = timeLimit * 1000; // Convert time limit to milliseconds
      const startTime = Date.now() - timeLimitMs;

      req.rateLimit = {
        ...limiter,
        windowMs: timeLimitMs,
        max: Infinity,
        store: new rateLimit.MemoryStore({
          windowMs: timeLimitMs,
          max: maxRequests,
        }),
      };

      // Clear out previous requests before the time limit
      req.rateLimit.store.resetKey(req.ip, startTime);
    } else {
      req.rateLimit = limiter;
    }

    return limiter(req, res, next);
  };
}

module.exports = createRateLimiter;

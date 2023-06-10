# Rate Limiter Package

The Rate Limiter package is a middleware for Express applications that helps limit the number of requests made to an API within a specified time frame.

## Features

- Limit the number of requests per minute.
- Customizable time window and maximum limit.
- Option to allow infinite calls within a time limit.

## Installation

To install the Rate Limiter package, use the following command:

```shell
npm install rate-limiter-package
```

## Usage

```javascript
const express = require("express");
const rateLimiter = require("rate-limiter-package");
const app = express();

const port = 3000;

// Set rate limiter options
const windowMs = 60000; // 1 minute
const maxRequests = 5; // 5 requests per minute
const allowInfiniteCalls = false;
const timeLimit = 0;

app.use(rateLimiter(windowMs, maxRequests, allowInfiniteCalls, timeLimit));

app.get("/", (req, res) => {
  res.send("Module works!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
```

In the above example, we set the rate limiter options to allow a maximum of 5 requests per minute. You can customize the windowMs, maxRequests, allowInfiniteCalls, and timeLimit values according to your requirements.

## Options

- windowMs: The time window in milliseconds for rate limiting.
- maxRequests: The maximum number of requests allowed within the given time window.
- allowInfiniteCalls: A boolean indicating whether to allow infinite calls within a time limit.
- timeLimit: The time limit in seconds within which infinite calls are allowed.

## Contributing

Contributions to the Rate Limiter package are welcome! If you encounter any issues, have suggestions, or would like to contribute improvements.
please feel free to open an issue or submit a pull request on the GitHub repository.

## License

This package is licensed under the MIT License.

const express = require("express");
const rateLimiter = require("./rateLimiter");
const app = express();

const port = 3000;

app.use(rateLimiter(60000, 5, false, 0)); // 5 requests per minute
app.get("/", (req, res) => {
  res.send("module works!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

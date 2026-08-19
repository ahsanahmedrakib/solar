const dev = process.env.NODE_ENV === "development";
const hostname = process.env.HOSTNAME || "localhost";

// FIX: Do NOT use parseInt. Let it accept cPanel's string pipe directly.
const port = process.env.PORT || 3000;

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    // This will now correctly bind to the cPanel socket
    if (err) throw err;
    console.log(`> Ready on production port/pipe`);
  });
});

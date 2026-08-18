const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// IMPORTANT: only run the dev server when NODE_ENV is explicitly set to
// "development". If it is unset (e.g. cPanel runs `node server.js` without
// NODE_ENV), default to production. Running Next.js in dev mode on a shared
// host pegs the CPU at 100% and gets the account suspended.
const dev = process.env.NODE_ENV === "development";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error handling request:", err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(
        `> Ready on http://${hostname}:${port} [${dev ? "development" : "production"}]`,
      );
    });
});

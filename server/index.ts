import app from "./app";

Bun.serve({
  fetch: app.fetch,
});

console.log("Serving on http://localhost:3000");

import { app } from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";

await connectDatabase();
const server = app.listen(env.PORT, () => console.info(`Kyora API listening on port ${env.PORT}`));

const shutdown = (signal: string) => {
  console.info(`${signal} received; closing HTTP server.`);
  server.close(() => process.exit(0));
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

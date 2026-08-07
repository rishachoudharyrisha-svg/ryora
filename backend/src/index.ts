import { app } from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";
import { logger } from "./logger.js";

await connectDatabase();
const server = app.listen(env.PORT, () => logger.info(`Ryora API listening on port ${env.PORT}`));

const shutdown = (signal: string) => {
  logger.info(`${signal} received; closing HTTP server.`);
  server.close(() => process.exit(0));
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

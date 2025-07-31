import createApp from "./src/app.js";
import environment from "./src/configs/environment.js";
import logger from "./src/utils/logger.js";

(async function startHttpServer() {
  try {
    const server = await createApp();
    const { port } = environment.app;

    server.listen(port, () => {
      logger.info(`server is running on port ${port}`);
      logger.info("see api health in /health");
    });
  } catch (error) {
    logger.error(`error starting server: ${error}`);
  }
})();

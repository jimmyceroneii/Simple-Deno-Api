import { Application, Router } from "../deps.ts";
import type { PlantController } from "../plants/index.ts";

interface CreateServerDependencies {
  configuration: {
    port: number;
  };
  plants: PlantController;
}

export const createServer = async (config: CreateServerDependencies) => {
  const app = new Application();

  const apiRouter = new Router({ prefix: "/api" });

  apiRouter.get("/plants", async (ctx) => {
    ctx.response.body = {
      plants: await config.plants.getAll(),
    };
  });

  app.use(apiRouter.routes());
  app.use(apiRouter.allowedMethods());

  app.use((ctx) => {
    ctx.response.body = "Hello world!";
  });

  app.addEventListener("listen", (e) => {
    console.log(
      `Application running at http://${
        e.hostname || "localhost"
      }:${config.configuration.port}`,
    );
  });

  app.addEventListener("error", (e) => {
    console.log("An error occurred: ", e.message);
  });

  await app.listen({ port: config.configuration.port });
};

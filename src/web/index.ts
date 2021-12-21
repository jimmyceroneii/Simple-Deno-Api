import { Application, Server } from "../deps.ts";
import type { PlantController } from "../plants/index.ts";

interface CreateServerDependencies {
  configuration: {
    port: number;
  };
  plants: PlantController;
}

export const createServer = async (config: CreateServerDependencies) => {
  const app = new Application();

  app.use((ctx) => {
    ctx.response.body = "Hello world!";
  });

  await app.listen({ port: config.configuration.port });
};

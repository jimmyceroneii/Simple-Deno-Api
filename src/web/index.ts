import { Application, Router } from "../deps.ts";
import type { PlantController } from "../plants/index.ts";
import { UserController } from "../users/index.ts";

interface CreateServerDependencies {
  configuration: {
    port: number;
  };
  plants: PlantController;
  user: UserController;
}

export const createServer = async (config: CreateServerDependencies) => {
  const app = new Application();

  app.use(async (ctx, next) => {
    await next();

    const rt = ctx.response.headers.get("X-Response-Time");

    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  });

  app.use(async (ctx, next) => {
    const start = Date.now();

    await next();

    const ms = Date.now() - start;

    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  });

  const apiRouter = new Router({ prefix: "/api" });

  apiRouter.get("/plants", async (ctx) => {
    ctx.response.body = {
      plants: await config.plants.getAll(),
    };
  });

  apiRouter.post("/users/register", async (ctx) => {
    const { username, password } = await ctx.request.body({ type: "json" })
      .value;

    if (!username || !password) {
      ctx.response.status = 400;
    }

    try {
      const createdUser = config.user.register({ username, password });
      ctx.response.status = 201;
      ctx.response.body = { user: createdUser };
    } catch (e) {
      ctx.response.status = 400;
      ctx.response.body = { message: e.message };
    }
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

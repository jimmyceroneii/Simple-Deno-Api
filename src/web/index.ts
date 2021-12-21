import { Server } from "../deps.ts";
import type { PlantController } from "../plants/index.ts";

interface CreateServerDependencies {
  configuration: {
    port: number;
  };
  plants: PlantController;
}

export const createServer = async (config: CreateServerDependencies) => {
  const handler = async (request: Request) => {
    console.log("RequestURL: ", request.url);
    if (
      request.url ===
        `http://localhost:${config.configuration.port}/api/plants` &&
      request.method === "GET"
    ) {
      const body = JSON.stringify({ plants: await config.plants.getAll() });

      return new Response(body, { status: 200 });
    } else {
      const body = `Your user-agent is:\n\n${
        request.headers.get(
          "user-agent",
        ) ?? "Unknown"
      }`;

      return new Response(body, { status: 200 });
    }
  };

  const server = new Server({ handler });
  const listener = Deno.listen({ port: config.configuration.port });

  console.log(
    `server listening on http://localhost:${config.configuration.port}`,
  );

  await server.serve(listener);
};

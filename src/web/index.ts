import { Server } from "https://deno.land/std@0.118.0/http/server.ts";

interface CreateServerDependencies {
  configuration: {
    port: number;
  };
}

export const createServer = async (config: CreateServerDependencies) => {
  const handler = (request: Request) => {
    console.log("RequestURL: ", request.url);
    if (
      request.url ===
        `http://localhost:${config.configuration.port}/api/plants` &&
      request.method === "GET"
    ) {
      const body = JSON.stringify({ plants: [] });

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

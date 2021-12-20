import { serve } from "https://deno.land/std@0.118.0/http/server.ts";

interface CreateServerDependencies {
  configuration: {
    port: number;
  };
}

export async function createServer(dependencies: CreateServerDependencies) {
  const server = serve();

  console.log(
    `Server running at https://localhost:${dependencies.configuration.port}`,
  );

  for await (let req of server) {
    req.respond({ body: "plants api", status: 200 });
  }
}

import { serve } from "https://deno.land/std@0.118.0/http/server.ts";

const listener = Deno.listen({ port: 8080 });
const server = serve(listener);

console.log(`Server running at https://localhost:${PORT}`);

for await (let req of server) {
  req.respond({ body: "museums api", status: 200 });
}

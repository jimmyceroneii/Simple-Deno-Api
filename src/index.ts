import {
  Controller as PlantController,
  Repository as PlantRepository,
} from "./plants/index.ts";
import { createServer } from "./web/index.ts";

const plantRepository = new PlantRepository();

const plantController = new PlantController({
  plantRepository,
});

plantRepository.storage.set("longkey", {
  id: "longkey",
  name: "bean",
  proteins: ["Histidine"],
});

console.log(await plantController.getAll());

createServer({ configuration: { port: 8080 }, plants: plantController });

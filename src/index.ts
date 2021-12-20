import {
  Controller as PlantController,
  Repository as PlantRepository,
} from "./plants/index";

const plantRepository = new PlantRepository();

const plantController = new PlantController({
  plantRepository,
});

console.log(await plantController.getAll());

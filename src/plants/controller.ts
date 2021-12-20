import type { PlantController, PlantRepository } from "./index.ts";
interface ControllerDependencies {
  plantRepository: PlantRepository;
}
export class Controller implements PlantController {
  plantRepository: PlantRepository;

  constructor({ plantRepository: plantRepository }: ControllerDependencies) {
    this.plantRepository = plantRepository;
  }

  async getAll() {
    return this.plantRepository.getAll();
  }
}

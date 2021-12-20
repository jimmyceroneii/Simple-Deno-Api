import { Plant, PlantRepository } from "./index";

export class Repository implements PlantRepository {
  storage = new Map<string, Plant>();

  async getAll() {
    return [...this.storage.values()];
  }
}

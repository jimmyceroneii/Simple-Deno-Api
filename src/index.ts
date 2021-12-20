import { Controller as PlantController } from 'plants/controller';

const plantController = new PlantController({
	plantRepository: {
		getAll: async () => []
	}
});

console.log(await plantController.getAll())
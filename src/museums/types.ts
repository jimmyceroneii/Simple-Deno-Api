export type EssentialProtein = "Phenylalanine" | "Valine" | "Tryptophan" | "Threonine" | "Isoleucine" | "Methionine" | "Histidine" | "Leucine" | "Lysine";

export type Plant = {
    id: string;
    name: string;
    proteins: EssentialProtein[];
}

export interface PlantController {
    getAll: () => Promise<Plant[]>;
}
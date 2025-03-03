export interface IProductModel {
    products: IProduct[],
    product: IProduct,
    searchQuery: string
}

export interface INutrition {
    proteins: number;
    fats: number;
    carbs: number;
    kcal: number;
}

export interface IProduct {
    id: number | string,
    img?: string,
    name: string,
    weight?: string,
    description?: string,
    price?: number,
    nutrition: INutrition,
    categoryId: number
}
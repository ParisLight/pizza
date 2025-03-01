export interface ICategory {
    id: number,
    icon: string,
    name: string
}

export interface ICategoryModel {
    categories: ICategory[],
    idActiveCategory: number
}
export interface ICartItem {
    product_id: number | string,
    quantity: number
}

export interface ICartModel {
    items: ICartItem[]
}
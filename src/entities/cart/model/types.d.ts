export interface ICartItem {
    product_id: number,
    quantity: number
}

export interface ICartModel {
    items: ICartItem[]
}
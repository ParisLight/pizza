export interface ICartItem {
    productId: number | string,
    quantity: number
}

export interface ICartModel {
    items: ICartItem[]
}
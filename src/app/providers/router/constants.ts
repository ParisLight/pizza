interface IRouteMap {
    mainPage: string,
    cart: string,
    profile: string,
    myOrders: string,
    product: string
}

export const routesMap: IRouteMap = {
    mainPage: '/',
    cart: '/cart',
    profile: '/profile',
    myOrders: '/orders',
    product: '/product/:productId'
}
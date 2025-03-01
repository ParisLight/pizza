interface IRouteMap {
    mainPage: string,
    basket: string,
    profile: string,
    myOrders: string,
    product: string
}

export const routesMap: IRouteMap = {
    mainPage: '/',
    basket: '/basket',
    profile: '/profile',
    myOrders: '/orders',
    product: '/product/:productId'
}
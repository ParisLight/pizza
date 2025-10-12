export const routesMap = {
    mainPage: '/',
    cart: '/cart',
    profile: '/profile',
    myOrders: '/orders',
    product: '/product/:productId'
} as const

export type RouteValuesType = typeof routesMap[keyof typeof routesMap]
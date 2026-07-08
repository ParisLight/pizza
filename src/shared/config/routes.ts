export const ROUTES = {
  mainPage: "/",
  order: "/order",
  profile: "/profile",
  myOrders: "/my-orders",
} as const

export type ROUTE_TYPE = (typeof ROUTES)[keyof typeof ROUTES]

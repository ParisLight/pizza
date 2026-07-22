import type { Component } from "vue"

export const POPUP_REGISTRY = {
  ProductCardPopup: defineAsyncComponent(() =>
    import("@/widgets/product-card-popup").then((module) => module.ProductCardPopup),
  ),
} as const satisfies Record<string, Component>

export type PopupName = keyof typeof POPUP_REGISTRY

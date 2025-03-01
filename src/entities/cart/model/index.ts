import { defineStore } from 'pinia'
import type { ICartModel } from "./types";

export const useCartModel = defineStore( {
    id: 'cart',
    state: () =>
        <ICartModel>{
            items: []
        },

    actions: {
        addToCart(productId: number | string) {
            const item = this.items.find(item => item.productId === productId)
            if(item) {
                item.quantity += 1
            } else {
                this.items.push({ productId, quantity: 1 })
            }
        },
        removeFromCart(productId: number | string) {
            const item = this.items.find(item => item.productId === productId)
            if(item && item.quantity > 1) {
                item.quantity -= 1
            } else {
                this.items = this.items.filter(item => item.productId !== productId)
            }
        }
    }
})
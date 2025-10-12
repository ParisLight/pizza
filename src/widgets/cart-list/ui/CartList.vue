<template>
  <div class="cart-list">
    <div class="cart-list__title">
      <span>Ваш заказ</span>
    </div>
    <div class="cart-list__list">
      <transition-group name="fade-group">
        <CartItem
          class="cart-list__cart-item"
          v-for="cartItem in cartList"
          :product="productModel.getProductById(cartItem.product.id)"
          @on-img-click="onImgCartItemClick"
        >
          <template #action>
            <ChangeQuantity
              :product="productModel.getProductById(cartItem.product.id)"
              :custom-minus-handler="true"
              @on-click-minus="onClickMinusProduct"
            />
              <transition name="fade" mode="out-in">
                <CompletelyDelete
                  v-if="visibleDeleteStates[cartItem.product.id]"
                  class="cart-list__completely-delete"
                  :product-id="cartItem.product.id"
                  @cancel-click="toggleDeleteVisibility(cartItem.product.id)"
                />
              </transition>
            <div class="cart-list__cart-item-delete" @click="toggleDeleteVisibility(cartItem.product.id)">
              <img src="@/assets/images/delete-icon.svg" alt="delete">
            </div>
          </template>
        </CartItem>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IProduct, useProductModel } from "@/entities/product";
import { useCartModel } from "@/entities/cart";
import { CartItem } from '@/features/cart'
import { ChangeQuantity, CompletelyDelete } from "@/features/cart";
import { computed, ref } from "vue";
import { usePopupModel } from '@/features/popups'

const visibleDeleteStates = ref<Record<number, boolean>>({});
const toggleDeleteVisibility = (productId: number) => {
    visibleDeleteStates.value[productId] = !visibleDeleteStates.value[productId];
};

const cartModel = useCartModel()
const productModel = useProductModel()
const popupModel = usePopupModel()

type CartItem = {
  product: IProduct,
  quantity: number
}

const cartList = computed<CartItem[]>(() => {

  const productsList: IProduct[] = Array.from(productModel.products.values())
  if(!productsList.length) return []

  return cartModel.items.map(item => {
    const currentProduct = productsList.find(product => product.id === item.product_id)
    if(!currentProduct) return undefined


    return {
      product: currentProduct,
      quantity: item.quantity
    }
  }).filter(Boolean) as CartItem[]
})

const onClickMinusProduct = async (product: IProduct, quantityInCart: number) => {
  const productId = product.id

  if(quantityInCart > 1) {
    await cartModel.removeFromCart(productId)
  } else {
    toggleDeleteVisibility(productId)
  }
}

const onImgCartItemClick = (product: IProduct): void => {
  popupModel.openPopup('ProductCardPopup', {
    openingIdProduct: product.id,
  })
}

onBeforeMount(async () => {
})
</script>

<style lang="scss" scoped>
.cart-list {
  &__title span {
    font-variant: all-small-caps;
    font-size: 24px;
    font-weight: 700;
    line-height: 14px;
    color: var(--color-golden);
  }
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    margin-top: 20px;
  }
  &__cart-item {
    position: relative;
  }
  &__completely-delete {
    position: absolute;
    width: fit-content;
    z-index: 10;
    right: unset;
    top: 1px;
  }
  &__cart-item-delete {
    cursor: pointer;
    align-self: flex-end;
    margin-left: auto;
    font-size: 0;
  }
  :deep(.product__action) {
    justify-content: space-between;
    width: 100%;
  }
}
.cart-item {
  display: flex;
  column-gap: 16px;

  &__img {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 124px;
    height: 124px;
    border-radius: 16px;
    background-color: var(--color-main);
    box-shadow: 0px 4px 20px 0px #0000008C;
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }
  &__center {
    display: flex;
    flex-direction: column;
    &--align-center {
      align-self: center;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
  }
  &__category {
    font-size: 12px;
    line-height: 14px;
    color: var(--color-white);
    opacity: 0.5;
    font-variant: all-small-caps;
  }
  &__name {
    font-size: 16px;
    line-height: 14px ;
    font-weight: 700;
    color: var(--color-golden);
  }
  &__price {
    margin-top: 16px;
    span {
      font-size: 20px;
      font-weight: 700;
      line-height: 29px;
      color: var(--color-golden);
    }
  }
  &__completely-delete {
    align-self: center;
  }
  &__change-quantity {
    margin-top: auto;
  }
  &__footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 16px;
  }

}
</style>
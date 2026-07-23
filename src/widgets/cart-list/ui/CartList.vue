<template>
  <div class="cart-list">
    <div class="cart-list__list">
      <template v-if="isLoadingProducts && !cartIsEmpty">
        <skeleton-product-card-row v-for="n in 2" :key="n" />
      </template>
      <base-error-plug v-else-if="loadError">
        <template #action>
          <base-btn
            color="var(--color-purple)"
            :loading="isLoadingProducts"
            @click.stop="loadCartProducts"
          >
            Повторить
          </base-btn>
        </template>
      </base-error-plug>
      <base-empty-plug
        v-else-if="cartIsEmpty"
        title="Корзина пуста"
        description="Добавьте что-нибудь вкусное из меню — и оно окажется здесь."
      />
      <template v-else>
        <transition-group name="fade-group">
          <cart-item
            class="cart-list__cart-item"
            v-for="cartItem in cartDetailedItems"
            :key="cartItem.product.id"
            :product="cartItem.product"
            :disabled="!cartItem.product.isActive"
            @img-click="cartItem.product.isActive ? onImgCartItemClick($event) : null"
          >
            <template #action>
              <change-quantity
                :product-id="cartItem.product.id"
                :disabled="!cartItem.product.isActive"
              />
              <transition name="fade" mode="out-in">
                <completely-delete
                  v-if="isDeleteVisible(cartItem.product.id)"
                  class="cart-list__completely-delete"
                  :product-id="cartItem.product.id"
                  @cancel="toggleDeleteVisibility(cartItem.product.id)"
                />
              </transition>
              <div
                class="cart-list__cart-item-delete"
                @click="toggleDeleteVisibility(cartItem.product.id)"
              >
                <img src="@/assets/images/delete-icon.svg" alt="delete" />
              </div>
            </template>
          </cart-item>
        </transition-group>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type IProduct, SkeletonProductCardRow } from "@/entities/product"
import { useCartList, useConfirmationCompletelyDelete } from "../model"
import { CartItem, ChangeQuantity, CompletelyDelete } from "@/features/cart"
import { usePopupModel } from "@/widgets/popups-system"
import { BaseBtn } from "@/shared/ui/base-btn"
import { BaseEmptyPlug } from "@/shared/ui/base-empty-plug"
import { BaseErrorPlug } from "@/shared/ui/base-error-plug"

const popupModel = usePopupModel()

const { cartDetailedItems, loadCartProducts, cartIsEmpty, isLoadingProducts, loadError } =
  useCartList()

const { toggleDeleteVisibility, isDeleteVisible } = useConfirmationCompletelyDelete()

const onImgCartItemClick = (product: IProduct): void => {
  popupModel.openPopup("ProductCardPopup", {
    openingIdProduct: product.id,
  })
}

onMounted(async () => {
  await loadCartProducts()
})
</script>

<style lang="scss" scoped>
.cart-list {
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
    box-shadow: 0px 4px 20px 0px #0000008c;
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
    font-size: var(--font-size-sm);
    line-height: var(--font-size-md);
    color: var(--color-white);
    opacity: 0.5;
    font-variant: all-small-caps;
  }
  &__name {
    font-size: var(--font-size-lg);
    line-height: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    color: var(--color-golden);
  }
  &__price {
    margin-top: 16px;
    span {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
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

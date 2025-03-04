<template>
  <div class="cart-list">
    <div class="cart-list__title">
      <span>Ваш заказ</span>
    </div>
    <div class="cart-list__list">
      <div
        class="cart-item"
        v-for="item in cartList"
        :key="item.id"
      >
        <div class="cart-item__img">
          <img :src="item.product.img" alt="">
        </div>
        <transition name="fade" mode="out-in">
          <div
            v-if="!visibleDeleteStates[item.product.id]"
            class="cart-item__center"
            :class="{'cart-item__center--align-center': visibleDeleteStates[item.product.id]}"
          >
            <div class="cart-item__info">
              <span class="cart-item__category">{{ getCategoryName(item.product.categoryId) }}</span>
              <span class="cart-item__name">{{ item.product.name }}</span>
            </div>
            <div class="cart-item__price">
              <span>{{ item.product.price }} ₽</span>
            </div>
            <ChangeQuantity
              class="cart-item__change-quantity"
              :product="item.product"
            />
          </div>
          <CompletelyDelete
            v-else
            @cancel-click="toggleDeleteVisibility(item.product.id)"
            class="cart-item__completely-delete"
            :product-id="item.product.id"
          />
        </transition>
        <div class="cart-item__right">
          <div class="cart-item__delete" @click="toggleDeleteVisibility(item.product.id)">
            <img src="@/assets/images/delete-icon.svg" alt="delete">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ProductApi } from "@/entities/product";
import { useCartModel } from "@/entities/cart";
import { useCategoryModel} from '@/entities/category'
import { ChangeQuantity, CompletelyDelete } from "@/features/cart";

const visibleDeleteStates = ref<Record<number, boolean>>({});
const toggleDeleteVisibility = (productId: number) => {
    visibleDeleteStates.value[productId] = !visibleDeleteStates.value[productId];
};

const cartModel = useCartModel()
const categoryModel = useCategoryModel()

const productTypes = ref([])
// todo: refactor
const cartList = computed(() => {
    if(!productTypes.value.length) return []

    return cartModel.items.map(item => {
        const currentProduct = productTypes.value.find(product => product.id === item.productId)
        if(currentProduct) {
            console.log({
                product: currentProduct,
                quantity: item.quantity
            }, 'check_it_')
            return {
                product: currentProduct,
                quantity: item.quantity
            }
        }
    })
})

onBeforeMount(async () => {
    const productsIds = cartModel.items.map(item => item.productId)
    if(!productsIds || !productsIds.length) return
    productTypes.value = await ProductApi.fetchProductsByProductIds(productsIds)
})

const getCategoryName = (id: number) => {
    const category = categoryModel.categories.find(category => category.id === id)
    if(category) return category.name

    return ''
}
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
  &__right {
    align-self: flex-end;
    margin-left: auto;
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
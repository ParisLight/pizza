<template>
    <div class="current-order">
        <div class="current-order__row">
            <base-input
                class="current-order__field"
                title="имя"
                placeholder="Введите своё имя"
            />
            <base-input
                class="current-order__field"
                title="номер телефона"
                placeholder="+7 (999) 999 99 99"
                v-maska="'+7 (###) ### ## ##'"
                :formatter="numberFormat"
            />
        </div>
        <div class="current-order__row">
            <base-input
                class="current-order__field"
                title="адрес доставки"
                placeholder="Введите адрес"
            />
        </div>
        <div class="current-order__row">
            <base-input
                class="current-order__field"
                title="квартира"
                placeholder="1"
                :formatter="digitalFormat"
                :parser="digitalFormat"
            />
            <base-input
                class="current-order__field"
                title="этаж"
                placeholder="3"
                :formatter="digitalFormat"
                :parser="digitalFormat"
            />
        </div>
        <div class="current-order__row">
            <BaseRadioGroup
                :list="[{id: 1, name: 'доставка'}, {id: 2, name: 'самовывоз'}]"
                v-model="test"
            />
        </div>
        <div class="current-order__row">
            <base-dropdown
                class="current-order__field"
                v-model="test"
                title="Время доставки"
                :list="[{id: 1, name: 'qwe'}, {id: 2, name: 'asd'}, {id: 3, name: 'zxc'}]"
            />
        </div>
        <div class="current-order__row">
            <base-checkbox
                label="Не звоните, пожалуйста, в домофон, спит ребёнок"
                v-model="isNotIntercom"
                :value="isNotIntercom"
            />
        </div>
        <div class="current-order__row">
            <base-checkbox
                label="Карта"
                v-model="isCash"
                :value="isCash"
            />
            <base-checkbox
                label="Наличные"
                v-model="isCard"
                :value="isCard"
                @change="console.log($event, 'event_check_')"
            />
        </div>
        <div class="current-order__row flex-col flex-align-start">
            <div class="current-order__row-title">
                <span>доступно оплаты 160 баллов</span>
            </div>
            <base-checkbox
                label="Списать баллы"
                v-model="isUsedBonuses"
                :value="isUsedBonuses"
                @change="console.log($event, 'event_check_')"
            />
        </div>
        <div class="current-order__row">
            <base-textarea
                class="current-order__field"
                title="комментарий"
                placeholder="Комментарий к заказу"
                rows="4"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import {BaseInput} from "@/shared/ui/base-input";
import {BaseDropdown} from "@/shared/ui/base-dropdown";
import {BaseCheckbox} from "@/shared/ui/base-checkbox";
import {BaseTextarea} from "@/shared/ui/base-textarea";
import {BaseRadioGroup} from "@/shared/ui/base-radio-group";
import {useFormatter} from '@/shared/lib'

const test = ref(1)
const isCard = ref(false)
const isCash = ref(false)
const isNotIntercom = ref(false)
const isUsedBonuses = ref(false)

const {digitalFormat, numberFormat} = useFormatter()
</script>

<style lang="scss" scoped>
.current-order {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    margin-top: 28px;
    &__row {
        display: flex;
        align-items: center;
        column-gap: 16px;
    }
    &__row-title {
        span {
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
            font-variant: all-small-caps;
            opacity: 0.5;
        }
    }
    &__field {
        width: 100%;
    }
}

.flex-col {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
}
.flex-align-start {
    display: flex;
    align-items: flex-start;
}
</style>
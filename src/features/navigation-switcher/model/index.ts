import { defineStore } from "pinia";

interface INavigationInterface {
    isOpenNavigation: boolean
}

export const useNavigationModel = defineStore('navigation', {
    state: () => <INavigationInterface> {
        isOpenNavigation: false
    },
    actions: {
        toggleNavigationOpenState(): void {
            this.isOpenNavigation = !this.isOpenNavigation;
        },
        closeNavigation() {
            this.isOpenNavigation = false;
        }
    }
})
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter()

interface INavigationInterface {
    isOpenNavigation: boolean
}

export const useNavigationModel = defineStore({
    id: 'navigation',
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
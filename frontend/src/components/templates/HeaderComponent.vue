<template>
    <div class="header">
        <logo :size="logoSize"></logo>
        <navigation :isNavOpen="isNavOpen" @closeNav="toggleNav" />
        <div class="header__actions">
            <profile></profile>
            <svg class="header__icon" @click="toggleNav">
                <use href="../../assets/icons/icons.svg#menu-icon"></use>
            </svg>
            <theme-toggle class="header__toggle" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

import Logo from './Logo.vue'
import Profile from './Profile.vue'
import Navigation from './Navigation.vue'
import ThemeToggle from './ThemeToggle.vue'

const windowWidth = ref(window.innerWidth)
const isNavOpen = ref(false)

const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth
}

onMounted(() => {
    window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateWindowWidth)
})

const logoSize = computed(() => {
    return windowWidth.value < 768 ? 40 : 44
})

const toggleNav = () => {
    isNavOpen.value = !isNavOpen.value
}
</script>

<style scoped lang="scss">
.header {
    padding: 21px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__actions {
        display: flex;
        align-items: center;
        gap: 25px;

        @media (min-width: 768px) {
            gap: 50px;
        }
    }

    &__icon {
        cursor: pointer;
        display: flex;

        @media (min-width: 1100px) {
            display: none;
        }
    }

    &__toggle {
        display: none;

        @media (min-width: 1100px) {
            display: flex;
        }
    }
}

.header__icon {
    width: 28px;
    height: 28px;
    stroke: var(--dark-grey);
}
</style>

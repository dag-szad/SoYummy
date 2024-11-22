<template>
    <div class="header">
        <logo :size="logoSize"></logo>
        <nav class="header__nav">
            <ul class="header__nav-list">
                <li>
                    <router-link to="/categories">Categories</router-link>
                </li>
                <li>
                    <router-link to="/add">Add recipe</router-link>
                </li>
                <li>
                    <router-link to="/my">My recipes</router-link>
                </li>
                <li>
                    <router-link to="/favorites">Favorites</router-link>
                </li>
                <li>
                    <router-link to="/list">Shopping list</router-link>
                </li>
                <li>
                    <router-link to="/search" class="search">
                        <svg class="search__icon">
                            <use
                                href="../../assets/icons/icons.svg#search-icon"
                            ></use>
                        </svg>
                    </router-link>
                </li>
            </ul>
        </nav>
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

    position: relative;
    z-index: 2;

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

        width: 28px;
        height: 28px;

        stroke: var(--main-txt);

        @media (min-width: 768px) {
            stroke: var(--header-dark);
        }

        @media (min-width: 1100px) {
            display: none;
        }
    }

    &__nav {
        display: none;

        @media (min-width: 1100px) {
            display: flex;
        }

        &-list {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 45px;

            list-style: none;

            color: var(--main-txt);
            font-size: 0.875rem;

            li {
                transition: color 0.3s ease-in-out;

                &:hover {
                    color: var(--main-accent);

                    .search__icon {
                        stroke: var(--main-accent);
                    }
                }
            }
        }
    }

    &__toggle {
        display: none;

        @media (min-width: 1100px) {
            display: flex;
        }
    }
}

.search {
    display: flex;
    align-items: center;
    gap: 8px;

    &__icon {
        fill: none;
        stroke: var(--main-txt);
        width: 20px;
        height: 20px;

        transition: stroke 0.3s ease-in-out;
    }
}
</style>

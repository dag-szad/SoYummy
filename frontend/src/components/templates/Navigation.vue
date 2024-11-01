<template>
    <div :class="['nav', { 'nav--open': isNavOpen }]">
        <div class="nav__header">
            <logo :size="logoSize" @click="closeNav"></logo>
            <svg class="nav__icon" @click="closeNav">
                <use href="../../assets/icons/icons.svg#cancel-icon"></use>
            </svg>
        </div>
        <nav>
            <ul class="nav__list">
                <li>
                    <router-link to="/categories" @click="closeNav">
                        Categories
                    </router-link>
                </li>
                <li>
                    <router-link to="/add" @click="closeNav">
                        Add recipe
                    </router-link>
                </li>
                <li>
                    <router-link to="/my" @click="closeNav">
                        My recipes
                    </router-link>
                </li>
                <li>
                    <router-link to="/favorite" @click="closeNav">
                        Favorites
                    </router-link>
                </li>
                <li>
                    <router-link to="/list" @click="closeNav">
                        Shopping list
                    </router-link>
                </li>
                <li>
                    <router-link to="/search" class="search" @click="closeNav">
                        <svg class="search__icon">
                            <use
                                href="../../assets/icons/icons.svg#search-icon"
                            ></use>
                        </svg>
                        <p>Search</p>
                    </router-link>
                </li>
            </ul>
        </nav>
        <theme-toggle />
    </div>
</template>

<script setup lang="ts">
import {
    ref,
    onMounted,
    onUnmounted,
    computed,
    defineProps,
    defineEmits,
} from 'vue'

import Logo from './Logo.vue'
import ThemeToggle from './ThemeToggle.vue'

defineProps({
    isNavOpen: {
        type: Boolean,
        default: false,
    },
})

const windowWidth = ref(window.innerWidth)

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

const emit = defineEmits(['closeNav'])

const closeNav = () => {
    emit('closeNav')
}
</script>

<style scoped lang="scss">
.nav {
    background-color: var(--nav-background);
    background-image: url('../../assets/images/background/background-1.png');
    background-repeat: no-repeat;
    background-position: bottom right;

    position: fixed;
    z-index: 3;
    inset: 0;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 21px 16px;

    pointer-events: none;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease-in-out;

    color: var(--main-txt);

    &--open {
        pointer-events: auto;
        visibility: visible;
        opacity: 1;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__icon {
        cursor: pointer;
        stroke: var(--main-txt);
        width: 30px;
        height: 30px;

        @media (min-width: 768px) {
            width: 32px;
            height: 32px;
        }
    }

    &__list {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;

        list-style: none;

        font-size: 1.125rem;

        li {
            transition: color 0.3s ease-in-out;

            &:hover {
                color: var(--main-accent);

                .search__icon {
                    stroke: var(--main-accent);
                }
            }
        }

        @media (min-width: 768px) {
            font-size: 1.5rem;
        }

        @media (min-width: 1100px) {
            flex-direction: row;
            justify-content: center;
            gap: 45px;

            font-size: 0.875rem;
        }
    }

    &__toggle {
        @media (min-width: 1100px) {
            display: none;
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

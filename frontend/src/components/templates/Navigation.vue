<template>
    <div class="nav">
        <div class="nav__header">
            <logo :size="logoSize"></logo>
            <svg class="nav__icon">
                <use href="../../assets/icons/icons.svg#cancel-icon"></use>
            </svg>
        </div>
        <nav>
            <ul class="nav__list">
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
                    <router-link to="/favorite">Favorites</router-link>
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
                        <p class="search__text">Search</p>
                    </router-link>
                </li>
            </ul>
        </nav>
        <toggle-theme class="nav__toggle" />
    </div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import toggleTheme from './toggleTheme.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue'

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
</script>

<style scoped lang="scss">
.nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 18px 16px;

    position: absolute;
    inset: 0;

    background-color: var(--secondary-green);
    background-image: url('../../assets/images/background/background-1.png');
    background-repeat: no-repeat;
    background-position: bottom right;

    @media (min-width: 1100px) {
        padding: 0;

        position: relative;
        inset: unset;

        background: none;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media (min-width: 1100px) {
            display: none;
        }
    }

    &__icon {
        stroke: var(--dark-grey);
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
                color: var(--main-green);

                .search__icon {
                    stroke: var(--main-green);
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
        stroke: var(--dark-grey);
        width: 20px;
        height: 20px;

        transition: stroke 0.3s ease-in-out;
    }

    &__text {
        @media (min-width: 1100px) {
            display: none;
        }
    }
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Logo from '../templates/Logo.vue'

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
    return windowWidth.value < 768 ? 54 : 68
})
</script>

<template>
    <div class="home">
        <logo :size="logoSize" />
        <div class="home__desc">
            <h1 class="home__title">Welcome to the app!</h1>
            <p class="home__text">
                This app offers more than just a collection of recipes - it is
                designed to be your very own digital cookbook. You can easily
                save and retrieve your own recipes at any time.
            </p>
        </div>
        <div class="home__buttons">
            <router-link to="/register">
                <button class="home__button-green">Registration</button>
            </router-link>
            <router-link to="/login">
                <button class="home__button-transparent">Sign in</button>
            </router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
.home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;

    color: var(--home-txt);

    height: 100vh;

    background-image: url('../../assets/images/homePage/background-mobile@1x.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    @media only screen and (-webkit-min-device-pixel-ratio: 2),
        only screen and (min-resolution: 192dpi) {
        background-image: url('../../assets/images/homePage/background-mobile@2x.jpg');
    }

    @media (min-width: 768px) {
        background-image: url('../../assets/images/homePage/background-tablet@1x.jpg');
        gap: 44px;

        @media only screen and (-webkit-min-device-pixel-ratio: 2),
            only screen and (min-resolution: 192dpi) {
            background-image: url('../../assets/images/homePage/background-tablet@2x.jpg');
        }
    }

    @media (min-width: 1440px) {
        background-image: url('../../assets/images/homePage/background-desktop@1x.jpg');

        @media only screen and (-webkit-min-device-pixel-ratio: 2),
            only screen and (min-resolution: 192dpi) {
            background-image: url('../../assets/images/homePage/background-desktop@2x.jpg');
        }
    }

    &__desc {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 14px;

        text-align: center;
    }

    &__title {
        font-size: 1.5rem;
        font-weight: 600;

        @media (min-width: 768px) {
            font-size: 1.75rem;
            max-width: 500px;
        }
    }

    &__text {
        font-size: 0.875rem;
        max-width: 300px;

        @media (min-width: 768px) {
            font-size: 1.125rem;
            max-width: 500px;
        }

        @media (min-width: 1440px) {
            max-width: 550px;
        }
    }

    &__buttons {
        display: flex;
        gap: 12px;

        @media (min-width: 768px) {
            gap: 18px;
        }
    }

    &__button {
        &-green {
            cursor: pointer;

            padding: 12px 24px;

            border-radius: 24px 44px;
            border: 2px solid var(--home-btn);

            font-size: 0.875rem;
            color: var(--home-txt);

            background-color: var(--home-btn);
            transition: all 0.3s ease-in-out;

            &:hover {
                background-color: var(--home-btn-hover);
                border-color: var(--home-btn-hover);
            }

            @media (min-width: 768px) {
                font-size: 1rem;
                padding: 22px 44px;
            }
        }

        &-transparent {
            cursor: pointer;

            padding: 12px 24px;

            border-radius: 24px 44px;
            border: 2px solid var(--home-txt);

            font-size: 0.875rem;
            color: var(--home-txt);

            background-color: transparent;
            transition: all 0.3s ease-in-out;

            &:hover {
                background-color: var(--home-btn);
                border-color: var(--home-btn);
            }

            @media (min-width: 768px) {
                font-size: 1rem;
                padding: 22px 44px;
            }
        }
    }
}
</style>

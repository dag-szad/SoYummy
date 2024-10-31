<template>
    <div>
        <div class="main">
            <div class="main__desc">
                <h1 class="main__title"><span>So</span>Yummy</h1>
                <p class="main__text">
                    This is not only a recipe app, it is, in fact, your cookbook.
                    You can add your own recipes to save them for the future.
                </p>
                <search-bar v-if="!isMobile" class="temporary" />
            </div>
            <div class="main__image">
                <img
                    src="/src/assets/images/mainPage/main-mobile@1x.png"
                    alt="404 page image"
                    class="main__img"
                    :srcset="`
                        /src/assets/images/mainPage/main-mobile@1x.png 321w,
                        /src/assets/images/mainPage/main-mobile@2x.png 642w,
                        /src/assets/images/mainPage/main-tablet@1x.png 369w,
                        /src/assets/images/mainPage/main-tablet@2x.png 737w,
                        /src/assets/images/mainPage/main-desktop@1x.png 578w,
                        /src/assets/images/mainPage/main-desktop@2x.png 1156w
                        `"
                    sizes="(max-width: 767px) 321px, 
                    (min-width: 768px) and (max-width: 1099px) 369px, 
                    (min-width: 1100px) 578px"
                />
                <div class="addon">
                    <p class="addon__text">
                        <span>Delicious and healthy</span> way to enjoy a variety of
                        fresh ingredients in one satisfying meal
                    </p>
                    <router-link to="/categories" class="addon__link">
                        <p class="addon__link-text">See recipes</p>
                        <svg class="addon__link-icon">
                            <use
                                href="../../assets/icons/icons.svg#arrow-right-icon"
                            ></use>
                        </svg>
                    </router-link>
                </div>
                <search-bar v-if="isMobile" class="temporary" />
            </div>
        </div>
        <div class="categories">
            <main-page-category category="vegan" />
            <main-page-category category="vegetarian" />
            <main-page-category category="dessert" />
        </div>
    </div>
    <div class="trapezoid"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SearchBar from '../templates/SearchBar.vue'
import MainPageCategory from '../templates/MainPageCategory.vue';

const isMobile = ref(window.innerWidth <= 768)

const handleResize = () => {
    isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;

    position: relative;
    z-index: 1;

    width: fit-content;
    margin: 32px auto;

    @media (min-width: 768px) {
        flex-direction: row;
        gap: 20px;
    }

    @media (min-width: 1100px) {
        gap: 75px;
    }

    &__desc {
        display: flex;
        flex-direction: column;
        align-items: center;

        @media (min-width: 768px) {
            align-items: start;
        }
    }

    &__title {
        font-size: 3.75rem;
        font-weight: 400;
        color: var(--main-txt);
        transition: color 0.3s ease-in-out;

        span {
            color: var(--main-accent);
        }

        @media (min-width: 768px) {
            font-size: 4.5rem;
        }

        @media (min-width: 1100px) {
            font-size: 6.25rem;
        }
    }

    &__text {
        text-align: center;
        font-size: 0.875rem;

        width: 250px;

        color: var(--main-txt-transparent);
        transition: color 0.3s ease-in-out;

        @media (min-width: 768px) {
            text-align: start;
            width: 350px;
        }

        @media (min-width: 1100px) {
            font-size: 1.125rem;
        }
    }

    &__image {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

.addon {
    position: absolute;
    bottom: 100px;
    right: 15px;

    background-color: var(--main-page-addon);
    border-radius: 8px;

    padding: 8px;
    width: 225px;

    color: var(--main-txt);
    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
        padding: 12px;
        width: 260px;

        bottom: 75px;
        right: 15px;
    }

    @media (min-width: 1100px) {
        padding: 16px;
        width: 300px;

        right: 25px;
    }

    &__text {
        font-size: 0.75rem;
        font-weight: 500;

        @media (min-width: 768px) {
            font-size: 0.875rem;
        }

        span {
            color: var(--main-accent);
        }
    }

    &__link {
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 5px;

        &:hover {
            color: var(--main-accent);
        }
    }

    &__link-text {
        font-size: 0.625rem;
        font-weight: 400;

        transition: color 0.3s ease-in-out;
    }

    &__link-icon {
        width: 18px;
        height: 18px;
        transition: color 0.3s ease-in-out;
    }
}

.trapezoid {
    position: absolute;
    top: 200px;
    right: 0px;

    width: 100%;
    height: 100%;
    background-image: url('../../assets/images/mainPage/trapezoid-mobile.svg');
    background-repeat: no-repeat;
    background-position: top right;

    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
        top: -10px;
        right: -25px;
        background-image: url('../../assets/images/mainPage/trapezoid-tablet.svg');
    }

    @media (min-width: 1100px) {
        top: 0px;
        right: -150px;
        background-image: url('../../assets/images/mainPage/trapezoid-desktop.svg');
    }

    @media (min-width: 1200px) {
        top: 0px;
        right: -100px;
    }
}

.temporary {
    margin-top: 32px;
}
</style>

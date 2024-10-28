<template>
    <div class="main">
        <div class="main__desc">
            <h1 class="main__title"><span>So</span>Yummy</h1>
            <p class="main__text">
                This is not only a recipe app, it is, in fact, your cookbook.
                You can add your own recipes to save them for the future.
            </p>
            <search-bar v-if="!isMobile" class="temporary"/>
        </div>
        <div class="main__image">
            <img
                src="../../assets/images/mainPage/main-mobile@1x.png"
                alt="alt"
                class="main__img"
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
            <search-bar v-if="isMobile" class="temporary"/>
        </div>
    </div>
    <div class="trapezoid"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SearchBar from '../templates/SearchBar.vue'

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
    gap: 44px;

    position: relative;
    z-index: 1;

    padding: 32px 16px;

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

    &__img {
        width: 400px;
    }
}

.addon {
    position: absolute;
    bottom: 150px;
    right: 25px;

    background-color: var(--main-page-addon);
    border-radius: 8px;

    padding: 8px;
    width: 225px;

    color: var(--main-txt);

    @media (min-width: 768px) {
        padding: 12px;
        width: 260px;
    }

    @media (min-width: 1100px) {
        padding: 16px;
        width: 300px;
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
            .addon__link-text {
                color: var(--main-accent-hover);
            }
            .addon__link-icon {
                stroke: var(--main-accent-hover);
            }
        }
    }

    &__link-text {
        font-size: 0.625rem;
        font-weight: 400;

        transition: color 0.3s ease-in-out;
    }

    &__link-icon {
        stroke: var(--main-txt);
        width: 18px;
        height: 18px;
        transition: stroke 0.3s ease-in-out;
    }
}

.trapezoid {
    position: absolute;
    top: 0px;
    right: 0px;

    width: 60%;
    height: 650px;
    background-color: #ebf3d4;
    clip-path: polygon(40% 0, 100% 0, 100% 100%, 0% 100%);

    @media (min-width: 768px) {
        width: 50%;
        height: 700px;
    }

    @media (min-width: 1100px) {
        clip-path: polygon(50% 0, 100% 0, 100% 100%, 0% 100%);
    }
}

.temporary {
    margin-top: 32px;
}
</style>

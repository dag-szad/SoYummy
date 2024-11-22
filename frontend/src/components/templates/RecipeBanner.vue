<template>
    <div class="banner">
        <div class="banner__image"></div>
        <h1 class="banner__title">{{ title }}</h1>
        <p class="banner__desc">{{ description }}</p>
        <button class="banner__button" @click="toggleFavorite">
            {{
                isFavorite ? 'Remove from favorites' : 'Add to favorite recipes'
            }}
        </button>
        <div class="banner__time">
            <svg class="banner__icon">
                <use href="../../assets/icons/icons.svg#clock-icon"></use>
            </svg>
            <p>{{ time }} min</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
    id: string
    title: string
    description: string
    time: number
    isFavorite: boolean
}>()

const emit = defineEmits<{
    (event: 'addToFav', id: string): void
    (event: 'removeFromFav', id: string): void
}>()

const toggleFavorite = () => {
    if (props.isFavorite) {
        emit('removeFromFav', props.id)
    } else {
        emit('addToFav', props.id)
    }
}
</script>

<style lang="scss" scope>
.banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    &__image {
        position: absolute;
        top: 0;

        width: 100%;
        height: 455px;

        background-image: url('../../assets/images/recipePage/recipe-banner-mobile@1x.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;

        @media only screen and (-webkit-min-device-pixel-ratio: 2),
            only screen and (min-resolution: 192dpi) {
            background-image: url('../../assets/images/recipePage/recipe-banner-mobile@2x.png');
        }

        @media (min-width: 768px) {
            background-image: url('../../assets/images/recipePage/recipe-banner-tablet@1x.png');
            height: 525px;

            @media only screen and (-webkit-min-device-pixel-ratio: 2),
                only screen and (min-resolution: 192dpi) {
                background-image: url('../../assets/images/recipePage/recipe-banner-tablet@2x.png');
            }
        }

        @media (min-width: 1100px) {
            background-image: url('../../assets/images/recipePage/recipe-banner-desktop@1x.png');

            @media only screen and (-webkit-min-device-pixel-ratio: 2),
                only screen and (min-resolution: 192dpi) {
                background-image: url('../../assets/images/recipePage/recipe-banner-desktop@2x.png');
            }
        }
    }

    @media (min-width: 768px) {
        gap: 32px;
    }

    &__title {
        text-align: center;
        position: relative;

        font-size: 1.5rem;
        font-weight: 600;

        color: var(--main-accent);

        @media (min-width: 768px) {
            font-size: 2.75rem;
        }
    }

    &__desc {
        text-align: center;
        max-width: 300px;

        position: relative;

        font-size: 0.75rem;
        font-weight: 400;

        color: black;

        @media (min-width: 768px) {
            font-size: 1.125rem;
            max-width: 500px;
        }

        @media (min-width: 1100px) {
            max-width: 650px;
        }
    }

    &__button {
        position: relative;

        font-size: 0.625rem;

        background-color: transparent;
        color: black;
        border-radius: 24px 44px;
        border: 1px solid var(--main-accent);

        padding: 10px 18px;

        transition: all 0.3s ease-in-out;

        &:hover {
            background-color: var(--main-accent);
            color: var(--main-btn-txt);
        }

        @media (min-width: 768px) {
            font-size: 1rem;
            padding: 18px 44px;
        }
    }

    &__time {
        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;

        font-size: 0.625rem;
        font-weight: 400;
        color: black;

        padding-top: 18px;

        @media (min-width: 768px) {
            gap: 8px;
            font-size: 0.875rem;
        }
    }

    &__icon {
        width: 15px;
        height: 15px;

        stroke: currentColor;
        fill: none;

        @media (min-width: 768px) {
            width: 20px;
            height: 20px;
        }
    }
}
</style>

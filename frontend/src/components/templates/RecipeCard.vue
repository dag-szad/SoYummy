<template>
    <div class="card">
        <img class="card__img" :src="img" alt="Recipe Image" />
        <div class="card__side">
            <div class="card__top">
                <div class="card__desc">
                    <h2 class="card__title">{{ title }}</h2>
                    <p class="card__text">{{ description }}</p>
                </div>
                <button class="card__delete" @click="removeRecipe">
                    <svg class="card__icon-delete">
                        <use
                            href="../../assets/icons/icons.svg#trash-icon"
                        ></use>
                    </svg>
                </button>
            </div>
            <div class="card__bottom">
                <div class="card__time">
                    <svg class="card__icon-time">
                        <use
                            href="../../assets/icons/icons.svg#clock-icon"
                        ></use>
                    </svg>
                    <p>{{ time }} min</p>
                </div>
                <router-link :to="`/recipes/${id}`" class="card__button"
                    >See recipe</router-link
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
})

const emit = defineEmits()
const removeRecipe = () => {
    emit('remove', props.id)
}
</script>

<style lang="scss" scoped>
.card {
    background-color: var(--card-bg);
    border-radius: 8px;
    padding: 14px 9px;
    margin-bottom: 18px;

    display: flex;
    gap: 14px;

    max-width: 1240px;
    height: fit-cardentnt;

    transition: all 0.3s ease-in-out;

    @media (min-width: 768px) {
        padding: 28px 24px;
        margin-bottom: 40px;
        gap: 24px;
    }

    @media (min-width: 1100px) {
        padding: 40px;
        margin-bottom: 50px;
        gap: 40px;
    }

    &__img {
        border-radius: 8px;
        width: 124px;
        object-fit: cover;

        @media (min-width: 768px) {
            width: 228px;
        }

        @media (min-width: 1100px) {
            width: 324px;
        }
    }

    &__side {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 15px;

        height: max;
        width: 100%;
    }

    &__top {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    &__bottom {
        display: flex;
        justify-content: space-between;
        align-self: flex-end;
        width: 100%;
        margin-top: auto;
    }

    &__desc {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        gap: 14px;

        width: 90%;

        @media (min-width: 768px) {
            gap: 28px;
        }

        @media (min-width: 1100px) {
            gap: 50px;
        }
    }

    &__title {
        font-size: 1rem;
        font-weight: 500;

        color: var(--card-ttl-txt);
        transition: color 0.3s ease-in-out;

        @media (min-width: 768px) {
            font-size: 1.5rem;
        }
    }

    &__text {
        font-size: 0.625rem;
        font-weight: 400;

        color: var(--card-txt);
        transition: color 0.3s ease-in-out;

        height: 50px;
        overflow: hidden;

        @media (min-width: 768px) {
            font-size: 1rem;
            height: 75px;
        }

        @media (min-width: 1100px) {
            font-size: 1.125rem;
            height: 150px;
        }
    }

    &__time {
        align-self: flex-end;

        display: flex;
        align-items: center;
        gap: 4px;

        width: fit-cardent;
        height: fit-cardent;

        font-size: 0.625rem;
        font-weight: 400;
        color: var(--card-ttl-txt);

        transition: all 0.3s ease-in-out;

        @media (min-width: 768px) {
            gap: 8px;
            font-size: 0.875rem;
        }
    }

    &__icon-time {
        width: 15px;
        height: 15px;

        stroke: currentColor;
        fill: none;

        transition: all 0.3s ease-in-out;

        @media (min-width: 768px) {
            width: 20px;
            height: 20px;
        }
    }

    &__delete {
        cursor: pointer;

        align-self: flex-start;

        background-color: var(--card-del);
        border-radius: 4px;
        border: none;
        padding: 5px;

        width: fit-cardent;
        height: fit-cardent;

        transition: all 0.3s ease-in-out;

        &:hover {
            background-color: var(--card-del-hov);
        }

        @media (min-width: 768px) {
            padding: 8px;
        }

        @media (min-width: 1100px) {
            padding: 10px;
        }
    }

    &__icon-delete {
        width: 15px;
        height: 15px;

        stroke: var(--card-ttl-txt);
        fill: none;

        transition: all 0.3s ease-in-out;

        @media (min-width: 768px) {
            width: 20px;
            height: 20px;
        }
    }

    &__button {
        cursor: pointer;

        align-self: flex-end;

        background-color: var(--card-btn);
        border-radius: 24px 44px;
        border: none;

        padding: 6px 14px;

        width: fit-cardent;
        height: fit-cardent;

        color: var(--main-btn-txt);
        font-size: 0.625rem;

        transition: all 0.3s ease-in-out;

        &:hover {
            background-color: var(--card-btn-hov);
        }

        @media (min-width: 768px) {
            padding: 12px 32px;
            font-size: 0.875rem;
        }

        @media (min-width: 1100px) {
            padding: 14px 38px;
            font-size: 1rem;
        }
    }
}
</style>

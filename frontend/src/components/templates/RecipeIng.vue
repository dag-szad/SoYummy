<template>
    <div class="ing">
        <ul class="ing__titles">
            <li>Ingredients</li>
            <li>Number</li>
            <li>Add to list</li>
        </ul>
        <ul class="ing__list">
            <li
                v-for="ingredient in ingredients"
                :key="ingredient.id"
                class="ing__item"
            >
                <div class="ing__header">
                    <img src="" alt="" class="ing__img" />
                    <h3 class="ing__title">{{ ingredient.id }}</h3>
                </div>
                <p class="ing__amount">{{ ingredient.measure }}</p>
                <input type="checkbox" class="ing__checkbox" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    ingredients: Array<{
        id: string
        measure: string
    }>
}>()
</script>

<style lang="scss" scope>
.ing {
    margin: 200px auto 50px;
    max-width: 1240px;

    @media (min-width: 768px) {
        margin: 115px auto 100px;
    }

    &__titles {
        display: flex;
        justify-content: space-between;
        gap: 20px;

        background-color: var(--main-accent);
        border-radius: 8px;

        color: var(--main-btn-txt);
        font-size: 0.625rem;
        font-weight: 600;

        list-style: none;

        padding: 12px 14px;
        margin-bottom: 24px;

        li:first-child {
            flex-grow: 2;
        }

        @media (min-width: 768px) {
            gap: 40px;
            font-size: 1.125rem;
            padding: 21px 32px;
            margin-bottom: 32px;
        }

        @media (min-width: 1100px) {
            gap: 110px;
            padding: 21px 40px;
            margin-bottom: 50px;
        }
    }

    &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 32px;

        background-color: var(--recipe-bg);
        border-radius: 8px;

        list-style: none;

        padding: 12px 14px;
        margin-top: 16px;

        div:first-child {
            flex-grow: 2;
        }

        @media (min-width: 768px) {
            gap: 40px;
            font-size: 1.125rem;
            padding: 21px 32px;
            margin-top: 24px;
        }

        @media (min-width: 1100px) {
            gap: 110px;
            padding: 21px 40px;
        }
    }

    &__header {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    &__img {
        width: 65px;
        height: 65px;
    }

    &__title {
        color: var(--recipe-txt);
        font-size: 0.75rem;
        font-weight: 400;

        @media (min-width: 768px) {
            font-size: 1.5rem;
        }
    }

    &__amount {
        background-color: var(--main-accent);
        border-radius: 4px;

        color: var(--main-btn-txt);
        font-size: 0.625rem;
        font-weight: 500;

        padding: 4px 8px;

        @media (min-width: 768px) {
            font-size: 1.125rem;
        }
    }
}
</style>

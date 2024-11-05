<template>
    <div class="search-page">
        <page-title title="Search" />
        <search-bar addon @recipes-fetched="handleRecipes" />
        <div class="search-recipes">
            <router-link
                v-for="recipe in recipes"
                :key="recipe._id"
                :to="`/recipes/${recipe._id}`"
                class="recipe"
            >
                <img
                    :src="recipe.thumb"
                    alt="Recipe Thumbnail"
                    class="recipe__image"
                />
                <h3 class="recipe__title">{{ recipe.title }}</h3>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageTitle from '../templates/PageTitle.vue'
import SearchBar from '../templates/SearchBar.vue'

interface Recipe {
    _id: string
    title: string
    thumb: string
}

const recipes = ref<Recipe[]>([])

function handleRecipes(data: any) {
    recipes.value = data
}
</script>

<style lang="scss" scoped>
.search-page {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.search-recipes {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 32px;

    margin: 0 auto;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 40px 32px;
    }

    @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 64px 16px;
    }
}

.recipe {
    position: relative;
    z-index: 1;

    max-width: 350px;

    display: flex;
    flex-direction: column;
    align-items: center;

    &__image {
        border-radius: 8px;
        width: 100%;
    }

    &__title {
        background-color: var(--main-bg);
        transition: background-color 0.3s ease-in-out;

        border-radius: 6px;

        text-align: center;
        font-size: 1rem;
        font-weight: 500;
        color: var(--main-txt);

        padding: 10px;

        width: 80%;
        position: absolute;
        bottom: 15px;
    }
}
</style>

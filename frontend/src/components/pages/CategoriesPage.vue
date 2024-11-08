<template>
    <div class="category">
        <page-title title="Categories" />
        <category-list
            @category-selected="onCategorySelected"
            :selected-category="categoryTitle"
        />
        <div v-if="recipes.length" class="category__recipes">
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
        <div v-else>
            <p>No recipes available for this category.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import PageTitle from '../templates/PageTitle.vue'
import CategoryList from '../templates/CategoryList.vue'

import axios from 'axios'

const recipes = ref([])
const categoryTitle = ref('')
const route = useRoute()
const router = useRouter()

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const fetchRecipes = async (title: string) => {
    try {
        const url = `http://localhost:3000/recipes/category/${capitalizeFirstLetter(
            title
        )}`
        const response = await axios.get(url)
        recipes.value = response.data
    } catch (error) {
        console.error('Error fetching recipes:', error)
    }
}

const onCategorySelected = (title: string) => {
    categoryTitle.value = title
    fetchRecipes(title)

    router.push({
        path: `/categories/${title.toLowerCase().replace(/\s+/g, '-')}`,
    })
}

onMounted(() => {
    if (route.params.categoryTitle) {
        categoryTitle.value = route.params.categoryTitle.replace(/-/g, ' ')
        fetchRecipes(categoryTitle.value)
    }
})
</script>

<style lang="scss" scoped>
.category {
    display: flex;
    flex-direction: column;
    gap: 40px;

    &__recipes {
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
}

.recipe {
    position: relative;

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

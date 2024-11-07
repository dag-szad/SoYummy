<template>
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

<style lang="scss" scoped></style>

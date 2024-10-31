<template>
    <div>
        <h2>{{ categoryTitle }}</h2>
        <div>
            <div v-for="recipe in recipes" :key="recipe._id">
                <img :src="recipe.thumb" alt="Recipe Thumbnail" />
                <h3>{{ recipe.title }}</h3>
            </div>
        </div>
        <router-link :to="moreRecipes">
            <button>See all</button>
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
    category: {
        type: String,
        default: 'breakfast',
    },
})

const categoryTitle =
    props.category.charAt(0).toUpperCase() + props.category.slice(1)

interface Recipe {
    _id: string
    title: string
    thumb: string
}

const recipes = ref<Recipe[]>([])

const recipeUrl = 'http://localhost:3000'
const moreRecipes = `/recipes/category/${props.category}`

const fetchRecipes = async () => {
    try {
        const url = `${recipeUrl}/recipes/category/${categoryTitle}/4`
        console.log('Fetching recipes from URL:', url)
        const response = await axios.get(url)
        recipes.value = response.data
    } catch (error) {
        console.error('Error fetching recipes:', error)
    }
}

onMounted(() => {
    fetchRecipes()
})
</script>

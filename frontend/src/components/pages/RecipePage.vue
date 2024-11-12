<template>
    <div v-if="recipe">
        <recipe-banner
            :title="recipe.title"
            :description="recipe.description"
            :time="recipe.time"
        />
        <recipe-ing :ingredients="recipe.ingredients" />
        <recipe-prep :instructions="recipe.instructions" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import RecipeBanner from '../templates/RecipeBanner.vue'
import RecipeIng from '../templates/RecipeIng.vue'
import RecipePrep from '../templates/RecipePrep.vue'

interface Ingredient {
    id: string
    measure: string
}

interface Recipe {
    _id: string
    title: string
    description: string
    time: string
    instructions: string
    ingredients: Ingredient[]
}

const recipe = ref<Recipe | null>(null)

const route = useRoute()
const recipeId = route.params.recipeId as string

const fetchRecipe = async () => {
    try {
        const url = `http://localhost:3000/recipes/${recipeId}`
        const response = await axios.get(url)
        recipe.value = response.data
    } catch (error) {
        console.error('Error fetching recipe:', error)
    }
}

onMounted(() => {
    fetchRecipe()
})
</script>

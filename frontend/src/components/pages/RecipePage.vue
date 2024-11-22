<template>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="recipe">
        <recipe-banner
            :id="recipe._id"
            :title="recipe.title"
            :description="recipe.description"
            :time="recipe.time"
            :isFavorite="isFavorite"
            @addToFav="addRecipeToFav"
            @removeFromFav="removeRecipeFromFav"
        />
        <recipe-ing :ingredients="recipe.ingredients" />
        <recipe-prep
            :instructions="recipe.instructions"
            :preview="recipe.thumb"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
    time: number
    instructions: string
    thumb: string
    ingredients: Ingredient[]
}

const recipe = ref<Recipe | null>(null)
const isLoading = ref(true)
const favRecipes = ref<string[]>([])

const route = useRoute()
const router = useRouter()
const recipeId = route.params.recipeId as string

const favoriteListId = localStorage.getItem('favoriteListId')

if (!favoriteListId) {
    console.error('No favorite list found! Redirecting to login.')
    router.push('/login')
}

const fetchRecipe = async () => {
    try {
        const url = `http://localhost:3000/recipes/${recipeId}`
        const response = await axios.get(url)
        recipe.value = response.data
    } catch (error) {
        console.error('Error fetching recipe:', error)
    } finally {
        isLoading.value = false
    }
}

const fetchFavorites = async () => {
    if (!favoriteListId) return

    try {
        const response = await axios.get(
            `http://localhost:3000/favorite/${favoriteListId}`
        )
        favRecipes.value = response.data.items.map((item: { recipeId: string }) => item.recipeId)

        localStorage.setItem('favorites', JSON.stringify(favRecipes.value))
    } catch (error) {
        console.error('Error fetching favorites:', error)
    }
}


const isFavorite = computed(() =>
    recipe.value ? favRecipes.value.includes(recipe.value._id) : false
)

const addRecipeToFav = async (id: string) => {
    if (!favoriteListId) return

    try {
        await axios.post(
            `http://localhost:3000/favorite/${favoriteListId}/items`,
            { recipeId: id }
        )
        favRecipes.value.push(id)
        localStorage.setItem('favorites', JSON.stringify(favRecipes.value))
        console.log('Recipe added to favorites.')
    } catch (error) {
        console.error('Error adding recipe to favorites:', error)
    }
}

const removeRecipeFromFav = async (id: string) => {
    if (!favoriteListId) return

    try {
        await axios.delete(
            `http://localhost:3000/favorite/${favoriteListId}/items/${id}`
        )
        favRecipes.value = favRecipes.value.filter(favId => favId !== id)
        localStorage.setItem('favorites', JSON.stringify(favRecipes.value))
        console.log('Recipe removed from favorites.')
    } catch (error) {
        console.error('Error removing recipe from favorites:', error)
    }
}

onMounted(async () => {
    await Promise.all([fetchRecipe(), fetchFavorites()])
})
</script>


<template>
    <div class="favorite">
        <page-title title="Favorites" />
        <div class="favorite__content">
            <div v-if="isLoading">Loading favorite recipes...</div>
            <div v-else>
                <div v-if="recipeDetails.length > 0">
                    <div v-for="recipe in recipeDetails" :key="recipe._id">
                        <recipe-card
                            :img="recipe.thumb"
                            :title="recipe.title"
                            :description="recipe.description"
                            :time="recipe.time"
                            :id="recipe._id"
                            @remove="removeRecipe(recipe._id)"
                        />
                    </div>
                </div>
                <div v-else>
                    <p>No favorite recipes found.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

import PageTitle from '../templates/PageTitle.vue'
import RecipeCard from '../templates/RecipeCard.vue'

interface Recipe {
    _id: string
    title: string
    description: string
    time: string
    thumb: string
}

const recipeDetails = ref<Recipe[]>([])
const isLoading = ref(false)

const favoriteListId = localStorage.getItem('favoriteListId')

const fetchFavoriteRecipes = async () => {
    if (!favoriteListId) {
        console.error('Favorite list ID is not available')
        return
    }

    isLoading.value = true

    try {
        const { data: favoriteList } = await axios.get(
            `http://localhost:3000/favorite/${favoriteListId}/items`
        )

        if (favoriteList.items.length === 0) {
            console.log('No favorite recipes found in the list.')
            recipeDetails.value = []
            return
        }

        const responses = await Promise.all(
            favoriteList.items.map((itemId: string) =>
                axios.get(`http://localhost:3000/recipes/${itemId}`)
            )
        )

        recipeDetails.value = responses.map((response) => response.data)
    } catch (error) {
        console.error('Error fetching favorite recipes:', error)
    } finally {
        isLoading.value = false
    }
}

const removeRecipe = (id: string) => {
    recipeDetails.value = recipeDetails.value.filter(
        (recipe) => recipe._id !== id
    )

    axios
        .delete(`http://localhost:3000/favorite/${favoriteListId}/items/${id}`)
        .then(() => {
            console.log(`Recipe ${id} removed successfully`)
        })
        .catch((error) => {
            console.error('Error removing recipe:', error)
        })
}

onMounted(fetchFavoriteRecipes)
</script>

<style lang="scss" scoped>
.favorite {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
}
</style>

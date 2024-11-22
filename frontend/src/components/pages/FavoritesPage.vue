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
                <div v-else class="favorite__alt">
                    <img
                        src="/src/assets/images/favoritePage/favorite-mobile@1x.png"
                        alt="Empty list image"
                        class="favorite__image"
                        :srcset="`
                    /src/assets/images/favoritePage/favorite-mobile@1x.png 250w,
                    /src/assets/images/favoritePage/favorite-mobile@2x.png 500w,
                    /src/assets/images/favoritePage/favorite-tablet@1x.png 400w,
                    /src/assets/images/favoritePage/favorite-tablet@2x.png 800w,
                    /src/assets/images/favoritePage/favorite-desktop@1x.png 500w,
                    /src/assets/images/favoritePage/favorite-desktop@2x.png 1000w
                    `"
                        sizes="(max-width: 767px) 250px, 
                (min-width: 768px) and (max-width: 1099px) 400px, 
                (min-width: 1100px) 500px"
                    />
                    <h2 class="favorite__subtitle">Empty list...</h2>
                    <h3 class="favorite__text">Try adding some recipes!</h3>
                    <router-link to="/categories" class="favorite__link"
                        >Browse recipes</router-link
                    >
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

    &__alt {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        @media (min-width: 768px) {
            gap: 10px;
        }
    }

    &__subtitle {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--main-txt);
        transition: color 0.3s ease-in-out;

        @media (min-width: 768px) {
            font-size: 1.5rem;
        }
    }

    &__text {
        text-align: center;

        font-size: 0.875rem;
        font-weight: 400;

        color: var(--main-txt-transparent);
        transition: color 0.3s ease-in-out;

        @media (min-width: 768px) {
            font-size: 1.125rem;
        }
    }

    &__link {
        text-decoration: underline;
        font-size: 0.875rem;

        color: var(--main-accent);
        transition: color 0.3s ease-in-out;

        &:hover {
            color: var(--main-accent-hover);
        }

        @media (min-width: 768px) {
            font-size: 1.125rem;
        }
    }
}
</style>

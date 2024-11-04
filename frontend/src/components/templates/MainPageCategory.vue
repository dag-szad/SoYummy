<template>
    <div class="category">
        <h2 class="category__title">{{ categoryTitle }}</h2>
        <div class="category__recipes">
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
        <router-link :to="moreRecipes" class="category__button">
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

const getRecipeLimit = () => {
    const width = window.innerWidth
    if (width < 1100) {
        return 2
    } else {
        return 4
    }
}

const fetchRecipes = async () => {
    try {
        const limit = getRecipeLimit()
        const url = `${recipeUrl}/recipes/category/${categoryTitle}/${limit}`
        const response = await axios.get(url)
        recipes.value = response.data
    } catch (error) {
        console.error('Error fetching recipes:', error)
    }
}

const handleResize = () => {
    fetchRecipes()
}

onMounted(() => {
    fetchRecipes()
    window.addEventListener('resize', handleResize)
})
</script>

<style scoped lang="scss">
.category {
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: fit-content;

    @media (min-width: 768px) {
        gap: 40px;
        margin: 0 32px;
    }

    @media (min-width: 1100px) {
        gap: 50px;
        margin: 0 100px;
    }

    &__title {
        font-size: 1.75rem;
        font-weight: 600;
        color: var(--main-txt);
        transition: color 0.3s ease-in-out;

        @media (min-width: 768px) {
            font-size: 2rem;
        }

        @media (min-width: 1100px) {
            font-size: 2.75rem;
        }
    }

    &__recipes {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 32px;

        margin: 0 auto;

        @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 1100px) {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
        }
    }

    &__button {
        width: fit-content;
        align-self: flex-end;

        button {
            cursor: pointer;
            font-size: 0.875rem;
            color: var(--main-page-btn);

            background-color: var(--main-accent);
            border-radius: 6px;
            border: none;

            padding: 10px 20px;

            transition: background-color 0.3s ease-in-out;

            &:hover {
                background-color: var(--main-accent-hover);
            }

            @media (min-width: 768px) {
                font-size: 1rem;
            }
        }
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

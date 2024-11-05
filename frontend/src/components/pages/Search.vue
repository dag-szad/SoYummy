<template>
    <div class="search-page">
        <page-title title="Search" />
        <search-bar addon @recipes-fetched="handleRecipes" />

        <div v-if="recipes.length" class="search__recipes">
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

        <div v-else class="search__else">
            <img
                src="/src/assets/images/searchPage/search-mobile@1x.png"
                alt="Login page image"
                class="login__image"
                :srcset="`
                    /src/assets/images/searchPage/search-mobile@1x.png 250w,
                    /src/assets/images/searchPage/search-mobile@2x.png 500w,
                    /src/assets/images/searchPage/search-tablet@1x.png 450w,
                    /src/assets/images/searchPage/search-tablet@2x.png 900w,
                    /src/assets/images/searchPage/search-desktop@1x.png 550w,
                    /src/assets/images/searchPage/search-desktop@2x.png 1100w
                    `"
                sizes="(max-width: 767px) 250px, 
                        (min-width: 768px) and (max-width: 1099px) 450px, 
                        (min-width: 1100px) 550px"
            />
            <p>
                {{
                    searchFailed
                        ? 'Try something else...'
                        : 'Try looking for something...'
                }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageTitle from '../templates/PageTitle.vue'
import SearchBar from '../templates/SearchBar.vue'
import axios from 'axios'

interface Recipe {
    _id: string
    title: string
    thumb: string
}

const recipes = ref<Recipe[]>([])
const searchFailed = ref(false)
const route = useRoute()

const handleRecipes = (data: Recipe[]) => {
    recipes.value = data
    searchFailed.value = data.length === 0
}

onMounted(async () => {
    const { type, query } = route.query
    if (type && query) {
        try {
            const { data } = await axios.get(
                `http://localhost:3000/recipes/search/${type}/${query}`
            )
            handleRecipes(data)
        } catch {
            searchFailed.value = true
        }
    }
})
</script>

<style lang="scss" scoped>
.search-page {
    display: flex;
    flex-direction: column;
    gap: 40px;

    padding-bottom: 75px;

    @media (min-width: 768px) {
        padding-bottom: 100px;
    }
}

.search {
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

    &__else {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;

        font-size: 0.875rem;
        font-weight: 500;
        color: var(--main-txt-transparent);

        transition: color 0.3s ease-in-out;

        @media (min-width: 768px) {
            gap: 32px;
            font-size: 1.5rem;
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

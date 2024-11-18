<template>
    <div class="list">
        <page-title title="Shopping List" />
        <div v-if="shoppingList.length === 0" class="list__alt">
            <img
                src="/src/assets/images/shoppingListPage/list-mobile@1x.png"
                alt="Empty list image"
                class="list__image"
                :srcset="`
                    /src/assets/images/shoppingListPage/list-mobile@1x.png 250w,
                    /src/assets/images/shoppingListPage/list-mobile@2x.png 500w,
                    /src/assets/images/shoppingListPage/list-tablet@1x.png 400w,
                    /src/assets/images/shoppingListPage/list-tablet@2x.png 800w,
                    /src/assets/images/shoppingListPage/list-desktop@1x.png 500w,
                    /src/assets/images/shoppingListPage/list-desktop@2x.png 1000w
                    `"
                sizes="(max-width: 767px) 250px, 
                (min-width: 768px) and (max-width: 1099px) 400px, 
                (min-width: 1100px) 500px"
            />
            <h2 class="list__subtitle">Nothing here...</h2>
            <h3 class="list__text">
                Try adding some ingredients to your list!
            </h3>
            <router-link to="/categories" class="list__link"
                >Browse recipes</router-link
            >
        </div>
        <div v-else>
            <ul class="ing__titles">
                <li>Ingredients</li>
                <li>Number</li>
                <li>Remove</li>
            </ul>
            <ul class="ing__list">
                <li
                    v-for="(ingredient, index) in ingredientDetails"
                    :key="ingredient._id"
                    class="ing__item"
                >
                    <div class="ing__header">
                        <img :src="ingredient.thb" alt="" class="ing__img" />
                        <h3 class="ing__title">{{ ingredient.ttl }}</h3>
                    </div>
                    <p class="ing__amount">
                        {{ shoppingList[index].measure }}
                    </p>
                    <svg
                        class="list__icon"
                        @click="deleteIngredient(ingredient._id, index)"
                    >
                        <use
                            href="../../assets/icons/icons.svg#cancel-icon"
                        ></use>
                    </svg>
                </li>
            </ul>
            <button @click="deleteAllIngredients">Delete all list items</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

import PageTitle from '../templates/PageTitle.vue'

const shoppingListId = localStorage.getItem('shoppingListId')

interface Ingredient {
    _id: string
    ttl: string
    thb?: string
}

const ingredientDetails = ref<Ingredient[]>([])
const shoppingList = ref<
    Array<{ id: string; measure: string; isPurchased: boolean }>
>([])

const fetchShoppingList = async () => {
    if (!shoppingListId) {
        console.error('Shopping list ID is not available')
        return
    }

    try {
        const response = await axios.get(
            `http://localhost:3000/list/${shoppingListId}`
        )
        shoppingList.value = response.data.items
        fetchIngredients()
    } catch (error) {
        console.error('Error fetching shopping list:', error)
    }
}

const fetchIngredients = async () => {
    if (!shoppingList.value || shoppingList.value.length === 0) {
        console.error('No shopping list provided')
        return
    }

    try {
        const responses = await Promise.all(
            shoppingList.value.map((listElement) =>
                axios.get(`http://localhost:3000/ingredient/${listElement.id}`)
            )
        )

        ingredientDetails.value = responses.map((response) => response.data)
    } catch (error) {
        console.error('Error fetching ingredients:', error)
    }
}

const deleteIngredient = async (ingredientId: string, index: number) => {
    if (!shoppingListId) {
        console.error('Shopping list ID is not available')
        return
    }

    try {
        await axios.delete(
            `http://localhost:3000/list/${shoppingListId}/items/${ingredientId}`
        )

        shoppingList.value.splice(index, 1)
        ingredientDetails.value.splice(index, 1)
    } catch (error) {
        console.error('Error deleting ingredient:', error)
    }
}

const deleteAllIngredients = async () => {
    if (!shoppingListId) {
        console.error('Shopping list ID is not available')
        return
    }

    try {
        await axios.delete(`http://localhost:3000/list/${shoppingListId}/items`)

        shoppingList.value = []
        ingredientDetails.value = []
    } catch (error) {
        console.error('Error deleting list:', error)
    }
}

onMounted(() => {
    fetchShoppingList()
})
</script>

<style lang="scss" scoped>
.list {
    display: flex;
    flex-direction: column;
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

    &__icon {
        cursor: pointer;

        width: 20px;
        height: 20px;

        stroke: var(--recipe-txt);

        @media (min-width: 768px) {
            width: 25px;
            height: 25px;
        }
    }
}
</style>

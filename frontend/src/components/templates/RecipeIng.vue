<template>
    <div class="ing">
        <ul class="ing__titles">
            <li>Ingredients</li>
            <li>Number</li>
            <li>Add to list</li>
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
                    {{ props.ingredients[index].measure }}
                </p>
                <div class="ing__actions">
                    <button
                        :class="{
                            ing__btn: true,
                            ing__add: !isIngredientInList(ingredient._id),
                            ing__delete: isIngredientInList(ingredient._id),
                        }"
                        @click="
                            isIngredientInList(ingredient._id)
                                ? removeIngredientFromList(ingredient._id)
                                : addIngredientToList(
                                      ingredient._id,
                                      props.ingredients[index].measure
                                  )
                        "
                    >
                        <svg
                            v-if="isIngredientInList(ingredient._id)"
                            class="ing__icon"
                        >
                            <use
                                href="../../assets/icons/icons.svg#check-icon"
                            ></use>
                        </svg>
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps<{
    ingredients: Array<{
        id: string
        measure: string
    }>
}>()

interface Ingredient {
    _id: string
    ttl: string
    desc?: string
    thb?: string
}

interface ShoppingListItem {
    id: string
    measure: string
}

const ingredientDetails = ref<Ingredient[]>([])
const shoppingList = ref<ShoppingListItem[]>([])

const fetchIngredients = async () => {
    try {
        const responses = await Promise.all(
            props.ingredients.map((ingredient) =>
                axios.get(`http://localhost:3000/ingredient/${ingredient.id}`)
            )
        )

        ingredientDetails.value = responses.map((response) => response.data)
    } catch (error) {
        console.error('Error fetching ingredients:', error)
    }
}

const fetchShoppingList = async () => {
    const shoppingListId = localStorage.getItem('shoppingListId')

    if (!shoppingListId) {
        console.error('Shopping list ID is not available')
        return
    }

    try {
        const response = await axios.get(
            `http://localhost:3000/list/${shoppingListId}/items`
        )
        shoppingList.value = response.data
    } catch (error) {
        console.error('Error fetching shopping list:', error)
    }
}

const addIngredientToList = async (ingredientId: string, measure: string) => {
    const shoppingListId = localStorage.getItem('shoppingListId')

    if (!shoppingListId) {
        console.error('Shopping list ID is not available')
        return
    }

    try {
        await axios.post(`http://localhost:3000/list/${shoppingListId}/items`, {
            ingredientId,
            measure,
        })

        console.log(`Ingredient ${ingredientId} added to the shopping list.`)
        shoppingList.value.push({ id: ingredientId, measure })
    } catch (error) {
        console.error('Error adding ingredient to list:', error)
    }
}

const removeIngredientFromList = async (ingredientId: string) => {
    const shoppingListId = localStorage.getItem('shoppingListId')

    if (!shoppingListId) {
        console.error('Shopping list ID is not available')
        return
    }

    try {
        await axios.delete(
            `http://localhost:3000/list/${shoppingListId}/items/${ingredientId}`
        )

        console.log(
            `Ingredient ${ingredientId} removed from the shopping list.`
        )
        shoppingList.value = shoppingList.value.filter(
            (item) => item.id !== ingredientId
        )
    } catch (error) {
        console.error('Error removing ingredient from list:', error)
    }
}

const isIngredientInList = (ingredientId: string) => {
    return shoppingList.value.some((item) => item.id === ingredientId)
}

onMounted(async () => {
    await fetchIngredients()
    await fetchShoppingList()
})
</script>

<style lang="scss" scope>
.ing {
    margin: 200px auto 50px;
    max-width: 1240px;

    @media (min-width: 768px) {
        margin: 150px auto 100px;
    }

    &__titles {
        display: flex;
        justify-content: space-between;
        gap: 20px;

        background-color: var(--main-accent);
        border-radius: 8px;

        color: var(--main-btn-txt);
        font-size: 0.625rem;
        font-weight: 600;

        list-style: none;

        padding: 12px 14px;
        margin-bottom: 24px;

        li:first-child {
            flex-grow: 2;
        }

        @media (min-width: 768px) {
            gap: 40px;
            font-size: 1.125rem;
            padding: 21px 32px;
            margin-bottom: 32px;
        }

        @media (min-width: 1100px) {
            gap: 110px;
            padding: 21px 40px;
            margin-bottom: 50px;
        }
    }

    &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 32px;

        background-color: var(--recipe-bg);
        border-radius: 8px;

        list-style: none;

        padding: 12px 14px;
        margin-top: 16px;

        div:first-child {
            flex-grow: 2;
        }

        @media (min-width: 768px) {
            gap: 40px;
            font-size: 1.125rem;
            padding: 21px 32px;
            margin-top: 24px;
        }

        @media (min-width: 1100px) {
            gap: 110px;
            padding: 21px 40px;
        }
    }

    &__header {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    &__img {
        width: 65px;
        height: 65px;
    }

    &__title {
        color: var(--recipe-txt);
        font-size: 0.75rem;
        font-weight: 400;

        @media (min-width: 768px) {
            font-size: 1.5rem;
        }
    }

    &__amount {
        background-color: var(--main-accent);
        border-radius: 4px;

        color: var(--main-btn-txt);
        font-size: 0.625rem;
        font-weight: 500;

        padding: 4px 8px;

        @media (min-width: 768px) {
            font-size: 1.125rem;
        }
    }

    &__actions {
        display: flex;
        align-items: center;
    }

    &__btn {
        cursor: pointer;
        background-color: transparent;
        border-radius: 4px;
        border: solid 2px;
        width: 23px;
        height: 23px;

        &.ing__add {
            border-color: #7e7e7e;
        }

        &.ing__delete {
            background-color: var(--main-accent);
            border-color: var(--main-accent);
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    &__icon {
        fill: white;
        width: 15px;
        height: 15px;
    }
}
</style>

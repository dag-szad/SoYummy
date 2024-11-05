<template>
    <div class="component">
        <form @submit.prevent="getRecipes" class="search">
            <input
                type="text"
                v-model="input"
                class="search__bar"
                :placeholder="placeholder"
            />
            <button type="submit" class="search__button">Search</button>
        </form>

        <div v-if="addon" class="addon">
            <h3 class="addon__title">Search by:</h3>
            <div class="addon__dropdown">
                <button class="addon__button" @click="toggleDropdown">
                    {{ selectedOption }}
                    <svg class="addon__icon">
                        <use
                            href="../../assets/icons/icons.svg#alt-arrow-down-icon"
                        ></use>
                    </svg>
                </button>
                <div v-if="isDropdownOpen" class="addon__content">
                    <button
                        v-for="opt in options"
                        :key="opt"
                        @click="selectOption(opt)"
                        class="addon__option"
                    >
                        {{ opt }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const props = defineProps({
    option: { type: String, default: 'Title' },
    addon: { type: Boolean, default: false },
})

const emit = defineEmits(['recipes-fetched'])

const placeholders = [
    'Search recipes...',
    'Find ingredients...',
    'Try "pasta"...',
    'Look up meals...',
    'Find ideas...',
    'Quick search...',
    'Type a keyword...',
]

const placeholder = ref('')
const input = ref('')
const selectedOption = ref(props.option)
const isDropdownOpen = ref(false)
const options = ['Title', 'Ingredients']
const router = useRouter()
const recipesUrl = 'http://localhost:3000'

const getRandomPlaceholder = () => {
    const randomIndex = Math.floor(Math.random() * placeholders.length)
    return placeholders[randomIndex]
}

onMounted(() => {
    placeholder.value = getRandomPlaceholder()
})

const getRecipes = async () => {
    if (!input.value) return

    const searchType =
        selectedOption.value.toLowerCase() === 'title' ? 'title' : 'ingredient'
    const searchUrl = `${recipesUrl}/recipes/search/${searchType}/${input.value}`

    try {
        const { data } = await axios.get(searchUrl)
        emit('recipes-fetched', data)
        router.push({
            path: '/search',
            query: { type: searchType, query: input.value },
        })
    } catch (error) {
        console.error('Error fetching recipes:', error)
    }
}

const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value)
const selectOption = (option: string) => {
    selectedOption.value = option
    isDropdownOpen.value = false
}
</script>

<style lang="scss" scoped>
.component {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    position: relative;
    z-index: 1;
}

.search {
    background-color: var(--search-form-bg);
    border: 1px solid var(--search-form-border);
    border-radius: 24px 44px;

    transition: all 0.3s ease-in-out;

    &__bar {
        width: 120px;
        padding: 10px 0 10px 32px;

        background: none;
        border: none;
        outline: none;

        font-size: 0.875rem;
        font-weight: 400;
        color: var(--main-txt);

        transition: color 0.3s ease-in-out;

        @media (min-width: 768px) {
            font-size: 1rem;
            width: 200px;
        }

        @media (min-width: 1100px) {
            width: 250px;
        }
    }

    &__button {
        cursor: pointer;

        background-color: var(--main-accent);
        border: 1px solid var(--main-accent);
        border-radius: 24px 44px;

        font-size: 0.875rem;
        font-weight: 400;
        color: var(--search-btn-txt);

        padding: 16px 32px;

        transition: all 0.3s ease-in-out;

        &:hover {
            background-color: var(--main-accent-hover);
            border-color: var(--main-accent-hover);
        }
    }
}

.addon {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;

    @media (min-width: 768px) {
        gap: 18px;
    }

    &__title {
        font-size: 0.75rem;
        font-weight: 500;

        color: var(--main-txt);
        transition: color 0.3s ease-in-out;

        @media (min-width: 768px) {
            font-size: 0.875rem;
        }

        @media (min-width: 1100px) {
            font-size: 1.125rem;
        }
    }

    &__dropdown {
        position: relative;
    }

    &__button {
        cursor: pointer;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        width: 150px;
        height: 35px;
        padding: 10px;

        background-color: var(--search-pick-bg);
        border: 1px solid var(--search-pick-border);
        border-radius: 6px;

        font-size: 0.813rem;
        font-weight: 500;
        color: var(--search-pick-txt);

        transition: all 0.3s ease-in-out;

        @media (min-width: 768px) {
            font-size: 0.875rem;
            width: 175px;
            height: 40px;
        }

        @media (min-width: 1100px) {
            width: 200px;
            height: 50px;
            padding: 15px;
        }
    }

    &__icon {
        width: 20px;
        height: 20px;
    }

    &__content {
        position: absolute;

        display: flex;
        flex-direction: column;

        width: 100%;

        background-color: var(--search-pick-bg);
        border: 1px solid var(--search-pick-border);
        border-radius: 6px;
    }

    &__option {
        cursor: pointer;

        text-align: left;
        width: 150px;
        height: 35px;
        padding: 10px;

        background-color: var(--search-pick-bg);
        border-radius: 6px;
        border: none;

        font-size: 0.813rem;
        font-weight: 500;
        color: var(--search-pick-txt);

        transition: all 0.3s ease-in-out;

        &:hover {
            background-color: var(--search-pick-bg-hover);
        }

        @media (min-width: 768px) {
            font-size: 0.875rem;
            width: 175px;
            height: 40px;
        }

        @media (min-width: 1100px) {
            width: 200px;
            height: 50px;
            padding: 15px;
        }
    }
}
</style>

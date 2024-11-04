<template>
    <div class="search">
        <input type="text" class="search__bar" />
        <button class="search__button">Search</button>
    </div>
    <div class="addon" v-if="addon">
        <h3>Search by:</h3>
        <button class="addon__button" @click="toggleDropdown">
            {{ selectedOption }}
        </button>
        <div class="addon__content" v-if="isDropdownOpen">
            <button
                class="addon__option"
                v-for="opt in options"
                :key="opt"
                @click="selectOption(opt)"
            >
                {{ opt }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps({
    option: {
        type: String,
        default: 'Title',
        required: true,
    },
    addon: {
        type: Boolean,
        default: false,
    },
})

const selectedOption = ref(props.option)
const isDropdownOpen = ref(false)
const options = ['Title', 'Ingredients']

function selectOption(option: string) {
    selectedOption.value = option
    isDropdownOpen.value = false
}

function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value
}
</script>

<style lang="scss" scoped></style>

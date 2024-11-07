<template>
    <ul>
        <li
            v-for="category in categories"
            :key="category._id"
            @click="categorySelect(category)"
            :class="{
                active: selectedCategory && selectedCategory === category.title,
            }"
        >
            {{ category.title }}
        </li>
    </ul>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import axios from 'axios'

interface Category {
    _id: string
    title: string
}

const props = defineProps({
    selectedCategory: String,
})

const categories = ref<Category[]>([])
const emit = defineEmits(['category-selected'])

const fetchCategories = async () => {
    try {
        const url = 'http://localhost:3000/categories'
        const response = await axios.get(url)
        categories.value = response.data
    } catch (error) {
        console.error('Error fetching categories:', error)
    }
}

const categorySelect = (category: Category) => {
    emit('category-selected', category.title)
}

onMounted(() => {
    fetchCategories()
})
</script>

<style lang="scss" scoped>
.active {
    color: var(--main-accent);
}
</style>

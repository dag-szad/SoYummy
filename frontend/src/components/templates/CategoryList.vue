<template>
    <div
        class="list-container"
        @mousedown="startDragging"
        @mousemove="handleDragging"
        @mouseup="stopDragging"
        @mouseleave="stopDragging"
    >
        <ul
            class="list"
            :style="{ transform: 'translateX(' + listOffsetX + 'px)' }"
            ref="listElement"
        >
            <li
                v-for="category in categories"
                :key="category._id"
                @click="categorySelect(category)"
                :class="[
                    'list__item',
                    {
                        active:
                            selectedCategory &&
                            selectedCategory === category.title,
                    },
                ]"
            >
                {{ category.title }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, nextTick } from 'vue'
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

const isDragging = ref(false)
const startX = ref(0)
const startOffsetX = ref(0)
const listOffsetX = ref(0)
const listElement = ref<HTMLElement | null>(null)

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

const startDragging = (e: MouseEvent) => {
    if (!listElement.value) return
    isDragging.value = true
    startX.value = e.pageX
    startOffsetX.value = listOffsetX.value
}

const stopDragging = () => {
    isDragging.value = false
}

const handleDragging = (e: MouseEvent) => {
    if (!isDragging.value || !listElement.value) return

    const distance = e.pageX - startX.value
    const newOffsetX = startOffsetX.value + distance

    const containerWidth = listElement.value.parentElement?.clientWidth || 0
    const listWidth = listElement.value.scrollWidth

    const maxOffsetX = 0
    const minOffsetX = containerWidth - listWidth

    listOffsetX.value = Math.min(Math.max(newOffsetX, minOffsetX), maxOffsetX)
}

onMounted(() => {
    fetchCategories()
})
</script>

<style lang="scss" scoped>
.list-container {
    cursor: grab;

    overflow: hidden;
    user-select: none;

    border-bottom: solid 1px var(--category-list);

    &.active {
        cursor: grabbing;
    }
}

.list {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    list-style: none;
    padding: 10px 30px 0 30px;
    white-space: nowrap;

    transition: transform 0s linear;

    &__item {
        cursor: pointer;
        padding-bottom: 32px;
        color: var(--category-list);
        transition: color 0.3s ease-in-out;

        &:hover {
            color: var(--main-accent);
        }
    }
}

.active {
    padding-bottom: 31px;
    color: var(--main-accent);
    border-bottom: solid 2px var(--main-accent);
}
</style>

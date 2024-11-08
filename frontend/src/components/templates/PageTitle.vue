<template>
    <h2 class="title">{{ title }}</h2>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
    title: {
        type: String,
        required: true,
    },
})
</script>

<style lang="scss" scoped>
.title {
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
</style>

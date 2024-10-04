<template>
    <button @click="toggleTheme">
        {{ theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
    </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const theme = ref(localStorage.getItem('theme') || 'light')

const toggleTheme = (): void => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    document.body.className = theme.value
    localStorage.setItem('theme', theme.value)
}
</script>

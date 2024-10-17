<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from './store/index'

const userStore = useUserStore()

onMounted(() => {
    userStore.loadUserData()
})
</script>

<template>
    <router-view />
</template>

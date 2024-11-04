<template>
    <div class="search-page">
        <page-title title="Search" />
        <search-bar addon />
    </div>
</template>

<script setup lang="ts">
import PageTitle from '../templates/PageTitle.vue'
import SearchBar from '../templates/SearchBar.vue'
</script>

<style lang="scss" scoped>
.search-page {
    display: flex;
    flex-direction: column;
    gap: 40px;
}
</style>

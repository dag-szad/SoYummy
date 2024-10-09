<template>
    <div class="shared-layout">
        <header>
            <header-component></header-component>
        </header>

        <main>
            <router-view />
        </main>

        <footer>
            <footer-component></footer-component>
        </footer>
    </div>
</template>

<script lang="ts" setup>
import HeaderComponent from '../templates/HeaderComponent.vue'
import FooterComponent from '../templates/FooterComponent.vue'
</script>

<style lang="scss" scoped>
.shared-layout {
    background-color: var(--main-bg);
}
</style>

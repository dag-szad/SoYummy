<template>
    <div>
        <input
            type="checkbox"
            id="darkmode-toggle"
            class="toggle__input"
            @change="emitThemeChange"
            :checked="theme === 'dark'"
        />
        <label for="darkmode-toggle" class="toggle"></label>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'light')

const emitThemeChange = () => {
    const event = new Event('themeChange')
    document.dispatchEvent(event)
}
</script>

<style lang="scss" scoped>
.toggle {
    width: 60px;
    height: 30px;
    position: relative;
    display: block;
    background-color: #efefef;
    border-radius: 15px;
    box-shadow: inset 0px 5px 15px -5px rgba($color: #000000, $alpha: 0.4);
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:after {
        content: '';
        width: 22px;
        height: 22px;
        position: absolute;
        top: 4px;
        left: 4px;
        background-color: #fff;
        border-radius: 50%;
        transition: 0.2s ease-in-out;
    }

    &__input {
        width: 0;
        height: 0;
        visibility: hidden;

        &:checked + .toggle {
            background-color: var(--main-green);
        }
        &:checked + .toggle:after {
            left: 33px;
        }
    }
}
</style>

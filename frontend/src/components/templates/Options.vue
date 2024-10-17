<template>
    <div :class="['options', { 'options--open': isOptionsOpen }]">
        <button class="options__button button-transparent" @click="toggleEdit">
            Edit profile
            <svg class="options__icon">
                <use href="../../assets/icons/icons.svg#edit-icon"></use>
            </svg>
        </button>
        <button class="options__button button-green" @click="toggleLogout">
            Logout
            <svg class="options__icon">
                <use href="../../assets/icons/icons.svg#arrow-right-icon"></use>
            </svg>
        </button>
    </div>
    <Modal
        :isLogoutOpen="isLogoutOpen"
        :isEditOpen="isEditOpen"
        @closeModal="closeAllModals"
    />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Modal from './Modal.vue'

defineProps({
    isOptionsOpen: {
        type: Boolean,
        default: false,
    },
})

const isLogoutOpen = ref(false)
const isEditOpen = ref(false)

const toggleLogout = () => {
    isLogoutOpen.value = true
    isEditOpen.value = false
}

const toggleEdit = () => {
    isEditOpen.value = true
    isLogoutOpen.value = false
}

const closeAllModals = () => {
    isLogoutOpen.value = false
    isEditOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
    const modalElement = document.querySelector('.modal')
    const optionsElement = document.querySelector('.options')

    if (
        optionsElement &&
        !optionsElement.contains(event.target as Node) &&
        modalElement &&
        !modalElement.contains(event.target as Node)
    ) {
        closeAllModals()
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="scss">
.options {
    position: absolute;
    z-index: 1;
    top: 75px;
    right: 50px;

    pointer-events: none;
    visibility: hidden;
    opacity: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;

    padding: 18px;

    background-color: var(--main-bg);
    border-radius: 10px;

    transition: all 0.3s ease-in-out;

    &--open {
        pointer-events: auto;
        visibility: visible;
        opacity: 1;
    }

    &__button {
        cursor: pointer;

        padding: 12px 24px;

        border-radius: 24px 44px;

        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    }

    &__icon {
        width: 20px;
        height: 20px;
    }
}

.button-transparent {
    border: 1px solid var(--options-btn-transparent);
    color: var(--options-btn-transparent);
    background: none;

    transition: all 0.3s ease-in-out;

    svg {
        fill: var(--options-btn-transparent);
        transition: fill 0.3s ease-in-out;
    }

    &:hover {
        background-color: var(--options-btn-green);
        border-color: var(--options-btn-green);
        color: var(--options-btn-txt);

        svg {
            fill: var(--options-btn-txt);
        }
    }
}
.button-green {
    border: 1px solid var(--options-btn-green);
    background-color: var(--main-accent);
    color: var(--options-btn-txt);

    transition: all 0.3s ease-in-out;

    svg {
        stroke: var(--options-btn-txt);
    }

    &:hover {
        background-color: var(--main-accent-hover);
        border-color: var(--main-accent-hover);
    }
}
</style>

<template>
    <div class="profile" @click="toggleOptions">
        <div class="profile__photo">
            <img
                v-if="profilePicture"
                :src="profilePicture"
                alt="User's profile picture"
            />
        </div>
        <p class="profile__username">{{ username }}</p>
    </div>
    <options :isOptionsOpen="isOptionsOpen" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '../../store/index'

import Options from './Options.vue'

const userStore = useUserStore()

const profilePicture = computed(() => userStore.profilePicture || '')
const username = computed(() => userStore.username || 'Guest')

const isOptionsOpen = ref(false)

const toggleOptions = () => {
    isOptionsOpen.value = !isOptionsOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
    const optionsElement = document.querySelector('.options')
    const profileElement = document.querySelector('.profile')

    if (
        optionsElement &&
        !optionsElement.contains(event.target as Node) &&
        profileElement &&
        !profileElement.contains(event.target as Node)
    ) {
        isOptionsOpen.value = false
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
.profile {
    display: flex;
    align-items: center;
    gap: 10px;

    cursor: pointer;

    &__photo {
        background-image: url('../../assets/images/profilePicture/profile-picture-bg.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        width: 34px;
        height: 34px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
        }

        @media (min-width: 768px) {
            width: 44px;
            height: 44px;
        }
    }

    &__username {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--main-txt);

        @media (min-width: 768px) {
            font-size: 0.875rem;
        }
    }
}
</style>

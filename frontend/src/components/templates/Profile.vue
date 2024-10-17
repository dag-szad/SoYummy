<template>
    <div class="profile">
        <div class="profile__photo">
            <img
                v-if="profilePicture"
                :src="profilePicture"
                alt="User's profile picture"
            />
        </div>
        <p class="profile__username">{{ username }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '../../store/index'

const userStore = useUserStore()

const profilePicture = computed(() => userStore.profilePicture || '')
const username = computed(() => userStore.username || 'Guest')
</script>

<style scoped lang="scss">
.profile {
    display: flex;
    align-items: center;
    gap: 14px;

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

<template>
    <div class="profile">
        <img
            v-if="profilePictureUrl"
            :src="profilePictureUrl"
            alt="User's profile picture"
            class="profile__photo"
        />
        <img
            v-else
            src="../../assets/images/profilePicture/profile-picture-bg.png"
            alt="Default profile background"
            class="profile__photo"
        />

        <p class="profile__username">{{ username }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps({
    profilePictureUrl: {
        type: String,
        default: '',
    },
    username: {
        type: String,
        required: true,
    },
})
</script>

<style scoped lang="scss">
.profile {
    display: flex;
    align-items: center;
    gap: 14px;

    &__photo {
        background-repeat: no-repeat;
        background-position: center;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
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

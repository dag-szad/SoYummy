<template>
    <div class="profile">
        <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Profile photo"
            class="profile__photo"
        />
        <p class="profile__username">Name</p>
    </div>
</template>

<style scoped lang="scss">
.profile {
    display: flex;
    align-items: center;
    gap: 14px;

    &__photo {
        width: 34px;
        border-radius: 50%;

        @media (min-width: 768px) {
            width: 44px;
        }
    }

    &__username {
        font-size: 0.75rem;
        font-weight: 600;

        @media (min-width: 768px) {
            font-size: 0.875rem;
        }
    }
}
</style>

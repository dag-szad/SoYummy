<template>
    <div :class="['modal', { 'modal--open': isLogoutOpen || isEditOpen }]">
        <svg class="modal__icon" @click="closeModal">
            <use href="../../assets/icons/icons.svg#cancel-icon"></use>
        </svg>

        <div class="modal__content" v-if="modalType === 'logout'">
            <p>Are you sure you want to log out?</p>
            <div class="modal__buttons">
                <button @click="logout" class="green-btn">Log out</button>
                <button @click="closeModal" class="gray-btn">Cancel</button>
            </div>
        </div>

        <div class="modal__content" v-else-if="modalType === 'edit'">
            <EditPhoto @profilePictureSelected="handleProfilePictureSelected" />
            <form class="input" @submit.prevent="saveChanges">
                <div class="input__container">
                    <svg class="input__icon">
                        <use
                            href="../../assets/icons/icons.svg#user-icon"
                        ></use>
                    </svg>
                    <input
                        id="username"
                        type="text"
                        placeholder="New username"
                        v-model="newUsername"
                    />
                </div>
                <button class="input__button green-btn" type="submit">
                    Save changes
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '../../store/index'
import axiosInstance from '../../services/axiosInstance'

import EditPhoto from './EditPhoto.vue'

const props = defineProps({
    isLogoutOpen: {
        type: Boolean,
        default: false,
    },
    isEditOpen: {
        type: Boolean,
        default: false,
    },
})

const modalType = computed(() => {
    if (props.isLogoutOpen) return 'logout'
    if (props.isEditOpen) return 'edit'
    return null
})

const emit = defineEmits(['closeModal'])
const closeModal = () => {
    emit('closeModal')
}

const router = useRouter()
const logout = async () => {
    try {
        await axiosInstance.post('auth/logout')
        const userStore = useUserStore()
        userStore.clearUserData()
        router.push('/')
        closeModal()
    } catch (error) {
        console.error('Logout failed:', error)
    }
}

const newUsername = ref('')
const newProfilePictureFile = ref<File | null>(null)

const handleProfilePictureSelected = (file: File) => {
    newProfilePictureFile.value = file
}

const saveChanges = async () => {
    const userStore = useUserStore()
    const userId = userStore.userId

    if (!newUsername.value) {
        console.error('Username cannot be empty')
        return
    }

    if (!userId) {
        console.error('User ID is not available')
        return
    }

    try {
        await axiosInstance.post('/users/update-username', {
            userId: userId,
            username: newUsername.value,
        })
        userStore.updateUsername(newUsername.value)
        console.log('New username:', newUsername.value)

        if (newProfilePictureFile.value) {
            const formData = new FormData()
            formData.append('userId', userId)
            formData.append('profilePicture', newProfilePictureFile.value)

            await axiosInstance.post('/users/update-photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log('New profile picture uploaded')
        }

        closeModal()
    } catch (error) {
        console.error('Profile update failed:', error)
    }
}
</script>

<style scoped lang="scss">
.modal {
    position: absolute;
    z-index: 1;

    top: 50%;
    transform: translate(0, -50%);
    left: 0;
    right: 0;

    width: fit-content;
    margin: 0 auto;
    padding: 18px;

    background-color: var(--modal-bg);
    border-radius: 24px;

    display: flex;
    flex-direction: column;
    align-items: end;

    font-size: 0.875rem;
    color: var(--main-txt);

    pointer-events: none;
    visibility: hidden;
    opacity: 0;

    transition: all 0.3s ease-in-out;

    &--open {
        pointer-events: auto;
        visibility: visible;
        opacity: 1;
    }

    @media (min-width: 768px) {
        font-size: 1.125rem;
        padding: 24px;
    }

    &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;

        padding: 6px;

        max-width: 280px;

        @media (min-width: 768px) {
            gap: 32px;

            width: 400px;
            max-width: 400px;
        }
    }

    &__icon {
        cursor: pointer;

        stroke: var(--main-txt);
        width: 20px;
        height: 20px;

        @media (min-width: 768px) {
            width: 24px;
            height: 24px;
        }
    }

    &__buttons {
        width: 100%;

        display: flex;
        justify-content: space-between;
        gap: 8px;

        @media (min-width: 768px) {
            gap: 16px;
        }

        button {
            width: 100%;
            height: 40px;

            font-size: 0.875rem;

            @media (min-width: 768px) {
                height: 50px;
                font-size: 1rem;
            }
        }
    }
}

.input {
    width: 100%;
    max-width: 280px;

    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (min-width: 768px) {
        width: 400px;
        max-width: 400px;

        gap: 32px;
    }

    &__container {
        display: flex;
        align-items: center;
        gap: 8px;

        padding: 0 16px;
        height: 40px;

        border-radius: 5px;
        border: 1px solid var(--options-form-border);

        transition: border-color 0.3s ease-in-out;

        &:hover,
        &:active,
        &:focus-within {
            border-color: var(--main-txt);
            .input__icon {
                color: var(--main-txt);
            }
        }

        @media (min-width: 768px) {
            height: 50px;
            gap: 16px;
        }

        input {
            border: none;
            outline: none;
            background: transparent;

            color: var(--main-txt);
            flex: 1;
        }
    }

    &__icon {
        stroke: var(--main-txt);
        width: 18px;
        height: 18px;

        @media (min-width: 768px) {
            width: 20px;
            height: 20px;
        }
    }

    &__button {
        width: 100%;
        height: 40px;

        @media (min-width: 768px) {
            height: 50px;
        }
    }
}

.green-btn {
    cursor: pointer;

    border: none;
    border-radius: 5px;

    background-color: var(--main-accent);
    color: var(--modal-btn-txt);
    font-size: 0.875rem;

    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: var(--main-accent-hover);
    }

    @media (min-width: 768px) {
        font-size: 1rem;
    }
}
.gray-btn {
    cursor: pointer;

    border: none;
    border-radius: 5px;

    background-color: var(--modal-btn);
    color: var(--modal-btn-txt);
    font-size: 0.875rem;

    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: var(--main-accent);
    }

    @media (min-width: 768px) {
        font-size: 1rem;
    }
}
</style>

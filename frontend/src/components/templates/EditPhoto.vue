<template>
    <div class="edit" @click="triggerFileInput">
        <div class="photo">
            <img
                v-if="localImageUrl"
                :src="localImageUrl"
                alt="User's profile picture"
            />
        </div>
        <div class="add">
            <svg class="add__icon">
                <use href="../../assets/icons/icons.svg#cancel-icon"></use>
            </svg>
        </div>
        <input
            type="file"
            ref="fileInput"
            accept="image/*"
            @change="handleFileChange"
            style="display: none"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits()

const fileInput = ref<HTMLInputElement | null>(null)
const localImageUrl = ref<string | null>(null)

const triggerFileInput = () => {
    fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files ? input.files[0] : null
    if (file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif']
        if (!validTypes.includes(file.type)) {
            alert('Please select a valid image file (JPEG, PNG, GIF).')
            localImageUrl.value = null
            return
        }
        localImageUrl.value = URL.createObjectURL(file)
        emit('profilePictureSelected', file)
    }
}
</script>

<style scoped lang="scss">
.edit {
    position: relative;
    cursor: pointer;

    &:hover {
        .add {
            background-color: var(--main-accent-hover);
        }
    }
}
.photo {
    position: relative;
    background-image: url('../../assets/images/profilePicture/profile-photo-bg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    width: 80px;
    height: 80px;
    border-radius: 50%;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }

    @media (min-width: 768px) {
        width: 100px;
        height: 100px;
    }
}

.add {
    background-color: var(--main-accent);
    border-radius: 50%;
    width: 24px;
    height: 24px;

    position: absolute;
    bottom: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color 0.3s ease-in-out;

    &__icon {
        stroke: var(--modal-btn-txt);
        transform: rotate(45deg);
        width: 20px;
        height: 20px;
    }
}
</style>

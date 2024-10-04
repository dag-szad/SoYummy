<template>
    <div class="form">
        <h1>{{ formTitle }}</h1>
        <form @submit.prevent="handleSubmit" class="form__inputs">
            <div v-if="isRegister">
                <label for="username">Name</label>
                <input
                    id="username"
                    type="text"
                    v-model="username"
                    placeholder="Name"
                />
            </div>

            <label for="email">Email</label>
            <input
                id="email"
                type="email"
                v-model="email"
                placeholder="Email"
            />

            <label for="password">Password</label>
            <input
                id="password"
                type="password"
                v-model="password"
                placeholder="Password"
            />

            <main-button
                :button-title="buttonTitle"
                shape="square"
                type="green"
                theme="light"
                size="large"
                aria-label="Submit the form"
            ></main-button>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import MainButton from './MainButton.vue'

const router = useRouter()

const props = defineProps({
    destination: {
        type: String,
        required: true,
        validator: (value: string) =>
            ['login', 'register'].includes(value.toLowerCase()),
    },
})

const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const errorMessage = ref<string>('')

const isRegister = computed(
    () => props.destination.toLowerCase() === 'register'
)
const formTitle = computed(() =>
    isRegister.value ? 'Registration' : 'Sign In'
)
const buttonTitle = computed(() => (isRegister.value ? 'Sign up' : 'Sign in'))

const handleSubmit = async () => {
    try {
        const endpoint = isRegister.value ? '/register' : '/login'
        const payload = {
            email: email.value,
            password: password.value,
            ...(isRegister.value && { username: username.value }),
        }

        const response = await axios.post(
            `http://localhost:3000${endpoint}`,
            payload
        )

        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            console.log(
                `${isRegister.value ? 'Registration' : 'Login'} successful`
            )
            router.push('/main')
        } else {
            console.log(response.data.message)
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            errorMessage.value =
                error.response.data?.message || 'An error occurred'
        } else {
            errorMessage.value = 'An unexpected error occurred'
        }
    }
}
</script>

<style lang="scss" scoped>
.form {
    color: var(--main-white);
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 32px 28px;
    width: 335px;
    height: 315px;
    background-color: var(--grey-form);
    border-radius: 30px;

    @media (min-width: 768px) {
        width: 500px;
        height: 420px;
    }

    &__inputs {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
}
</style>

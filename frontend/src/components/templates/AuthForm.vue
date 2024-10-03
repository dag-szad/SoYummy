<template>
    <div class="form">
        <h1>{{ formTitle }}</h1>
        <form action="" method="post" class="form__inputs">
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
        </form>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import MainButton from './MainButton.vue'

const props = defineProps({
    destination: {
        type: String,
        required: true,
        validator: (value: string) =>
            ['login', 'register'].includes(value.toLowerCase()),
    },
})

const username = ref('')
const email = ref('')
const password = ref('')

const isRegister = computed(
    () => props.destination.toLowerCase() === 'register'
)
const formTitle = computed(() =>
    isRegister.value ? 'Registration' : 'Sign In'
)
const buttonTitle = computed(() => (isRegister.value ? 'Sign up' : 'Sign in'))
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

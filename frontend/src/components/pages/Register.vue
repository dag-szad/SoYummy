<template>
    <div class="register">
        <div class="register__container">
            <img
                src="/src/assets/images/loginRegister/register-mobile@1x.png"
                alt="Register page image"
                class="register__image"
                :srcset="`
                    /src/assets/images/loginRegister/register-mobile@1x.png 250w,
                    /src/assets/images/loginRegister/register-mobile@2x.png 500w,
                    /src/assets/images/loginRegister/register-tablet@1x.png 410w,
                    /src/assets/images/loginRegister/register-tablet@2x.png 820w,
                    /src/assets/images/loginRegister/register-desktop@1x.png 500w,
                    /src/assets/images/loginRegister/register-desktop@2x.png 1000w
                    `"
                sizes="(max-width: 767px) 250px, 
                (min-width: 768px) and (max-width: 1199px) 410px, 
                (min-width: 1200px) 500px, 
                100vw"
            />
            <auth-form destination="register" />
        </div>
    </div>
    <div class="trapezoid"></div>
</template>

<script setup lang="ts">
import AuthForm from '../templates/AuthForm.vue'
</script>

<style lang="scss" scoped>
.register {
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 100vh;

    background: var(--log-reg-bg);

    &__container {
        position: relative;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        z-index: 1;

        @media (min-width: 1200px) {
            flex-direction: row;
            gap: 100px;
        }
    }

    &__image {
        width: 250px;

        @media (min-width: 768px) {
            width: 410px;
        }
        @media (min-width: 1200px) {
            width: 500px;
        }
    }
}

.trapezoid {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 60% 55%, 40% 55%, 0 45%);

    background-color: var(--log-reg-shape);

    transition: clip-path 0.3s ease-in-out;

    @media (min-width: 768px) {
        clip-path: polygon(0 0, 100% 0, 100% 50%, 75% 60%, 25% 60%, 0% 50%);
    }
}
</style>

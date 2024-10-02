<template>
    <div class="login">
        <div class="login__container">
            <img
                src="/src/assets/images/loginRegister/login-mobile@1x.png"
                alt="Login page image"
                :srcset="`
                    /src/assets/images/loginRegister/login-mobile@1x.png 250w,
                    /src/assets/images/loginRegister/login-mobile@2x.png 500w,
                    /src/assets/images/loginRegister/login-tablet@1x.png 410w,
                    /src/assets/images/loginRegister/login-tablet@2x.png 820w,
                    /src/assets/images/loginRegister/login-desktop@1x.png 500w,
                    /src/assets/images/loginRegister/login-desktop@2x.png 1000w
                    `"
                sizes="(max-width: 767px) 250px, 
                (min-width: 768px) and (max-width: 1199px) 410px, 
                (min-width: 1200px) 500px, 
                100vw"
            />
            <div class="login__form">
                <div class="pseudoform"></div>
                <router-link class="link" to="/register">
                    Registration
                </router-link>
            </div>
        </div>
    </div>
    <div class="trapezoid"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.pseudoform {
    width: 335px;
    height: 315px;
    background-color: var(--grey-form);
    border-radius: 30px;

    @media (min-width: 768px) {
        width: 500px;
        height: 420px;
    }
}

.login {
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 100vh;

    background: var(--dark-grey);

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

    &__form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 18px;
    }
}

.link {
    color: var(--main-white);
    transition: color 0.3s ease-in-out;

    &:hover {
        color: var(--main-green-hover);
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

    background-color: var(--main-white);

    transition: clip-path 0.3s ease-in-out;

    @media (min-width: 768px) {
        clip-path: polygon(0 0, 100% 0, 100% 50%, 75% 60%, 25% 60%, 0% 50%);
    }
}
</style>

<template>
    <div class="section">
        <div class="footer">
            <div class="footer__desc">
                <div class="footer__logo">
                    <logo
                        :size="logoSize"
                        background-color="#EBF3D4"
                        fill-color="#8BAA36"
                    ></logo>
                    <h2>SoYummy</h2>
                </div>
                <div class="footer__text">
                    <ul>
                        <li>Database of recipes that can be replenished</li>
                        <li>
                            Flexible search for desired and unwanted ingredients
                        </li>
                        <li>Ability to add your own recipes with photos</li>
                        <li>Convenient and easy to use</li>
                    </ul>
                </div>
            </div>
            <nav>
                <ul class="footer__nav">
                    <li>
                        <router-link to="/ingredients">Ingredients</router-link>
                    </li>
                    <li><router-link to="/add">Add recipes</router-link></li>
                    <li><router-link to="/my">My recipes</router-link></li>
                    <li><router-link to="/favorites">Favorites</router-link></li>
                    <li><router-link to="/list">Shopping list</router-link></li>
                </ul>
            </nav>
            <div class="footer__newsletter">
                <div class="footer__info">
                    <h3>Subscribe to our Newsletter</h3>
                    <p>
                        Subscribe up to our newsletter. Be in touch with latest
                        news and special offers, etc.
                    </p>
                </div>
                <form action="" class="input">
                    <div class="input__container">
                        <svg class="input__icon">
                            <use
                                href="../../assets/icons/icons.svg#mail-icon"
                            ></use>
                        </svg>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                        />
                    </div>
                    <button class="input__button">Subscribe</button>
                </form>
            </div>
        </div>
        <social-media></social-media>
    </div>
    <div class="addon">
        <p>
            Coded by
            <a href="https://github.com/dag-szad" target="_blank">Dag</a>.
        </p>
        <a href="">Terms of Service</a>
    </div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import SocialMedia from './SocialMedia.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const logoSize = ref(32)

const updateLogoSize = () => {
    const screenWidth = window.innerWidth
    logoSize.value = screenWidth >= 768 ? 44 : 32
}

onMounted(() => {
    updateLogoSize()
    window.addEventListener('resize', updateLogoSize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateLogoSize)
})
</script>

<style lang="scss" scoped>
.section {
    background-color: var(--footer-bg);
    transition: background-color 0.3s ease-in-out;

    padding: 28px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    @media (min-width: 768px) {
        padding: 50px;
    }

    @media (min-width: 1100px) {
        padding: 64px;
    }
}
.footer {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;

    color: var(--footer-txt);
    transition: color 0.3s ease-in-out;

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto auto;
        align-items: center;
        gap: 72px;
    }

    @media (min-width: 1100px) {
        grid-template-columns: 1fr auto 1fr;
        grid-template-rows: auto;
    }

    &__desc {
        grid-column: 1;
        grid-row: 1;
        display: flex;
        flex-direction: column;
        gap: 24px;

        @media (min-width: 768px) {
            gap: 40px;
        }
    }

    &__logo {
        display: flex;
        align-items: center;
        gap: 8px;

        font-size: 1.125rem;
        font-weight: 700;

        @media (min-width: 768px) {
            gap: 16px;
            font-size: 1.75rem;
        }
    }

    &__text {
        display: none;
        max-width: 420px;

        @media (min-width: 768px) {
            display: block;
            font-size: 0.875rem;

            ul {
                padding-left: 20px;

                display: flex;
                flex-direction: column;
                gap: 12px;
            }
        }

        @media (min-width: 1100px) {
            font-size: 1.125rem;
        }
    }

    nav {
        grid-column: 2;
        grid-row: 1;
    }

    &__nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;

        font-size: 0.875rem;

        list-style: none;

        @media (min-width: 768px) {
            align-items: flex-start;
            gap: 20px;
        }

        a {
            transition: color 0.3s ease-in-out;

            &:hover {
                color: var(--footer-txt-hover);
            }
        }
    }

    &__newsletter {
        grid-column: 1 / -1;
        grid-row: 2;
        max-width: 250px;
        justify-self: center;

        @media (min-width: 768px) {
            max-width: 460px;
        }

        @media (min-width: 1100px) {
            grid-column: 3;
            grid-row: 1;
            max-width: 340px;
            display: flex;
            flex-direction: column;
            gap: 28px;
        }
    }

    &__info {
        display: none;

        @media (min-width: 1100px) {
            display: flex;
            flex-direction: column;
            gap: 14px;
        }
    }
}
.input {
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media (min-width: 768px) {
        flex-direction: row;
    }

    @media (min-width: 1100px) {
        flex-direction: column;
        gap: 16px;
    }

    &__container {
        display: flex;
        align-items: center;

        padding: 0 16px;
        height: 40px;

        border-radius: 5px;
        border: 1px solid var(--footer-form-border);

        transition: border-color 0.3s ease-in-out;

        &:hover,
        &:active,
        &:focus-within {
            border-color: var(--footer-txt);
            .input__icon {
                color: var(--footer-txt);
            }
        }

        @media (min-width: 768px) {
            height: 50px;
        }

        @media (min-width: 1100px) {
            height: 60px;
        }

        input {
            border: none;
            outline: none;
            background: transparent;

            color: var(--footer-txt);
            flex: 1;
        }
    }

    &__icon {
        margin-right: 8px;

        width: 24px;
        height: 24px;

        transition: color 0.3s ease-in-out;
        color: var(--footer-form-border);
    }

    &__button {
        cursor: pointer;

        border: none;
        border-radius: 5px;

        background-color: var(--footer-btn);
        color: var(--footer-txt);
        font-size: 0.875rem;

        padding: 11px 67px;
        height: 41px;

        transition: background-color 0.3s ease-in-out;

        &:hover {
            background-color: var(--footer-btn-hover);
        }

        @media (min-width: 768px) {
            font-size: 1rem;
            height: 51px;
        }

        @media (min-width: 1100px) {
            font-size: 1rem;
            height: 61px;
        }
    }
}

.addon {
    display: flex;
    justify-content: center;
    gap: 14px;

    color: var(--addon-txt);
    transition: color 0.3s ease-in-out;
    font-size: 0.625rem;

    padding: 28px;

    @media (min-width: 768px) {
        gap: 28px;
        font-size: 0.875rem;
        padding: 32px;
    }

    a {
        color: var(--main-accent);
        transition: color 0.3s ease-in-out;

        &:hover {
            color: var(--main-accent-hover);
        }
    }

    @media (min-width: 1100px) {
        padding: 50px;
    }
}
</style>

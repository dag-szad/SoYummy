<template>
    <div class="error">
        <img
            src="/src/assets/images/notFoundPage/404-mobile@1x.png"
            alt="404 page image"
            class="error__image"
            :srcset="`
                    /src/assets/images/notFoundPage/404-mobile@1x.png 375w,
                    /src/assets/images/notFoundPage/404-mobile@2x.png 750w,
                    /src/assets/images/notFoundPage/404-tablet@1x.png 500w,
                    /src/assets/images/notFoundPage/404-tablet@2x.png 1000w
                    /src/assets/images/notFoundPage/404-desktop@1x.png 750w,
                    /src/assets/images/notFoundPage/404-desktop@2x.png 1500w
                    `"
            sizes="(max-width: 767px) 375px, 
                (max-width: 1099px) 500px,
                (min-width: 1100px) 750px"
        />
        <div class="error__info">
            <h1 class="error__title">We are sorry,</h1>
            <p class="error__text">
                but the page you were looking for can't be found...
            </p>
            <router-link to="/main" class="error__link">Go to main page</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.error {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    padding-bottom: 50px;

    @media (min-width: 768px) {
        gap: 32px;
        padding-bottom: 75px;
    }

    &__info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        font-size: 0.875rem;
        font-weight: 400;

        @media (min-width: 768px) {
            gap: 10px;
            font-size: 1.125rem;
        }
    }

    &__title {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--main-txt);
        transition: color 0.3s ease-in-out;

        @media (min-width: 768px) {
            font-size: 1.5rem;
        }
    }

    &__text {
        text-align: center;

        color: var(--main-txt-transparent);
        transition: color 0.3s ease-in-out;
    }

    &__link {
        text-decoration: underline;

        color: var(--main-accent);
        transition: color 0.3s ease-in-out;

        &:hover {
            color: var(--main-accent-hover);
        }
    }
}
</style>

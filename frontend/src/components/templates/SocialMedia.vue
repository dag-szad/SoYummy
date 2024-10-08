<template>
    <ul class="social">
        <li>
            <a href="https://www.facebook.com/" target="_blank">
                <svg class="social__icon">
                    <use
                        href="../../assets/icons/icons.svg#facebook-icon"
                    ></use>
                </svg>
            </a>
        </li>
        <li>
            <a href="https://www.youtube.com/" target="_blank">
                <svg class="social__icon">
                    <use href="../../assets/icons/icons.svg#youtube-icon"></use>
                </svg>
            </a>
        </li>
        <li>
            <a href="https://www.twitter.com/" target="_blank">
                <svg class="social__icon">
                    <use href="../../assets/icons/icons.svg#twitter-icon"></use>
                </svg>
            </a>
        </li>
        <li>
            <a href="https://www.instagram.com/" target="_blank">
                <svg class="social__icon">
                    <use
                        href="../../assets/icons/icons.svg#instagram-icon"
                    ></use>
                </svg>
            </a>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.social {
    display: flex;
    list-style: none;
    gap: 15px;

    a {
        display: inline-block;
        transition: fill 0.3s ease-in-out;

        &:hover .social__icon {
            fill: var(--main-green-hover);
        }
    }

    &__icon {
        width: 20px;
        height: 20px;
        fill: var(--main-green);
        cursor: pointer;
        transition: fill 0.3s ease-in-out;
    }
}
</style>

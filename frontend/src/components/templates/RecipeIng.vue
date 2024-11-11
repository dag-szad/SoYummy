<template>
    <div class="ing">
        <ul class="ing__titles">
            <li>Ingredients</li>
            <li>Number</li>
            <li>Add to list</li>
        </ul>
        <ul>
            <li>
                <img src="" alt="" />
                <h3>Title</h3>
                <p>3 chopped</p>
                <input type="checkbox" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scope>
.ing {
    margin: 200px auto 50px;
    max-width: 1240px;

    @media (min-width: 768px) {
        margin: 115px auto 100px;
    }

    &__titles {
        display: flex;
        justify-content: space-between;
        gap: 20px;

        background-color: var(--main-accent);
        border-radius: 8px;

        color: var(--main-btn-txt);
        font-size: 0.625rem;
        font-weight: 600;

        list-style: none;

        padding: 12px 14px;

        li:first-child {
            flex-grow: 2;
        }

        @media (min-width: 768px) {
            gap: 40px;
            font-size: 1.125rem;
            padding: 21px 32px;
        }

        @media (min-width: 768px) {
            gap: 110px;
            padding: 21px 40px;
        }
    }
}
</style>

<template>
    <div class="prep">
        <div class="prep__text">
            <h2 class="prep__title">Recipe Preparation</h2>
            <ol class="prep__list">
                <li v-for="(step, index) in steps" :key="index">{{ step }}</li>
            </ol>
        </div>
        <img
            v-if="imageSrc"
            :src="imageSrc"
            alt="Recipe Image"
            class="prep__img"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    instructions: string
    preview: string
}>()

const steps = props.instructions.split('.').filter((step) => step.trim() !== '')

const imageSrc = props.preview
</script>

<style lang="scss" scoped>
.prep {
    display: flex;
    flex-direction: column;
    gap: 40px;

    margin-bottom: 100px;

    @media (min-width: 1100px) {
        flex-direction: row;
        gap: 50px;
    }

    &__text {
        display: flex;
        flex-direction: column;
        gap: 28px;
    }

    &__title {
        font-size: 1.5rem;
        font-weight: 600;

        color: var(--recipe-txt);
        transition: color 0.3 ease-in-out;

        @media (min-width: 768px) {
            font-size: 1.75rem;
        }

        @media (min-width: 1100px) {
            font-size: 2rem;
        }
    }

    &__list {
        margin: 0;
        padding: 0;

        display: flex;
        flex-direction: column;
        gap: 14px;

        list-style: none;
        counter-reset: my-counter;

        li {
            counter-increment: my-counter;

            display: flex;
            gap: 14px;

            color: var(--recipe-prep-txt);
            font-size: 1rem;
            font-weight: 400;

            @media (min-width: 768px) {
                font-size: 1.125rem;
            }

            @media (min-width: 1100px) {
                font-size: 1.25rem;
            }
        }

        li::before {
            content: counter(my-counter);

            display: flex;
            justify-content: center;
            align-items: center;

            background-color: var(--main-accent);
            border-radius: 50%;

            color: var(--main-btn-txt);
            font-size: 0.875rem;
            font-weight: 600;

            min-width: 24px;
            height: 24px;

            @media (min-width: 768px) {
                min-width: 28px;
                height: 28px;
            }

            @media (min-width: 1100px) {
                min-width: 30px;
                height: 30px;
            }
        }
    }

    &__img {
        width: auto;

        object-fit: cover;

        border-radius: 8px;

        @media (min-width: 768px) {
            width: 450px;
            height: 345px;
        }

        @media (min-width: 1100px) {
            min-width: 450px;
        }
    }
}
</style>

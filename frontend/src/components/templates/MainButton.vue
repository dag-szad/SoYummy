<template>
    <button
        :class="[buttonShapeClass, typeClass, themeClass, sizeClass]"
        @click="handleClick"
    >
        {{ buttonTitle }}
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    buttonTitle: {
        type: String,
        default: 'Button',
        required: true,
    },
    shape: {
        type: String,
        default: 'round',
        validator: (value: string) => ['round', 'square'].includes(value),
    },
    type: {
        type: String,
        default: 'green',
        validator: (value: string) =>
            ['green', 'grey', 'transparent'].includes(value),
    },
    theme: {
        type: String,
        default: 'light',
        validator: (value: string) => ['light', 'dark'].includes(value),
    },
    size: {
        type: String,
        default: 'small',
        validator: (value: string) => ['small', 'large'].includes(value),
    },
    onClick: {
        type: Function,
        default: () => {
            console.log('Button clicked')
        },
    },
})

const buttonShapeClass = computed(() =>
    props.shape === 'round' ? 'btn-round' : 'btn-square'
)
const typeClass = computed(() =>
    props.type === 'green'
        ? 'btn-green'
        : props.type === 'grey'
        ? 'btn-grey'
        : 'btn-transparent'
)
const themeClass = computed(() =>
    props.theme === 'light' ? 'btn-light' : 'btn-dark'
)
const sizeClass = computed(() =>
    props.size === 'small' ? 'btn-small' : 'btn-large'
)

const handleClick = () => {
    props.onClick()
}
</script>

<style lang="scss" scoped>
button {
    font-size: 0.625rem;
    cursor: pointer;

    transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;

    @media (min-width: 768px) {
        font-size: 1rem;
    }
}

.btn-green {
    background-color: var(--main-green);
    border: 1px solid var(--main-green);
    color: var(--main-white);

    &:hover {
        background-color: var(--main-green-hover);
        border-color: var(--main-green-hover);
    }
}

.btn-grey {
    background-color: var(--dark-grey);
    border: 1px solid var(--dark-grey);
    color: var(--main-white);

    &:hover {
        background-color: var(--dark-grey-hover);
        border-color: var(--dark-grey-hover);
    }
}

.btn-transparent {
    background-color: transparent;
    border: 1px solid var(--main-white);
    color: var(--main-white);

    &:hover {
        background-color: var(--main-green);
        border-color: var(--main-green);
    }
}

.btn-round {
    border-radius: 24px 44px;
    padding: 12px 24px;
}

.btn-square {
    border-radius: 6px;
    padding: 20px 40px;

    @media (min-width: 768px) {
        padding: 22px 44px;
    }
}

/* .btn-light {
}

.btn-dark {
}

.btn-small {
}

.btn-large {
} */
</style>

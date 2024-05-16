<template>

    <div :class="getClassNames" :id="todo.id">
        <div class="flex justify-between">
            <h2>
                {{ todo?.header }}
            </h2>
            <button className="btn btn-square h-6 min-h-6 w-6" @click="onClickHandler(todo?.id)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div>{{ todo.text }}</div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, defineProps } from 'vue';
import cn from "classnames"
import { useFetch } from '@vueuse/core';

const props = defineProps({
    todo: {
        type: Object,
        required: true
    },
});



const getClassNames = computed(() => {
    return cn('border rounded-md p-5 flex flex-col', {
        'border-neutral': props.todo.color === 'neutral',
        'border-accent': props.todo.color === 'accent',
        'border-warning': props.todo.color === 'warning',
        'border-error': props.todo.color === 'error'
    });
})

const onClickHandler = async (id: number) => {
    const ApiUrl = 'https://localhost:7027/api/ToDo/' + id
    console.log(id)

    await useFetch(ApiUrl, {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    location.reload()
}

defineComponent({
    name: "ToDo",
    props: {
        todo: Object
    }
})
</script>
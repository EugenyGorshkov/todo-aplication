<template>
    <div :class="getClassNames" :id="todo.id.toString()">
        <div class="flex justify-between">
            <h2 class="font-bold" v-if="!isRedact">
                {{ todo?.header }}
            </h2>
            <input class="input w-full p-0 m-[-1px] font-bold h-auto mr-5" type="text" v-if="isRedact"
                v-model="toDoHeader">
            <div class="flex gap-3">
                <button className="btn btn-square h-6 min-h-6 w-6 p-[2px]" @click="onRedactHandler" v-if="!isRedact">
                    <img src="/edit-button.svg" alt="">
                </button>
                <button className="btn btn-square h-6 min-h-6 w-6 p-[2px]" @click="onRedactHandler" v-if="isRedact">
                    <img src="/done-button.svg" alt="">
                </button>
                <button className="btn btn-square h-6 min-h-6 w-6" @click="onDeleteHandler(todo?.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
        <div className="divider mt-1 mb-1"></div>
        <div v-if="!isRedact">
            {{ todo?.text }}
        </div>
        <textarea class="input w-full p-0 m-[-1px] h-auto" type="text" v-if="isRedact" v-model="toDoText">
        </textarea>

    </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, defineProps, ref } from 'vue';
import cn from "classnames"
import { useFetch } from '@vueuse/core';
import { APIRoute, ToDoEndpoint } from '../../shared/API';

interface ITodo {
    color: string,
    header: string,
    id: number,
    text: string,
    userId: number
}

const props = defineProps<{
    todo: ITodo;
}>();

let isRedact = ref(false)

let toDoHeader = ref(props.todo.header)
let toDoText = ref(props.todo.text)

const getClassNames = computed(() => {
    return cn('border rounded-md p-5 flex flex-col', {
        'border-neutral': props.todo.color === 'neutral',
        'border-accent': props.todo.color === 'accent',
        'border-warning': props.todo.color === 'warning',
        'border-error': props.todo.color === 'error'
    });
})

// Функция редактирования туду
const onRedactHandler = async () => {
    if (isRedact.value) {
        if (toDoHeader.value != props.todo.header || toDoText.value != props.todo.text) {
            await useFetch(APIRoute + ToDoEndpoint, {
                method: 'Put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    color: props.todo.color,
                    header: toDoHeader.value,
                    id: props.todo.id,
                    text: toDoText.value,
                    userId: props.todo.userId
                })
            });

            location.reload()
        }
    }
    isRedact.value = !isRedact.value
}

// Функция удаления туду
const onDeleteHandler = async (id: number) => {
    await useFetch(APIRoute + ToDoEndpoint + "/" + id, {
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
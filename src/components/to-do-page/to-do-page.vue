<template>
    <div class="container mx-auto p-5">
        <ToDoPageCreateForm @submit="handleFormSubmit" />
        <div className="divider"></div>
        <div class="flex flex-col gap-5 max-w-4xl justify-center mx-auto">
            <div v-if="isFetching">
                <p class="text-center font-bold text-xl">Loading...</p>
            </div>
            <ToDo v-else-if="!isFetching" v-for="todo in data" :key="todo.id" :todo="todo" />
            <div v-if="data && data.length == 0">
                <p class="text-center font-bold text-xl">No tasks created yet</p>
            </div>
            <div v-else-if="!isDataLoading">
                <p class="text-center font-bold text-xl">Failed to fetch</p>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { useFetch } from '@vueuse/core';

import { APIRoute, ToDoEndpoint } from '../../shared/API';

import ToDoPageCreateForm from './to-do-page-create-form.vue';
import ToDo from './to-do-page-todo.vue';

let isDataLoading = ref(true)

const { isFetching, data, onFetchError } = useFetch(APIRoute + ToDoEndpoint).json()

onFetchError((error) => {
    console.log(error.message)
    if (error.message === 'Failed to fetch') {
        isDataLoading.value = false
        console.log(isDataLoading.value)
    }
})

const handleFormSubmit = async (values: any) => {
    // Обработка данных формы
    console.log(values)
    await useFetch(APIRoute + ToDoEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    }).text();

    location.reload()
};

defineComponent({
    name: "ToDoPage",
    components: {
        ToDoPageCreateForm,
        ToDo,
    }
})
</script>

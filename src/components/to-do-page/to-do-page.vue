<template>
    <div class="container mx-auto p-5">
        <ToDoPageCreateForm @submit="handleFormSubmit" />
        <div class="flex flex-col gap-5 mt-10 max-w-4xl justify-center mx-auto">
            <div v-if="isFetching">Загрузка</div>
            <ToDo v-else-if="!isFetching" v-for="todo in data" :key="todo.id" :todo="todo" />
            <div v-if="data && data.length == 0">
                <p class="text-center font-bold text-xl">No tasks created yet</p>
            </div>
            <div v-else-if="error">{{ error.message }}</div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { defineComponent } from 'vue';
import { useFetch } from '@vueuse/core';

import ToDoPageCreateForm from './to-do-page-create-form.vue';
import ToDo from './to-do-page-todo.vue';

const ApiUrl = 'https://localhost:7027/api/ToDo'
const { isFetching, error, data } = useFetch(ApiUrl).json()

const handleFormSubmit = async (values: any) => {
    // Обработка данных формы
    console.log(values)
    await useFetch(ApiUrl, {
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

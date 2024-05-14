<template>
    <div class="container mx-auto p-5">
        <ToDoPageCreateForm :handleFormSubmit="handleFormSubmit" />
        <div class="flex flex-col gap-5 mt-5 max-w-4xl justify-center mx-auto">
            <div v-if="isFetching">Загрузка</div>
            <ToDo v-else-if="!isFetching" v-for="todo in data" :todo="todo" />
        </div>
    </div>
</template>


<script setup lang="ts">
import { defineComponent } from 'vue';
import { useFetch } from '@vueuse/core';

import ToDoPageCreateForm from './to-do-page-create-form.vue';
import ToDo from './to-do-page-todo.vue';

const ApiUrl = 'https://localhost:7027/api/ToDo'
const { isFetching, error, data }: any = useFetch(ApiUrl).json()



const handleFormSubmit = async (data: any) => {
    // Обработка данных формы
    console.log('Submitted data:', data);

    await useFetch(ApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).text();
};



defineComponent({
    name: "ToDoPage",
    components: {
        ToDoPageCreateForm,
        ToDo,
    }
})
</script>

<template>
    <p class="text-center mt-5 mb-5 font-bold">Create your to do here</p>
    <form @submit.prevent="onSubmit" className="flex flex-col justify-center mx-auto max-w-xl gap-5">
        <label className="form-control w-full relative">
            <div className="label">
                <span className="label-text">Title</span>
            </div>
            <input type="text" name="title" placeholder="Type title here..." className="input input-bordered w-full "
                v-model="header">
            <span class="absolute bottom-[-1.5em] left-0 m-0 text-sm">{{ errorHeader }}</span>
        </label>
        <label className="form-control w-full relative">
            <div className="label">
                <span className="label-text">Description</span>
            </div>
            <textarea name="description" className="textarea textarea-bordered textarea-md w-full "
                placeholder="Type description here..." v-model="text"></textarea>
            <span class="absolute bottom-[-1.5em] left-0 m-0 text-sm">{{ errorText }}</span>

        </label>
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">Select task importance</span>
            </div>
            <select name="color" class="select select-bordered" v-model="color" v-bind:class="getClassNames">
                <option value="neutral">Neutral</option>
                <option value="accent">Accent</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
            </select>
        </label>
        <button className="btn btn-accent">Create task</button>
    </form>
</template>

<script setup lang="ts">
interface IFormData {
    header: string;
    text: string;
    color: string;
    userId: number;
}

import { useField, useForm } from 'vee-validate';
import { computed, defineComponent } from 'vue';
import cn from "classnames"
import * as Yup from 'yup';

const { handleSubmit, resetForm } = useForm<IFormData>({
    initialValues: {
        header: '',
        text: '',
        color: 'neutral'
    },
});

const { value: header, errorMessage: errorHeader } = useField<string>('header', Yup.string().required().min(3));
const { value: text, errorMessage: errorText } = useField<string>('text', Yup.string().required().min(3));
const { value: color } = useField<string>('color');

const getClassNames = computed(() => {
    return cn({
        'select-neutral': color.value === 'neutral',
        'select-accent': color.value === 'accent',
        'select-warning': color.value === 'warning',
        'select-error': color.value === 'error'
    });
})

// обработка формы колл бек функцией сделанной через emit
const emit = defineEmits(['submit'])

const onSubmit = handleSubmit((values) => {

    emit('submit', values)

    resetForm({
        values: {
            header: '',
            text: '',
            color: 'neutral'
        },
    });
});



defineComponent({
    name: "ToDoPageCreateForm",
})
</script>
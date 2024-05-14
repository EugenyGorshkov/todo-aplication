<template>
    <p class="text-center mt-5 mb-5 font-bold">Create your to do here</p>
    <form @submit.prevent="handleSubmit" className="flex flex-col justify-center mx-auto max-w-xl gap-5">
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">Title</span>
            </div>
            <input type="text" placeholder="Type title here..." className="input input-bordered w-full "
                v-bind:value="formData.header" @input="formData.header = handleInput($event)" />
        </label>
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">Description</span>
            </div>
            <textarea className="textarea textarea-bordered textarea-md w-full " placeholder="Type description here..."
                v-model="formData.text"></textarea>
        </label>
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">Select task importance</span>
            </div>
            <select class="select select-bordered" v-model="formData.color" v-bind:class="getClassNames">
                <option value="neutral" selected>Neutral</option>
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
    header: string | undefined;
    text: string | undefined;
    color: string;
    userId: number;
}

import { computed, defineComponent, reactive, ref } from 'vue';
import cn from "classnames"

const selectedOption = ref('neutral');

const props = defineProps<{
    handleFormSubmit: (data: any) => void;
}>()

const formData: IFormData = reactive({
    header: '',
    text: '',
    color: selectedOption.value,
    userId: 0
});

const getClassNames = computed(() => {
    return cn({
        'select-neutral': formData.color === 'neutral',
        'select-accent': formData.color === 'accent',
        'select-warning': formData.color === 'warning',
        'select-error': formData.color === 'error'
    });
})

const handleSubmit = () => {
    props.handleFormSubmit(formData);
};

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target && target.value != undefined) {
        return target.value
    }
}

defineComponent({
    name: "ToDoPageCreateForm",
})
</script>
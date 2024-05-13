<template>
    <div class="container mx-auto p-5">
        <p class="text-center mt-5 mb-5 font-bold">Create your to do here</p>
        <form action="" className="flex flex-col justify-center mx-auto max-w-xl gap-5">
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Title</span>
                </div>
                <input type="text" placeholder="Type title here..." className="input input-bordered w-full " />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Description</span>
                </div>
                <textarea className="textarea textarea-bordered textarea-md w-full "
                    placeholder="Type description here..."></textarea>
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Select task importance</span>
                </div>
                <select class="select select-bordered" v-model="selectedOption" v-bind:class="selectedOption">
                    <option value="select-neutral" selected>Neutral</option>
                    <option value="select-accent">Accent</option>
                    <option value="select-warning">Warning</option>
                    <option value="select-error">Error</option>
                </select>
            </label>
            <button className="btn btn-accent">Create task</button>
        </form>
    </div>
</template>


<script setup lang="ts">
import { defineComponent, ref } from 'vue';

const selectedOption = ref('select-neutral');

defineComponent({
    name: "ToDoPage",
})
</script>

<template>
    <div class="container mx-auto">
        <form class="flex flex-col max-w-xs mx-auto mt-20 gap-7" @submit.prevent="onSubmit">
            <h2 class="text-center font-bold text-lg">Sign In</h2>
            <input type="text" name="email" id="email" className="input input-bordered w-full max-w-xs"
                placeholder="email..." v-model="email">
            <input type="password" name="password" id="password" className="input input-bordered w-full max-w-xs"
                placeholder="password..." v-model="password">
            <button className="btn">Forgot password?</button>
            <button className="btn btn-accent">Sign In</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { useField, useForm } from 'vee-validate';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

interface ILoginFormData {
    email: string,
    password: string
}

const router = useRouter();

const ApiUrl = 'https://localhost:7027/api/Auth/login'

const { handleSubmit } = useForm<ILoginFormData>({
    initialValues: {
        email: '',
        password: '',
    }
});

const { value: email, errorMessage: errorHeader } = useField<string>('email');
const { value: password, errorMessage: errorText } = useField<string>('password');

// const onSubmit = handleSubmit((values) => {
//     console.log(values)
// })

const onSubmit = handleSubmit(async (values: any) => {
    const response = await useFetch(ApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    }).json();

    console.log(response.statusCode.value === 200)

    if (response.statusCode.value === 200) {
        router.push('/to-do')
        localStorage.setItem('token', response.data.value.token)
        localStorage.setItem('Name', response.data.value.user.firsName)
    }
    console.log("response.data.value", response.data.value)
})

defineComponent({
    name: "SignIn",
});
</script>
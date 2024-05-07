<template>
    <div class="container mx-auto">
        <Form class="flex flex-col max-w-xs mx-auto mt-20 gap-7" @submit="onSubmit" :validation-schema="schema">
            <h2 class="text-center font-bold text-lg">Sign Up</h2>
            <TextInput name="first_name" type="text" label="First Name" placeholder="First Name"
                success-message="Nice to meet you!" />
            <TextInput name="last_name" type="text" label="Last Name" placeholder="Last Name"
                success-message="Nice to meet you!" />
            <TextInput name="email" type="email" label="Email" placeholder="Email"
                success-message="Got it, we won't spam you!" />
            <TextInput name="password" type="password" label="Password" placeholder="Password"
                success-message="Nice and secure!" />
            <TextInput name="confirm_password" type="password" label="Password" placeholder="Type it again"
                success-message="Glad you remembered it!" />
            <button className="btn btn-accent" type="submit">Sign Up</button>
        </Form>
    </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { Form } from 'vee-validate';
import TextInput from "./text-input.vue"
import * as Yup from 'yup';



const schema = Yup.object().shape({
    first_name: Yup.string().min(3).required().label('First name'),
    last_name: Yup.string().min(3).required().label('Last name'),
    email: Yup.string().email().required().label('Email'),
    password: Yup.string().min(6).matches(/[!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/, 'password must be contain spec symbol').matches(/[A-Z]/, "password must contain at least one capital letter").required().label('Password'),
    confirm_password: Yup.string()
        .required()
        .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

function onSubmit(values: any) {
    alert(JSON.stringify(values, null, 2));
}

defineComponent({
    name: "SignUp",
    components: {
        Form,
        TextInput
    },
    methods: {

        isRequired(value: string) {
            if (value && value.trim()) {
                return true
            }
            return "This field is required"
        }
    }
});
</script>
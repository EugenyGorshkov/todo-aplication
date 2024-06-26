<template>
    <div class="relative">
        <input :name="name" :id="name" :type="type" :value="inputValue" :placeholder="placeholder" @input="handleChange"
            @blur="handleBlur" class="input input-bordered w-full max-w-xs"
            :class="{ 'input-error': !!errorMessage, 'input-success': meta.valid }" />

        <p class="absolute bottom-[-1.5em] left-0 m-0 text-sm" v-show="errorMessage || meta.valid"
            :class="{ 'text-error': !!errorMessage, 'text-success': meta.valid }">
            {{ errorMessage || successMessage }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
    type: {
        type: String,
        default: 'text',
    },
    value: {
        type: String,
        default: undefined,
    },
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    successMessage: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
});

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
    meta,
} = useField(name, undefined, {
    initialValue: props.value,
});

defineComponent({
    name: "TextInput"
})
</script>

<template>
    <div class="container mx-auto">
        <form class="flex flex-col max-w-xs mx-auto mt-20 gap-5">
            <h2 class="text-center font-bold text-lg">Sign Up</h2>
            <input type="text" name="" id="" className="input input-bordered w-full max-w-xs"
                placeholder="first name...">
            <input type="text" name="" id="" className="input input-bordered w-full max-w-xs"
                placeholder="last name...">
            <input type="text" name="" id="" className="input input-bordered w-full max-w-xs" placeholder="email...">
            <input type="text" name="" id="" className="input input-bordered w-full max-w-xs" placeholder="password...">
            <button className="btn btn-accent">Sign Up</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "SignUp",
});
</script>
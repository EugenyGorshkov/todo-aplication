<template>
    <nav className="navbar bg-base-100 flex justify-end">
        <ul>
            <li className="flex gap-2">
                <!-- <RouterLink to="/" className="btn btn-ghost text-xl">Sign In</RouterLink> -->
                <RouterLink to="/" activeClass="btn btn-accent text-xl" class="btn  text-xl">Sign
                    In
                </RouterLink>
                <RouterLink to="/sign-up" activeClass="btn btn-accent text-xl" class="btn  text-xl">
                    Sign Up</RouterLink>
                <RouterLink to="/to-do" activeClass="btn btn-accent text-xl" class="btn  text-xl">
                    To Do</RouterLink>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
    name: "NavBar",
});
</script>
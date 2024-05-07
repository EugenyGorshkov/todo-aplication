<template>
  <SignIn/>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import SignIn from './components/sign-in.vue';

export default defineComponent({
  name: "App",
  components: {
    SignIn
  }
});
</script>

<template>
  <NavBar />
  <strong>Current route path:</strong> {{ $route.fullPath }}
  <main>
    <RouterView />
  </main>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/navbar/navbar.vue';

export default defineComponent({
  name: "App",
  components: {
    NavBar
  }
});
</script>

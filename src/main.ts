import { createApp } from "vue";
import "./style.css";
import router from "./app/routes/router.ts";
import App from "./app/App.vue";

createApp(App).use(router).mount("#app");

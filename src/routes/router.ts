import { createRouter, createWebHistory } from "vue-router";

import SignIn from "../components/sign-in.vue";
import SignUp from "../components/signup/sign-up.vue";

const routes = [
    { path: "/", component: SignIn },
    { path: "/sign-up", component: SignUp },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

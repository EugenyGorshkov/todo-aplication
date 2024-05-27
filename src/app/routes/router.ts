import { createRouter, createWebHistory } from "vue-router";

import SignIn from "../../components/sign-in.vue";
import SignUp from "../../components/signup/sign-up.vue";
import ToDoPage from "../../components/to-do-page/to-do-page.vue";

const routes = [
    { path: "/", component: SignIn },
    { path: "/sign-up", component: SignUp },
    { path: "/to-do", component: ToDoPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

import { createApp } from 'vue'
import {createWebHistory, createRouter} from 'vue-router'
import ElementPlus from 'element-plus'

import App from './App.vue'
import Home from './Home.vue'
import Users from './Users.vue'

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/users/:userId",
        name: "user",
        component: Users
    },
    {
        path: "/users",
        name: "users",
        component: Users
    }
]
const router = createRouter({
    routes: routes,
    history: createWebHistory()
})

const app = createApp(App)
app.use(ElementPlus)
app.use(router)


app.mount('#app')

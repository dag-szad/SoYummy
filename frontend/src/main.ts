import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import './style.css'

import App from './App.vue'

import HomePage from './components/pages/HomePage.vue'
import Register from './components/pages/Register.vue'
import Login from './components/pages/Login.vue'
import MainPage from './components/pages/MainPage.vue'
import NotFound from './components/pages/NotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage, meta: { title: 'Home Page' } },
        { path: '/register', component: Register, meta: { title: 'Register' } },
        { path: '/login', component: Login, meta: { title: 'Login' } },
        {
            path: '/main',
            component: MainPage,
            meta: { title: 'Main Page', requiresAuth: true },
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFound,
            meta: { title: '404' },
        },
    ],
})

router.beforeEach((to, _from, next) => {
    const title = 'SoYummy | ' + to.meta.title || 'SoYummy'
    document.title = title

    const isLoggedIn = !!localStorage.getItem('token')
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

    if (requiresAuth && !isLoggedIn) {
        next('/login')
    } else {
        next()
    }
})

const app = createApp(App)
app.use(router)
app.mount('#app')

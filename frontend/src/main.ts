import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import HomePage from './components/pages/HomePage.vue'
import Register from './components/pages/Register.vue'
import Login from './components/pages/Login.vue'
import SharedLayout from './components/pages/SharedLayout.vue'
import MainPage from './components/pages/MainPage.vue'
import NotFound from './components/pages/NotFound.vue'

const setTheme = (theme: string) => {
    const existingLink = document.getElementById('theme-style')
    if (existingLink) {
        document.head.removeChild(existingLink)
    }

    const linkElement = document.createElement('link')
    linkElement.id = 'theme-style'
    linkElement.rel = 'stylesheet'
    linkElement.href =
        theme === 'dark' ? '/src/style-dark.css' : '/src/style-light.css'
    document.head.appendChild(linkElement)
}

const initialTheme = localStorage.getItem('theme') || 'light'
setTheme(initialTheme)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage, meta: { title: 'Home Page' } },
        { path: '/register', component: Register, meta: { title: 'Register' } },
        { path: '/login', component: Login, meta: { title: 'Login' } },
        {
            path: '/main',
            component: SharedLayout,
            meta: { requiresAuth: true },
            children: [
                { path: '', component: MainPage, meta: { title: 'Main Page' } },
                {
                    path: '/:pathMatch(.*)*',
                    component: NotFound,
                    meta: { title: '404' },
                },
            ],
        },
    ],
})

router.beforeEach((to, _from, next) => {
    const title = 'SoYummy | ' + (to.meta.title || 'SoYummy')
    document.title = title

    const isLoggedIn = !!localStorage.getItem('token')
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

    if (requiresAuth && !isLoggedIn) {
        next('/login')
    } else {
        next()
    }
})

const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || 'light'
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
}

document.addEventListener('themeChange', toggleTheme)

const app = createApp(App)
app.use(router)
app.mount('#app')

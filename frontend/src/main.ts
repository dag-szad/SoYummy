import { createApp, ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import App from './App.vue'

import HomePage from './components/pages/HomePage.vue'
import Register from './components/pages/Register.vue'
import Login from './components/pages/Login.vue'

import SharedLayout from './components/pages/SharedLayout.vue'

import MainPage from './components/pages/MainPage.vue'
import CategoriesPage from './components/pages/CategoriesPage.vue'
import RecipePage from './components/pages/RecipePage.vue'
import AddRecipePage from './components/pages/AddRecipePage.vue'
import MyRecipesPage from './components/pages/MyRecipesPage.vue'
import FavoritesPage from './components/pages/FavoritesPage.vue'
import ShoppingListPage from './components/pages/ShoppingListPage.vue'
import SearchPage from './components/pages/SearchPage.vue'
import NotFoundPage from './components/pages/NotFoundPage.vue'

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
const theme = ref(initialTheme)
setTheme(initialTheme)

const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    setTheme(theme.value)
}

document.addEventListener('themeChange', toggleTheme)

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
                { path: '/categories', component: CategoriesPage, meta: { title: 'Categories' } },
                { path: '/categories/:categoryTitle', component: CategoriesPage, meta: { title: 'Category' } },
                { path: '/recipes/:recipeId', component: RecipePage, meta: { title: 'Recipe' } },
                { path: '/add', component: AddRecipePage, meta: { title: 'Add recipe' } },
                { path: '/my', component: MyRecipesPage, meta: { title: 'My recipes' } },
                { path: '/favorites', component: FavoritesPage, meta: { title: 'Favorites' } },
                { path: '/list', component: ShoppingListPage, meta: { title: 'Shopping list' } },
                { path: '/search', component: SearchPage, meta: { title: 'Search' } },
                { path: '/:pathMatch(.*)*', component: NotFoundPage, meta: { title: '404' } },
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

const app = createApp(App)
const pinia = createPinia()

app.provide('theme', theme)
app.provide('toggleTheme', toggleTheme)

app.use(router)
app.use(pinia)
app.mount('#app')

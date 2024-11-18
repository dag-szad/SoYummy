import { defineStore } from 'pinia'

interface UserState {
    token: string | null
    userId: string | null
    username: string | null
    profilePicture: string | null
    shoppingListId: string | null
}

const BASE_URL = 'http://localhost:3000'

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        token: null,
        userId: null,
        username: null,
        profilePicture: null,
        shoppingListId: null,
    }),

    actions: {
        setUserData(data: UserState) {
            this.token = data.token
            this.userId = data.userId
            this.username = data.username
            this.profilePicture = data.profilePicture
                ? `${BASE_URL}/${data.profilePicture}`
                : null
            this.shoppingListId = data.shoppingListId

            localStorage.setItem('token', data.token || '')
            localStorage.setItem('userId', data.userId || '')
            localStorage.setItem('username', data.username || '')
            localStorage.setItem('profilePicture', data.profilePicture || '')
            localStorage.setItem('shoppingListId', data.shoppingListId || '')
        },

        loadUserData() {
            const token = localStorage.getItem('token')
            const userId = localStorage.getItem('userId')
            const username = localStorage.getItem('username')
            const profilePicture = localStorage.getItem('profilePicture')
            const shoppingListId = localStorage.getItem('shoppingListId')

            if (token && userId && username) {
                this.token = token
                this.userId = userId
                this.username = username
                this.profilePicture = profilePicture
                    ? `${BASE_URL}/${profilePicture}`
                    : null
                this.shoppingListId = shoppingListId
            } else {
                console.warn('User data not found in localStorage.')
            }
        },

        clearUserData() {
            this.token = null
            this.userId = null
            this.username = null
            this.profilePicture = null
            this.shoppingListId = null

            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            localStorage.removeItem('username')
            localStorage.removeItem('profilePicture')
            localStorage.removeItem('shoppingListId')
        },

        updateUsername(newUsername: string) {
            this.username = newUsername
            localStorage.setItem('username', newUsername)
        },

        updateProfilePicture(newProfilePicture: string) {
            this.profilePicture = `${BASE_URL}/${newProfilePicture}`
            localStorage.setItem('profilePicture', `${newProfilePicture}`)
        },
    },
})

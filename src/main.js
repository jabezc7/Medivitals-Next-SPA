import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Niftee Core
import { registerCore } from '@niftee-group/niftee-core/src'
import './css/styles.css'

// Third-Party
import axios from 'axios'

// Axios
if (localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)).user.token
}

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults['xsrfCookieName'] = null

// Handle HTTP Requests
axios.interceptors.request.use((config) => {
    if (router.currentRoute && router.currentRoute.meta) {
        if (!router.currentRoute.meta.public) {
            config.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY)).user.token
        }
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

// Handle HTTP Responses
axios.interceptors.response.use(response => {
    return response
}, function (error) {
    if (error.response.status === 401 && error.response.data.message === 'Unauthenticated.'){
        store.dispatch('AUTH_LOGOUT', error).then(() => router.push('/login'))
    } else {
        return Promise.reject(error)
    }
})

router.beforeEach((to, from, next) => {
    if (to.meta.public){
        document.title = to.meta.title
    } else {
        document.title = to.meta.title ? to.meta.title +' | ' + import.meta.env.VITE_NAME : import.meta.env.VITE_NAME
    }

    // Perform Redirect
    if (store.getters.redirect !== null){
        let redirect = store.getters.redirect
        store.commit('SET_REDIRECT', null)
        next(redirect)
    } else if (to.query.redirect){
        store.commit('SET_REDIRECT', from.fullPath)
    }

    if (to.meta.public){
        next()
    } else {
        if (['reset-password', 'register', 'invite', 'mock-device'].includes(to.name)) {
            next()
        } else if (store.getters.token === '' && to.name !== 'login') {
            next('login')
        } else if (store.getters.token !== '' && ['register', 'invite', 'login'].includes(to.name)) {
            next('dashboard')
        } else {
            if (to.meta.guard && store.getters.sections.indexOf(to.path) === -1) {
                next('/permission-error')
            } else {
                next()
            }
        }
    }
})

const app = createApp({
    created(){
        return this.$store.dispatch('AUTH_CONFIRM').then((error) => {
            if (error){
                router.push('/login').then()
            }
        })
    },
    render: () => h(App)
})

registerCore(app)

app.use(store)
app.use(router)
app.mount('#app')

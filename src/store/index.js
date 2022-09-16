import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import UserModule from './modules/user'
import FiltersModule, { initialState as initialFiltersState } from './modules/filters'
import DataModule, { initialState as initialDataState } from './modules/data'
import { initialIndexState, indexGetters, indexMutations } from '@niftee-group/niftee-core/src/store'
window.API_URL = import.meta.env.VITE_API_URL
window.S3_URL = import.meta.env.VITE_S3_URL

const vuexLocal = new VuexPersistence({
    key: import.meta.env.VITE_LOCAL_STORAGE_KEY,
    storage: window.localStorage,
    reducer: (state) => ({
        user: {
            token: state.user.token,
            id: state.user.id,
            first: state.user.first,
            last: state.user.last,
            permissions: state.user.permissions,
            sections: state.user.sections,
            menu: state.user.menu,
            nimdarepus: state.user.nimdarepus,
            settings: state.user.settings,
            avatar: state.user.avatar
        },
        redirect: state.redirect,
        filters: state.filters,
        data: state.data,
        sidebarVisible: state.sidebarVisible
    })
})

export default createStore({
    modules: {
        user: UserModule,
        filters: FiltersModule,
        data: DataModule
    },
    state: {
        ...initialIndexState
    },
    mutations: {
        ...indexMutations,
        CLEAR_CACHE: (state) => {
            state.user.permissions = []
            state.user.groups = []
            state.user.sections = []
            state.user.menu = []
            state.data = initialDataState
            state.filters = initialFiltersState
        }
    },
    getters: {
        ...indexGetters
    },
    plugins: [
        vuexLocal.plugin
    ]
})

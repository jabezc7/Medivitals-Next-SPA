import { initialUserState, userActions, userGetters } from '@niftee-group/niftee-core/src/store/user'

export const initialState = {
    ...initialUserState,
    avatar: null
}

const state = initialState

const mutations = {
    AUTH_SUCCESS: (state, payload) => {
        if (payload.token){
            state.token = payload.token
        }

        state.id = payload.user.id
        state.first = payload.user.first
        state.last = payload.user.last
        state.slug = payload.user.slug
        state.email = payload.user.email
        state.company_name = payload.user.company_name
        state.permissions = payload.user.permissions.map(permission => {
            return permission.route
        })
        state.groups = payload.user.groups
        state.menu = payload.user.menu
        state.sections = payload.user.sections.map(section => {
            return section.route
        })
        state.nimdarepus = payload.user.nimdarepus
        state.emailProvider = payload.user.email_provider
        state.mobile = payload.user.mobile
        state.position = payload.user.position
        state.signature = payload.user.signature
        state.settings = payload.user.settings
        state.avatar = payload.user.avatar
        state.activeSubscription = payload.activeSubscription
    },
    AUTH_RELOAD: (state, payload) => {
        if (payload.token){
            state.token = payload.token
        }

        state.id = payload.id
        state.first = payload.first
        state.last = payload.last
        state.slug = payload.slug
        state.email = payload.email
        state.company_name = payload.company_name
        state.permissions = payload.permissions.map(permission => {
            return permission.route
        })
        state.groups = payload.groups
        state.menu = payload.menu
        state.sections = payload.sections.map(section => {
            return section.route
        })
        state.nimdarepus = payload.nimdarepus
        state.emailProvider = payload.email_provider
        state.mobile = payload.mobile
        state.position = payload.position
        state.signature = payload.signature
        state.settings = payload.settings
        state.avatar = payload.avatar
        state.activeSubscription = payload.activeSubscription
    },
    CLEAR_SESSION: (state) => {
        state.token = ''
        state.id = ''
        state.first = ''
        state.last = ''
        state.slug = ''
        state.permissions = []
        state.groups = []
        state.sections = []
        state.menu = []
        state.nimdarepus = null
        state.emailProvider = null
        state.signature = null
        state.settings = {}
        state.avatar = null
    },
}

const getters = {
    ...userGetters,
}

const actions = {
    ...userActions,
}

const module = {
    state,
    mutations,
    getters,
    actions
}

export default module

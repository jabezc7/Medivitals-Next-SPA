import { get, initialDataState, dataActions, dataGetters, dataMutations } from '@niftee-group/niftee-core/src/store/data'

export const initialState = {
    ...initialDataState,
    date: '',
    dataTypes: [],
    vitalTypes: [],
    automationActions: []
}

const state = initialState

const actions = {
    ...dataActions,
    GET_DATA_TYPE({ commit }){
        return get(commit, 'SET_DATA_TYPE', '/types', {
            params: {
                filters: { group: {name: 'group', value: 'data-types' }},
                sortColumn: 'ordering',
                sortDir: 'ASC'
            }
        })
    },
    GET_VITAL_TYPES({ commit }){
        return get(commit, 'SET_VITAL_TYPES', '/types', {
            params: {
                filters: { group: {name: 'group', value: 'vital-types' }},
                sortColumn: 'name',
                sortDir: 'ASC'
            }
        })
    },
    GET_AUTOMATION_ACTIONS({ commit }){
        return get(commit, 'SET_AUTOMATION_ACTIONS', '/types', {
            params: {
                filters: { group: {name: 'group', value: 'automation-actions' }},
                sortColumn: 'name',
                sortDir: 'ASC'
            }
        })
    },
}

const mutations = {
    ...dataMutations,
    SET_DATA_TYPE(state, payload) {
        state.dataTypes = payload
    },
    SET_VITAL_TYPES(state, payload) {
        state.vitalTypes = payload
    },
    SET_AUTOMATION_ACTIONS(state, payload) {
        state.automationActions = payload
    },
}

const getters = {
    ...dataGetters,
    dataTypes: state => {
        return state.dataTypes
    },
    vitalTypes: state => {
        return state.vitalTypes
    },
    automationActions: state => {
        return state.automationActions
    },
    date: state => {
        return state.date
    }
}

const module = {
    state,
    mutations,
    getters,
    actions
}

export default module

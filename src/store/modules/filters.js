import { initialFilterState, filterGetters, filterMutations } from '@niftee-group/niftee-core/src/store/filters'

export const initialState = {
    ...initialFilterState,
    devices: {},
    patients: {},
    data: {},
}

const state = initialState

const getters = {
    ...filterGetters,
    data: state => {
        return state.data
    }
}

const mutations = {
    ...filterMutations,
    SET_DATA_FILTER: (state, [ search, startDate, endDate ]) => {
        state.data = { 
            'search' : { 'value': search },
            'date': { 'startDate': startDate, 'endDate': endDate }
        }
    }
}

const module = {
    state,
    mutations,
    getters
}

export default module

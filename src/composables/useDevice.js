import { reactive } from 'vue'
import axios from 'axios'

const useDevice = () => {
    const deviceState = reactive({
        loading:  false,
        deviceList: [],
        activeDeviceList: [],
        insertLoading: false,
        response: {
            status: true,
            message: ''
        }
    })

    async function getDeviceList() {
        deviceState.loading = true
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/devices`)
            const { data, status } = response

            deviceState.deviceList =data 
        } catch (e) {
            console.error(e)
        }
        deviceState.loading = false
    }

    async function getActiveDeviceList(patientID) {
        deviceState.loading = true
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/patients/${patientID}`)
            const { data, status } = response

            deviceState.activeDeviceList = data.devices 
        } catch (e) {
            console.error(e)
        }
        deviceState.loading = false
    }

    async function unLinkDevice(patient, deviceID) {
        deviceState.loading = true
        try {
            const params = {
                 device_id : deviceID,
                 patient_id: patient.id
            }
            await axios.post(`${import.meta.env.VITE_API_URL}/patients/unlinkDevice/`, params)
        } catch (e) {
            console.error(e)
        }
        deviceState.loading = false
    }

    async function addDevice(patient, deviceID) {
        deviceState.insertLoading = true
        try {
            const params = {
                device_id : deviceID,
                patient_id: patient.id
            }
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/patients/addDevice`, params)
            const { data, status } = response

            deviceState.response.status = data.success
            deviceState.response.message = data.message
        } catch (e) {
            deviceState.response.status = false
            deviceState.response.message = `Device was already assigned!`
        }
        deviceState.insertLoading = false
    }

    return {
        deviceState, 
        getActiveDeviceList,
        unLinkDevice,
        getDeviceList,
        addDevice
    }
}

export default useDevice
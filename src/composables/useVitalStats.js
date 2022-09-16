import { ref } from 'vue'
import axios from 'axios'

const useVitalStats = () => {
    const loading = ref(false)
    const isShown = ref(true)
    const vitals = ref([
        {
            title: 'Blood Pressure',
            value: ``,
            last_reading: '',
            unit: 'mmHg',
            items: [
                {
                    name: 'Systolic Blood Pressure',
                    value: '',
                    unit: 'mmHg'
                },
                {
                    name: 'Dyastolic Blood Pressure',
                    value: '',
                    unit: 'mmHg'
                }
            ],
            series: [],
            categories: [],
            isShown: true,
            filter: 4
        },
        {
            title: 'Heart Rate',
            value: '87',
            last_reading: '05:38',
            unit: 'bpm',
            items: [
                {
                    name: 'Heart Rate',
                    value: 87,
                    unit: 'bpm'
                },
            ],
            series: [
                {
                    name: 'BPM',
                    data: [1,2,3,10]
                }
            ],
            categories: ['02:00', '03:00', '04:00', '05:00'],
            isShown: true,
            filter: 4
        },
        {
            title: 'Temperature',
            value: '20.8',
            last_reading: '05:38',
            unit: '°c',
            items: [
                {
                    name: 'Temperature',
                    value: 20.8,
                    unit: '°c'
                },
            ],
            series: [
                {
                    name: 'Temperature',
                    data: [33.6, 25.4, 31, 35.9]
                }
            ],
            categories: ['02:00', '03:00', '04:00', '05:00'],
            isShown: true,
            filter: 4
        },
        {
            title: 'O2 Saturation',
            value: '99',
            last_reading: '05:38',
            unit: '%',
            items: [
                {
                    name: 'O2 Saturation',
                    value: 99,
                    unit: '%'
                },
            ],
            series: [
                {
                    name: 'Saturation',
                    data: [10.6, 14.4, 31, 21.9]
                }
            ],
            categories: ['02:00', '03:00', '04:00', '05:00'],
            isShown: true,
            filter: 4
        },
        {
            title: 'Respiratory Rate',
            value: '21.75',
            last_reading: '05:38',
            unit: 'bpm',
            items: [
                {
                    name: 'Respiratory Rate',
                    value: 21.75,
                    unit: 'bpm'
                },
            ],
            series: [
                {
                    name: 'BPM',
                    data: [2, 4.4, 2, 6.9]
                }
            ],
            categories: ['02:00', '03:00', '04:00', '05:00'] ,
            isShown: true,
            filter: 4
        }
    ])

    const chartFilters = ref([
        { title: 'Last Hour',
            range: 1
        },
        { title: 'Last 4 Hour',
            range: 4
        },
        { title: 'Last 12 Hour',
            range: 12
        },
        {
            title: 'Last 24 Hour',
            range: 24,
        },
        {
            title: 'Last 30 Days',
            range: 720,
        },
        {
            title: 'All',
            range: -1,
        }
    ])

    async function getChartData(patientID, range, sections) {
        loading.value = true
        isShown.value = false
        try {

            const params = {
                patient_id : patientID,
                range:  range,
                sections: sections
            }

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/patients/get-vital-stats`, params)
            const { data } = response.data

            if (sections.includes('Blood Pressure')) {
                vitals.value[0] = {
                    title: 'Blood Pressure',
                    value: `${data.blood_pressure[3]}/${data.blood_pressure[4]}`,
                    last_reading: data.blood_pressure[2],
                    unit: 'mmHg',
                    items: [
                        {
                            name: 'Systolic Blood Pressure',
                            value: data.blood_pressure[3],
                            unit: 'mmHg'
                        },
                        {
                            name: 'Dyastolic Blood Pressure',
                            value: data.blood_pressure[4],
                            unit: 'mmHg'
                        }
                    ],
                    series: data.blood_pressure[1],
                    categories: data.blood_pressure[0],
                    isShown: true,
                    filter: data.blood_pressure[5]
                }
            }

            if (sections.includes('Heart Rate')) {
                vitals.value[1] = {
                    title: 'Heart Rate',
                    value: data.heart_rate[3],
                    last_reading: data.heart_rate[2],
                    unit: 'bpm',
                    items: [
                        {
                            name: 'Heart Rate',
                            value: data.heart_rate[3],
                            unit: 'bpm'
                        },
                    ],
                    series: data.heart_rate[1],
                    categories:  data.heart_rate[0],
                    isShown: true,
                    filter: data.heart_rate[4]
                }
            }

            if (sections.includes('Temperature')) {
                vitals.value[2] = {
                    title: 'Temperature',
                    value: data.temperature[3],
                    last_reading: data.temperature[2],
                    unit: '°c',
                    items: [
                        {
                            name: 'Temperature',
                            value: data.temperature[3],
                            unit: '°c'
                        },
                    ],
                    series: data.temperature[1],
                    categories: data.temperature[0],
                    isShown: true,
                    filter: data.temperature[4]
                }
            }

            if (sections.includes('O2 Saturation')) {
                vitals.value[3] =  {
                    title: 'O2 Saturation',
                    value: data.oxygen_saturation[3],
                    last_reading: data.oxygen_saturation[2],
                    unit: '%',
                    items: [
                        {
                            name: 'O2 Saturation',
                            value: data.oxygen_saturation[3],
                            unit: '%'
                        },
                    ],
                    series: data.oxygen_saturation[1],
                    categories: data.oxygen_saturation[0],
                    isShown: true,
                    filter: data.oxygen_saturation[4]
                }
            }

            if (sections.includes('Respiratory Rate')) {
                {
                    vitals.value[4] = {
                        title: 'Respiratory Rate',
                        value: data.respiratory[3],
                        last_reading: data.respiratory[2],
                        unit: 'bpm',
                        items: [
                            {
                                name: 'Respiratory Rate',
                                value: data.respiratory[3],
                                unit: 'bpm'
                            },
                        ],
                        series: data.respiratory[1],
                        categories: data.respiratory[0],
                        isShown: true,
                        filter: data.respiratory[4]
                    }
                }
            }
        } catch (e) {
            console.error(e)
        }
        loading.value = false
        isShown.value = true
    }

    return {
        loading,
        isShown,
        vitals,
        getChartData,
        chartFilters
    }
}

export default useVitalStats

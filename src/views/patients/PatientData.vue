<template>
    <div id="patientDiv">
        <page-header :buttons="pageActions.buttons" :additional="pageActions.additional" @method="methodHandler">
            <template #title>
                Patient Data
            </template>
        </page-header>
    </div>
    <div id="patientDivBody">
        <grid-content :row-gap="0" class="pt-1">
            <div class="col-span-12 mb-6">
                <pro-table
                    ref="datatable"
                    :resource="resource"
                    :fields="fields"
                    :filters="filters"
                    :filters-loading="filtersLoading"
                    :limit="10"
                    class="lg:px-6 px-4 pt-2 device-table sm:px-0"
                    sort="created_at"
                    style="padding: 0px !important"
                    direction="DESC"
                    :allow-double-click="false"
                    :actions="{
                        display: false,
                        class: [],
                        options: [

                        ]
                    }"
                />
            </div>
        </grid-content>
    </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { datetime } from '@niftee-group/niftee-core/src/utils/datetime'
import { proTable } from '@niftee-group/niftee-core/src/components/pro-table/utils/proTable'
import axios from 'axios'

export default {
    name: 'PatientsData',
    components: { },
    props: {
        patient: {
            type: Object,
            required: true
        },
    },
    setup (props) {
        const {
            resource,
            filters,
            filtersLoading,
            numberOfFilters,
            methodHandler,
            store,
            methods,
            typeFilter,
            inputFilter
        } = proTable()
        const { dayjs } = datetime()

        resource.value = 'data'
        numberOfFilters.value = 2

        store.commit('SET_DATA_FILTER', [props.patient.id, dayjs(new Date()).subtract(1, 'week').format('YYYY-MM-DD'),  dayjs(new Date()).format('YYYY-MM-DD')])

        const pageActions = ref({
            buttons: [
                {
                    label: 'Export Data',
                    icon: 'download',
                    type: 'method',
                    method: 'exportData',
                    iconClass: 'text-default-500'
                }
            ],
            additional: []
        })

        const fields = [
            {
                name: 'Timestamp',
                column: 'created_at',
                sortCol: 'created_at',
                date: true,
                format: 'DD/MM/YYYY hh:mm a'
            },
            {
                name: 'Device',
                column: 'device',
            },
            {
                name: 'Type',
                column: 'data_type',
            },
            {
                name: 'Value',
                column: 'value',
            }
        ]

        methods.value.exportData = async () => {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/data/export`)
            window.location = `${response.data.data.url}&filters=${JSON.stringify(store.getters.data)}`
        }

        onBeforeMount(() => {
            inputFilter('date', {
                label: 'Date',
                name: 'date',
                type: 'dateRange',
                width: 'md:w-1/4 w-1/2',
                placeholder: 'Select Date...'

            },
            {
                'endDate': dayjs(new Date()).subtract(1, 'week').format('YYYY-MM-DD'),
                'startDate': dayjs(new Date()).format('YYYY-MM-DD')
            }
            )

            typeFilter('dataTypes', 'GET_DATA_TYPE', 'type', {
                label: 'Type',
                name: 'type',
                type: 'select',
                width: 'md:w-1/4 w-1/2',
                placeholder: 'Select Type...'
            })

            store.dispatch('GET_DATA_TYPE')
        })

        return {
            dayjs,
            resource,
            fields,
            filters,
            filtersLoading,
            pageActions,
            methodHandler
        }
    }
}
</script>

<style>
    .device-table svg {
        width: 12px !important;
    }

    .device-table table th:last-child {
        display: none !important;
    }

    #patientDivBody .daterangepicker {
        z-index: 999999999999 !important;
    }

    #patientDivBody .daterangepicker.opensleft {
        left: 0  !important;
    }

    #patientDiv {
        border-bottom: 2px solid #1F1F1F !important;
        padding-bottom: 7px;
    }

    #patientDiv a {
        padding: 0.25rem 0.75rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        background: #296481;
        color: white !important;
    }

    #patientDiv svg {
        color: white !important;
    }

    #patientDiv div:first-child {
        background: #f6f6f6;
        border: 0px;
        padding: 0px;
    }

    #patientDiv div:first-child h1 {
        font-size: 1.125rem;
        line-height: 1.75rem;
        color: #1f1f1f;
        font-weight: 500;
    }

</style>

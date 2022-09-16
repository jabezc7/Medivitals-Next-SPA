<template>
    <div class="grow">
        <page-header :buttons="pageActions.buttons" :additional="pageActions.additional" @method="methodHandler">
            <template #title>
                Devices
            </template>
        </page-header>
        <InnerContent>
            <pro-table
                ref="datatable"
                :resource="resource"
                :fields="fields"
                :filters="filters"
                :filters-loading="filtersLoading"
                :limit="100"
                class="lg:px-6 px-4 pt-2"
                sort="nickname"
                direction="ASC"
                delete-label="number"
                :allow-double-click="false"
                @action="actionHandler"
            />
        </InnerContent>
    </div>
</template>

<script>
import { onBeforeMount } from 'vue'
import { proTable } from '@niftee-group/niftee-core/src/components/pro-table/utils/proTable'
import axios from 'axios'

export default {
    name: 'DevicesList',
    setup () {
        const {
            resource,
            filters,
            filtersLoading,
            actionHandler,
            methodHandler,
            headerFixed,
            numberOfFilters,
            searchFilter,
            methods,
        } = proTable()

        resource.value = 'devices'
        numberOfFilters.value = 1

        const pageActions = {
            buttons: [
                {
                    label: 'New Device',
                    icon: 'plus',
                    type: 'router-link',
                    link: '/devices/create',
                    iconClass: 'text-green-600'
                }
            ],
            additional: []
        }

        const fields = [
            {
                name: 'Imei',
                column: 'imei',
                sortCol: 'emei'
            },
            {
                name: 'Number',
                column: 'number',
            },
            {
                name: 'Nickname',
                column: 'nickname',
            }
        ]

        onBeforeMount(() => {
            searchFilter()
        })

        methods.value.exportMembers = async () => { }

        return {
            resource,
            fields,
            pageActions,
            filtersLoading,
            actionHandler,
            methodHandler,
            filters,
            headerFixed
        }
    }
}
</script>

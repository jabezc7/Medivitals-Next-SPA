<template>
    <div class="grow">
        <page-header :buttons="pageActions.buttons" :additional="pageActions.additional" @method="methodHandler">
            <template #title>
                Automations
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
                sort="name"
                direction="ASC"
                delete-label="name"
                :allow-double-click="false"
                @action="actionHandler"
            />
        </InnerContent>
    </div>
</template>

<script>
import { onBeforeMount } from 'vue'
import { proTable } from '@niftee-group/niftee-core/src/components/pro-table/utils/proTable'

export default {
    name: 'Automations',
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

        resource.value = 'automations'
        numberOfFilters.value = 1

        const pageActions = {
            buttons: [
                {
                    label: 'New Automation',
                    icon: 'plus',
                    type: 'router-link',
                    link: '/automations/create',
                    iconClass: 'text-green-600'
                }
            ],
            additional: []
        }

        const fields =[
            {
                name: 'Name',
                column: 'name',
                sortCol: 'name'
            },
            {
                name: 'Patient',
                column: 'patient',
            },
            {
                name: 'Global',
                column: 'global',
                boolean: true,
                align: 'center'
            },
            {
                name: 'Active',
                column: 'active',
                toggle: true,
                boolean: true,
                align: 'center'
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

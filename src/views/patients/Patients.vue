<template>
    <div class="grow">
        <page-header :buttons="pageActions.buttons" :additional="pageActions.additional" @method="methodHandler">
            <template #title>
                Patients
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
                sort="first"
                direction="ASC"
                delete-label="full_name"
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
    name: 'PatientsList',
    setup () {
        const {
            resource,
            filters,
            filtersLoading,
            actionHandler,
            methodHandler,
            headerFixed,
            numberOfFilters,
            searchFilter
        } = proTable()

        resource.value = 'patients'
        numberOfFilters.value = 1

        const pageActions = {
            buttons: [
                {
                    label: 'New Patient',
                    icon: 'plus',
                    type: 'router-link',
                    link: '/patients/create',
                    iconClass: 'text-green-600'
                }
            ],
            additional: []
        }

        const fields = [
            {
                name: 'Name',
                column: 'full_name',
                sortCol: 'first'
            },
            {
                name: 'Email',
                column: 'email',
            },
            {
                name: 'Mobile',
                column: 'mobile',
            },
            {
                name: 'Assigned To',
                column: 'assignee.full_name',
            },
            {
                name: 'Active',
                column: 'active',
                align: 'center',
                boolean: true,
            }
        ]

        onBeforeMount(() => {
            searchFilter()
        })

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

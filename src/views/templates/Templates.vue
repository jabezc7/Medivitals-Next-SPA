<template>
    <div class="grow">
        <page-header :buttons="pageActions.buttons" :additional="pageActions.additional" @method="methodHandler">
            <template #title>
                Templates
            </template>
        </page-header>
        <InnerContent>
            <pro-table ref="datatable"
                :resource="resource"
                prefix="configuration"
                :fields="fields"
                :filters="filters"
                :filters-loading="filtersLoading"
                :limit="100"
                class="px-6 lg:px-4 pt-2"
                sort="name"
                direction="ASC"
                delete-label="name"
                :allow-double-click="true"
                :actions="actions"
                @action="actionHandler"
            />
        </InnerContent>
        <modal v-if="showPreview" @close="showPreview = false">
            <template #heading>
                {{ selectedTemplate.name }} - Preview
            </template>
            <template #default>
                <span v-html="selectedTemplate.content" />
            </template>
        </modal>
    </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { proTable } from '@niftee-group/niftee-core/src/components/pro-table/utils/proTable'

export default {
    name: 'Templates',
    setup () {
        const { resource, filters, filtersLoading, actionHandler, methodHandler, headerFixed, numberOfFilters, searchFilter, typeFilter, methods } = proTable()
        resource.value = 'templates'
        numberOfFilters.value = 2

        const showPreview = ref(false)
        const selectedTemplate = ref(null)

        const actions = {
            display: true,
            class: [],
            options: [
                { label: 'View', method: 'preview', icon: 'eye',  type: 'method', tooltip: 'View', permissions: resource.value + '.show' },
                { label: 'Edit', link: 'edit', icon: 'edit', type: 'router-link', tooltip: 'Edit', permissions: resource.value + '.edit' },
                { label: 'Delete', method: 'delete', icon: 'trash-alt', type: 'method', tooltip: 'Delete', permissions: resource.value + '.destroy' }
            ]
        }

        const pageActions = {
            buttons: [
                {
                    label: 'New Template',
                    icon: 'plus',
                    type: 'router-link',
                    link: '/configuration/templates/create',
                    iconClass: 'text-green-600',
                }
            ],
            additional: []
        }

        const fields = [
            {
                name: 'Name',
                column: 'name',
            },
            {
                name: 'Type',
                column: 'type.name'
            },
            {
                name: 'Quick Link',
                column: 'quick_link',
                boolean: true,
                toggle: true,
                align: 'center'
            },
            {
                name: 'Active',
                column: 'active',
                boolean: true,
                toggle: true,
                align: 'center'
            }
        ]

        onBeforeMount(() => {
            searchFilter()
            typeFilter('templateTypes', 'GET_TEMPLATE_TYPES', 'type', {
                label: 'Type',
                name: 'type',
                type: 'select',
                width: 'lg:w-1/4 w-full',
                placeholder: 'Select Type...'
            })
        })

        methods.value.preview = (payload) => {
            selectedTemplate.value = payload.item
            showPreview.value = true
        }

        return {
            resource,
            fields,
            pageActions,
            filtersLoading,
            actionHandler,
            methodHandler,
            filters,
            headerFixed,
            showPreview,
            selectedTemplate,
            actions
        }
    }
}
</script>

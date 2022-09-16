<template>
    <div class="flex flex-col h-full">
        <spinner v-if="loading" />
        <page-header :buttons="pageActions.buttons" :additional="pageActions.additional" @method="methodHandler">
            <template #title>
                {{ item.number }}<small class="text-xs ml-2">Device</small>
            </template>
        </page-header>
        <div class="w-full flex flex-col overflow-hidden grow">
            <tabs
                ref="tabs"
                :tabs="pageTabs"
                :active="startTab"
                :dynamic="true"
                @setTab="setActiveTab"
            />
            <content-right-sidebar v-if="!loading" :fixed-tabs="true">
                <template #left>
                    <grid-content v-if="activeTab === 'details'" :row-gap="0">
                         <h2 class="w-full col-span-12 pb-2 border-b-2 border-charcoal-900 text-left font-medium text-charcoal-900 text-lg pt-px">
                            Device Details
                        </h2>
                        <table class="w-full mb-4 internal-table col-span-12">
                            <tbody>
                                <tr>
                                    <td class="w-32">
                                        IMEI
                                    </td>
                                    <td>{{ item.imei }}</td>
                                </tr>
                                <tr>
                                    <td>Number</td>
                                    <td>{{ item.number }}</td>
                                </tr>
                                <tr>
                                    <td>Nickname</td>
                                    <td>{{ item.nickname }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h2 class="w-full col-span-12 pb-2 border-b-2 border-charcoal-900 text-left font-medium text-charcoal-900 text-lg pt-px">
                            Current Patient
                        </h2>
                        <table class="w-full mb-1 col-span-12">
                            <thead>
                                <tr>
                                    <th class="table-head-cell">Name</th>
                                    <th class="table-head-cell">Email</th>
                                    <th class="table-head-cell">Mobile</th>
                                    <th class="table-head-cell w-full"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, i) in item.patients" :key="i">
                                    <td class="table-body-cell">
                                        <span class="font-normal text-sm"> {{ row.full_name }} </span>
                                    </td>
                                    <td class="table-body-cell">
                                        <span class="font-normal text-sm"> {{ row.email }} </span>
                                    </td>
                                    <td class="table-body-cell">
                                        <span class="font-normal text-sm"> {{ row.mobile }} </span>
                                    </td>
                                    <td class="table-body-cell">
                                        <router-link :to="`/patients/${row.id}/view`" class="data-v-tooltip text-right" data-v-tooltip="View patient" style="float: right"><i class="fa fas fa-eye"></i></router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </grid-content>
                </template>
                <template #right>
                    <grid-content :row-gap="0">
                        <h2 class="w-full col-span-12 pb-2 border-b-2 border-charcoal-900 text-left font-medium text-charcoal-900 text-lg pt-px">
                            Meta
                        </h2>
                        <table class="w-full mb-6 internal-table col-span-12">
                            <tbody>
                                <tr>
                                    <td>Last Updated</td>
                                    <td class="text-right">
                                        {{ dayjs(item.meta.updated_at).format("DD/MM/YYYY h:mm a") }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Created At</td>
                                    <td class="text-right">
                                        {{ dayjs(item.meta.created_at).format("DD/MM/YYYY h:mm a") }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Created By</td>
                                    <td v-if="item.meta.created_by" class="text-right">
                                        {{ item.meta.created_by.full_name }}
                                    </td>
                                    <td v-else class="text-right">
                                        N/A
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </grid-content>
                </template>
            </content-right-sidebar>
        </div>
        <confirmation-modal v-if="showDeleteModal" @close="closeDeleteModal" @confirm="deleteItem">
            <template #heading>
                Delete Confirmation
            </template>
            <template #content>
                Are you sure you want to delete - <strong>{{ item.number }}</strong>?
            </template>
            <template #confirm-button>
                Delete
            </template>
        </confirmation-modal>
    </div>
</template>

<script>
import { onMounted, watch, ref } from 'vue'
import { tabs as TabsUtil } from '@niftee-group/niftee-core/src/utils/tabs'
import { view } from '@niftee-group/niftee-core/src/utils/view'
import { datetime } from '@niftee-group/niftee-core/src/utils/datetime'
import { useRouter } from 'vue-router'
import tooltip from '@niftee-group/niftee-core/src/directives/tooltip'

export default {
    name: 'PatientView',
    components: { },
    directives: { tooltip },
    props: {
        id: {
            required: true,
            type: String
        }
    },
    setup(props) {
        const { dayjs } = datetime()
        const { startTab, activeTab, setActiveTab } = TabsUtil()
        const {
            resource,
            loading,
            methodHandler,
            item,
            returnPath,
            mounted,
            toast,
            store,
            showDeleteModal,
            closeDeleteModal,
            deleteItem,
            methods
        } = view()

        resource.value = 'devices'
        returnPath.value = '/devices'

        const pageActions = ref({})
        const pageTabs = [
            {
                name: 'Details',
                slug: 'details'
            }
        ]

        onMounted(async () => {
            const router = useRouter()

            await mounted(props, startTab).catch((error) => {
                router.push('/devices')
                toast.error(error)
            })
        })

        watch(item, (item) => {
            pageActions.value = {
                buttons: [
                    {
                        label: 'Edit',
                        icon: 'edit',
                        type: 'router-link',
                        link: '/devices/' + props.id + '/edit',
                        iconClass: 'text-gray-700',
                    },
                    {
                        label: 'Close',
                        icon: 'times',
                        type: 'router-link',
                        iconClass: 'text-red-500',
                        link: returnPath.value ? returnPath.value : '/devices'
                    }
                ],
                additional: [
                    {
                        label: 'Delete',
                        icon: 'trash-alt',
                        type: 'method',
                        method: 'deleteModal',
                        iconClass: 'text-red-500',
                        display: store.getters.nimdarepus
                    }
                ]
            }
        })
        methods.value.deleteModal = () => {
            showDeleteModal.value = true
        }

        return {
            loading,
            pageActions,
            methodHandler,
            item,
            pageTabs,
            startTab,
            setActiveTab,
            activeTab,
            dayjs,
            showDeleteModal,
            closeDeleteModal,
            deleteItem
        }
    }
}
</script>

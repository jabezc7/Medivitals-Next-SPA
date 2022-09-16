<template>
    <div class="flex flex-col h-full">
        <spinner v-if="loading" />
        <page-header :buttons="pageActions.buttons" :additional="pageActions.additional" @method="methodHandler">
            <template #title>
                {{ item.full_name }}<small class="text-xs ml-2">Patient</small>
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
                    <patient-details v-if="activeTab === 'details'" :item="item" />
                    <notes
                        v-if="!loading"
                        v-show="activeTab === 'notes'"
                        :id="item.id"
                        :notes="item.notes"
                        model="Patient"
                        @refresh="getData"
                    />
                    <patient-devices v-if="activeTab === 'devices'" :patient="item" />
                    <patient-vitals v-if="activeTab === 'vitals'" :patient="item" />
                    <patient-data v-if="activeTab === 'data'" :patient="item" />
                </template>
                <template #right>
                    <patient-meta :item="item" />
                </template>
            </content-right-sidebar>
        </div>
        <confirmation-modal v-if="showDeleteModal" @close="closeDeleteModal" @confirm="deleteItem">
            <template #heading>
                Delete Confirmation
            </template>
            <template #content>
                Are you sure you want to delete - <strong>{{ item.full_name }}</strong>?
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
import PatientDevices from './PatientDevices.vue'
import PatientDetails from './PatientDetails.vue'
import PatientMeta from './PatientMeta.vue'
import PatientVitals from './PatientVitals.vue'
import PatientData from './PatientData.vue'

export default {
    name: 'PatientView',
    components: { PatientDevices, PatientDetails, PatientMeta, PatientVitals, PatientData },
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
            methods,
            getData
        } = view()

        resource.value = 'patients'
        returnPath.value = '/patients'

        const pageActions = ref({})
        const pageTabs = [
            {
                name: 'Details',
                slug: 'details'
            },
            {
                name: 'Devices',
                slug: 'devices'
            },
            {
                name: 'Vitals',
                slug: 'vitals'
            },
            {
                name: 'Data',
                slug: 'data'
            },
            {
                name: 'Notes',
                slug: 'notes'
            },
            {
                name: 'Automations',
                slug: 'automations'
            }
        ]

        onMounted(async () => {
            const router = useRouter()

            await mounted(props, startTab).catch((error) => {
                router.push('/patients')
                toast.error(error)
            })
        })

        watch(item, () => {
            pageActions.value = {
                buttons: [
                    {
                        label: 'Edit',
                        icon: 'edit',
                        type: 'router-link',
                        link: '/patients/' + props.id + '/edit',
                        iconClass: 'text-gray-700',
                    },
                    {
                        label: 'Close',
                        icon: 'times',
                        type: 'router-link',
                        iconClass: 'text-red-500',
                        link: returnPath.value ? returnPath.value : '/patients'
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
            deleteItem,
            getData,
        }
    }
}
</script>

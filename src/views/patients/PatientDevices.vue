<template>
    <grid-content :row-gap="0">
        <div class="col-span-12 mb-6">
            <h2 class="w-full col-span-12 pb-2 border-b-2 border-charcoal-900 text-left font-medium text-charcoal-900 text-lg">
                Devices
                <button type="button" class="float-right text-sm py-1 px-3 bg-default-500 text-white ml-0 md:ml-0 flex flex-row items-center max-w-1/3" @click="add()">
                    <icon name="plus" type="light" class="text-white text-sm h-4 mr-2" />
                    <span>New Device</span>
                </button>
            </h2>
            <div class="overflow-x-auto">
                <table class="w-full mb-1 items-table">
                    <thead>
                        <tr>
                            <th class="table-head-cell">
                                IMEI
                            </th>
                            <th class="table-head-cell">
                                Number
                            </th>
                            <th class="table-head-cell">
                                Nickname
                            </th>
                            <th class="table-head-cell w-20" />
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in activeDeviceList" :key="i">
                            <td class="table-body-cell">
                                <span class="font-normal text-sm"> {{ row.imei }} </span>
                            </td>
                            <td class="table-body-cell">
                                <span class="font-normal text-sm"> {{ row.number }} </span>
                            </td>
                            <td class="table-body-cell">
                                <span class="font-normal text-sm"> {{ row.nickname }} </span>
                            </td>
                            <td class="table-body-cell">
                                <a
                                    href="Javascript:void(0)"
                                    class="data-v-tooltip text-center"
                                    data-v-tooltip="Unlink Device"
                                    @click="unLinkModal(row)"
                                ><i class="fa fas fa-unlink" /> </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </grid-content>
    <patient-add-device-modal v-if="showAddDeviceListModal" :patient="patient" :device-list="deviceState.deviceList" />
    <confirmation-modal v-if="showDeleteModal" @close="closeDeleteModal" @confirm="unLink">
        <template #heading>
            Unlink Confirmation
        </template>
        <template #content>
            Are you sure you want to unlink - <strong>{{ selectedDevice.nickname }} ({{ selectedDevice.imei }})</strong>?
        </template>
        <template #confirm-button>
            Unlink Device
        </template>
    </confirmation-modal>
</template>

<script>
import { onBeforeMount, onMounted, provide, ref } from 'vue'
import { view } from '@niftee-group/niftee-core/src/utils/view'
import PatientAddDeviceModal from './PatientAddDeviceModal.vue'
import useDevice from '@/composables/useDevice.js'

export default {
    name: 'PatientsDevices',
    components: { PatientAddDeviceModal },
    props: {
        patient: {
            type: Object,
            required: true
        },
    },
    setup (props) {
        const showAddDeviceListModal = ref(false)
        const selectedDevice = ref([])
        const activeDeviceList = ref([])

        const { deviceState, getActiveDeviceList, unLinkDevice, getDeviceList } = useDevice()

        const {
            resource,
            toast,
            showDeleteModal,
            closeDeleteModal
        } = view()

        resource.value = 'patients'

        function add() {
            showAddDeviceListModal.value = true
        }

        function unLinkModal(device) {
            selectedDevice.value = device
            showDeleteModal.value = true
        }

        async function unLink() {
            await unLinkDevice(props.patient, selectedDevice.value.id)
            toast.success('Device was successfully unlink')
            showDeleteModal.value = false

            getActiveDevice()
        }

        async function getActiveDevice() {
            await getActiveDeviceList(props.patient.id)
            activeDeviceList.value = deviceState.activeDeviceList
        }

        onBeforeMount(async () => {
            getDeviceList()
        })

        onMounted(() => {
            activeDeviceList.value = props.patient.devices
        })

        provide('MODAL', { showAddDeviceListModal, getActiveDevice })
        return {
            add,
            selectedDevice,
            unLink,
            unLinkModal,
            showAddDeviceListModal,
            showDeleteModal,
            closeDeleteModal,
            deviceState,
            activeDeviceList
        }
    }
}
</script>

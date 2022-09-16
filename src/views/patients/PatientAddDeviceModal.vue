<template>
    <div class="fixed sm:bottom-0 sm:inset-x-0 px-4 pb-4 inset-0 flex items-center justify-center" style="z-index:2147483647;">
        <div class="fixed inset-0 transition-opacity" @click="close">
            <div class="absolute inset-0 bg-black opacity-75" />
        </div>
        <transition name="bounce">
            <div v-show="visible"
                class="z-10 bg-white overflow-hidden shadow-xl transition-all max-w-lg w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
            >
                <div class="bg-white px-4 pt-5 p-6 pb-4">
                    <div class="block absolute top-0 right-0 pt-5 pr-4">
                        <button
                            type="button"
                            class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                            aria-label="Close"
                            @click="close"
                        >
                            <svg
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div class="sm:flex sm:items-start border-b border-gray-400 mb-5">
                        <div class="text-left">
                            <h3 id="modal-headline" class="text-lg leading-6 font-medium text-black pb-2">
                                <slot name="heading">
                                   Add Device
                                </slot>
                            </h3>
                        </div>
                    </div>
                    <input-select
                        v-model="selectedDevice"
                        class="w-full mt-5 mb-5"
                        label="Nickname(IMEI)"
                        placeholder="Nickname (IMEI)"
                        name="device_id"
                        return="value"
                        :options="deviceList"
                    />
                </div>
                <div class="bg-gray-200 px-4 py-2 mt-5 flex flex-row justify-end">
                    <button type="button" class="h-10 justify-center border border-gray-500 px-6 py-2 ml-2 bg-white text-base font-medium text-gray-900 shadow-sm hover:bg-gray-300 focus:outline-none"
                        @click="close">
                        Cancel
                    </button>
                    <button type="button" class="h-10 justify-center border border-transparent px-10 py-2 ml-2 bg-default-500 text-base font-medium text-white shadow-sm hover:bg-default-700 focus:outline-none"
                        @click="add()">
                        <slot name="submit-button">
                            <span v-if="!deviceState.insertLoading">
                                Save
                            </span>
                            <span v-else>
                                <icon class="h-5 w-5 text-white" name="spinner-third" :spin="true" />
                            </span>
                        </slot>
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import { inject, ref } from 'vue'
import { view } from '@niftee-group/niftee-core/src/utils/view'
import useDevice from '@/composables/useDevice.js'

export default {
    name: 'AddDeviceModal',
    props: {
        patient: {
            default: [],
            type: Object
        },
        deviceList: {
            default: [],
            type: Object
        }
    },
    setup (props, { emit }) {

        const  { showAddDeviceListModal, getActiveDevice } = inject('MODAL')

        const visible = ref(true)
        const { toast } = view()
        const selectedDevice = ref()

        const { deviceState, addDevice } = useDevice()

        function close(){
            showAddDeviceListModal.value = false
        }

        async function add() {
            await addDevice(props.patient, selectedDevice.value)
            
            if(deviceState.response.status == true)
                toast.success(deviceState.response.message)
            else 
                toast.error(deviceState.response.message)

            showAddDeviceListModal.value = false
            getActiveDevice()
        }

        return {
            close,
            confirm,
            visible,
            add,
            deviceState,
            selectedDevice
        }
    }
}
</script>

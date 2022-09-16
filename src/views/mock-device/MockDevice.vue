<template>
    <div class="bg-gray-400 fixed inset-0 flex flex-row">
        <div class="w-2/3 relative h-screen flex">
            <div class="flex flex-col flex-grow">
                <div class="absolute left-0 top-0 bottom-0 w-75 p-4">
                    <h2 class="font-bold">
                        Mock Commands (Device -> Server)
                    </h2>
                    <ul>
                        <li class="flex flex-col mt-2">
                            <label>Temperature</label>
                            <div class="flex flex-row">
                                <input
                                    v-model="temperature"
                                    type="text"
                                    class="focus:ring-0 focus:outline-none text-sm py-1 px-2 w-16"
                                >
                                <button
                                    type="button"
                                    class="bg-default-400 text-white px-3"
                                    @click="mockWatch('temperature')"
                                >
                                    Send
                                </button>
                            </div>
                        </li>
                        <li class="flex flex-col mt-2">
                            <label>HR</label>
                            <div class="flex flex-row">
                                <input
                                    v-model="heartRate"
                                    type="text"
                                    class="focus:ring-0 focus:outline-none text-sm py-1 px-2 w-16"
                                >
                                <button
                                    type="button"
                                    class="bg-default-400 text-white px-3"
                                    @click="mockWatch('heart-rate')"
                                >
                                    Send
                                </button>
                            </div>
                        </li>
                        <li class="flex flex-col mt-2">
                            <label>Heart Rate & Blood Pressure</label>
                            <div class="flex flex-row">
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="text-xs">
                                            HR
                                        </td>
                                        <td class="text-xs">
                                            BP (SBP)
                                        </td>
                                        <td class="text-xs">
                                            BP (DBP)
                                        </td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input
                                                v-model="heartRate2"
                                                type="text"
                                                class="focus:ring-0 focus:outline-none text-sm py-1 px-2 w-16"
                                            >
                                        </td>
                                        <td>
                                            <input
                                                v-model="bpSystolic"
                                                type="text"
                                                class="focus:ring-0 focus:outline-none text-sm py-1 px-2 w-16"
                                            >
                                        </td>
                                        <td>
                                            <input
                                                v-model="bpDiastolic"
                                                type="text"
                                                class="focus:ring-0 focus:outline-none text-sm py-1 px-2 w-16"
                                            >
                                        </td>
                                        <td class="bg-default-400">
                                            <button
                                                type="button"
                                                class="bg-default-400 text-white px-3 h-full"
                                                @click="mockWatch('hr-bp')"
                                            >
                                                Send
                                            </button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </li>
                        <li class="flex flex-col mt-2">
                            <label>HR, BP, SP02, Blood Sugar</label>
                            <div class="flex flex-row">
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="text-xs">
                                            HR
                                        </td>
                                        <td class="text-xs">
                                            BP (SBP)
                                        </td>
                                        <td class="text-xs">
                                            BP (DBP)
                                        </td>
                                        <td class="text-xs">
                                            SP02
                                        </td>
                                        <td class="text-xs">
                                            Blood Sugar
                                        </td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input
                                                v-model="heartRate3"
                                                type="text"
                                                class="focus:ring-0 focus:outline-none text-sm py-1 px-2 w-16"
                                            >
                                        </td>
                                        <td>
                                            <input
                                                v-model="bpSystolic2"
                                                type="text"
                                                class="focus:ring-0 focus:outline-none text-sm py-1 px-2 w-16"
                                            >
                                        </td>
                                        <td>
                                            <input
                                                v-model="bpDiastolic2"
                                                type="text"
                                                class="focus:ring-0 focus:outline-none text-sm py-1 px-2 w-16"
                                            >
                                        </td>
                                        <td>
                                            <input
                                                v-model="bloodOxygen"
                                                type="text"
                                                class="focus:ring-0 focus:outline-none text-sm py-1 px-2 w-16"
                                            >
                                        </td>
                                        <td>
                                            <input
                                                v-model="bloodSugar"
                                                type="text"
                                                class="focus:ring-0 focus:outline-none text-sm py-1 px-2 w-16"
                                            >
                                        </td>
                                        <td class="bg-default-400">
                                            <button
                                                type="button"
                                                class="bg-default-400 text-white px-3 h-full"
                                                @click="mockWatch('hr-bp-sp02-bs')"
                                            >
                                                Send
                                            </button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="flex justify-center">
                    <div class="relative ml-80">
                        <img src="/watch-bg.png" alt="watch">
                        <div class="absolute text-white" style="top: 22%; left: 14%; width: 68%;">
                            <div class="flex flex-row flex-nowrap px-6 pt-6 justify-between text-xl">
                                <span class="font-bold">03/09/2022</span>
                                <div class="flex flex-row space-x-2 items-center">
                                    <span class="uppercase text-green-600 font-bold">Online</span>
                                    <div class="w-12 border border-green-600 h-5">
                                        <div class="bg-green-600 w-8 h-full" />
                                    </div>
                                </div>
                            </div>
                            <!-- MAIN VIEW -->
                            <div v-if="view === 'main'" class="w-full px-4 mt-6 flex flex-col justify-center">
                                <img src="/logo.png" alt="logo">
                                <div class="text-4xl font-bold text-center py-8 text-yellow-500">
                                    Hello Peter
                                </div>
                                <div class="grid grid-cols-2 gap-x-4">
                                    <div class="bg-red-500 text-white py-3 text-center uppercase font-bold text-lg rounded-md cursor-pointer">
                                        Call
                                    </div>
                                    <div class="bg-green-600 text-white py-3 text-center uppercase font-bold text-lg rounded-md cursor-pointer">
                                        Messages
                                    </div>
                                </div>
                                <div class="flex flex-col mt-6">
                                    <span class="text-center text-xs mt-2">Bio-Band ID: 123456</span>
                                </div>
                            </div>
                            <!-- TESTING VIEW -->
                            <div v-if="view === 'testing'" class="w-full px-4 mt-6 flex flex-row justify-center items-center text-red-500" style="height: 17rem">
                                <div class="flex flex-col animate-pulse">
                                    <svg class="h-60 w-60" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4h87c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31H476.3c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240h-132c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9H16c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1v5.8c0 16.9-2.8 33.5-8.3 49.1z"/>
                                    </svg>
                                    <div class="text-3xl font-bold w-full text-center">
                                        Testing...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-white flex flex-row z-50">
                <input
                    v-model="command"
                    class="bg-white w-full py-3 text-lg px-4 focus:outline-none focus:ring-0"
                    placeholder="Send Command to Device"
                    @click="sendCommant"
                >
                <button
                    type="button"
                    class="bg-default-500 text-white px-5 cursor-pointer "
                    :class="[!command ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-default-600']"
                    :disabled="!command"
                    @click="sendCommand"
                >
                    Send
                </button>
            </div>
        </div>
        <div class="w-1/3 bg-gray-300 p-4">
            <h2 class="font-bold mb-4">
                Logs:
            </h2>
            <ul>
                <li v-for="(log, index) in logs" :key="index" class="flex flex-row items-center pb-1">
                    <span class="mr-2 whitespace-nowrap">{{ dayjs(log.timestamp).format("DD/MM/YYYY HH:mm:ss") }}</span>
                    <span class="mr-2">
                        <svg
                            v-if="log.type === 'out'"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5 text-orange-400"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <svg
                            v-if="log.type === 'in'"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5 text-green-600"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <svg
                            v-if="log.type === 'info'"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5 text-gray-800"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                    </span>
                    <span>{{ log.message }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'

const view = ref('main')
const command = ref('')
const logs = ref([])
const connection = ref(null)
const temperature = ref(36.1)
const heartRate = ref(80)
const heartRate2 = ref(85)
const heartRate3 = ref(85)
const bpSystolic = ref(120)
const bpDiastolic = ref(80)
const bpSystolic2 = ref(130)
const bpDiastolic2 = ref(75)
const bloodOxygen = ref(95)
const bloodSugar = ref(90)

const storeLog = (message, type) => {
    logs.value.unshift({
        timestamp: new Date(),
        message: message,
        type: type
    })
}

const sendCommand = () => {
    connection.value.send(command.value)
    storeLog(command.value, 'out')
    command.value = null
}

const mockWatch = (type) => {
    let string = ''

    view.value = 'testing'

    if (type === 'temperature') {
        string = 'IWAP50,' + temperature.value + ',90#'
    }

    if (type === 'heart-rate') {
        string = 'IWAP49,' + heartRate.value + '#'
    }

    if (type === 'hr-bp') {
        string = 'IWAPHT,' + heartRate2.value + ',' + bpSystolic.value + ',' + bpDiastolic.value + '#'
    }

    if (type === 'hr-bp-sp02-bs') {
        string = 'IWAPHP,' + heartRate2.value + ',' + bpSystolic.value + ',' + bpDiastolic.value + ',' + bloodOxygen.value + ',' + bloodSugar.value + ',,,,,,,,#'
    }

    if (string) {
        setTimeout(() => {
            connection.value.send(string)
            view.value = 'main'
            storeLog(string, 'out')
        }, 3000)
    }
}

onMounted(() => {
    storeLog('Starting connection to Server', 'info')

    connection.value = new WebSocket('wss://server.medivitals.app')

    connection.value.onopen = () => {
        storeLog('Successfully connected to Server', 'info')
        command.value = 'IWAP00111111111111111#'
        sendCommand()
    }

    connection.value.onclose = () => {
        storeLog('Disconnected from Server', 'info')
    }

    connection.value.onmessage = (event) => {
        console.log(event)
        storeLog(event.data, 'in')
    }
})
</script>

<style scoped>

</style>

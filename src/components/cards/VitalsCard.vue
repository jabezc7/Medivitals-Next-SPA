<template>
    <div :class="`${height} py-10 bg-white  border-2 border-gray-200 rounded-lg overflow-hidden text-center`">
        <div class="rounded-full mt-5 border-8 border-default-500 h-40 w-40 grid gap-4 place-content-center mx-auto">
            <p class="text-charcoal-900 font-bold">
                <span class="text-xl">{{ vitals?.value }}</span>{{ vitals?.unit }}
            </p>
        </div>
        <div class="px-2">
            <p class="text-sm pt-5 pb-4 font-medium cursor-pointer text-charcoal-900 truncate">
                Last Reading: {{ vitals ? dayjs(vitals.last_reading).format('hh:mm A') : 'N/A' }}
            </p>
            <p v-for="(row, x) in vitals?.items" :key="x" class="text-sm pt-2 font-medium text-charcoal-900">
                {{ row.name }} <span class="text-2xl">{{ row.value }}</span> {{ row.unit }}
            </p>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import { datetime } from '@niftee-group/niftee-core/src/utils/datetime'

export default defineComponent({
    props: {
        vitals: {
            default: () => [],
            type: Array
        },
        height: {
            type: String,
            default: 'divmin-height'
        }
    },
    setup() {
        const { dayjs } = datetime()

        return {
            dayjs
        }
    },
})
</script>

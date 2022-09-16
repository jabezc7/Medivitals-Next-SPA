<template>
    <grid-content :row-gap="0">
        <div v-for="(vital, i) in vitals" :key="i" class="col-span-12 mb-2">
            <div class="pb-2 mx-auto sm:flex pt-3 sm:items-center sm:justify-between">
                <h3 class="w-full col-span-12 pb-2 text-left font-medium text-charcoal-900 text-lg pt-px">
                    {{ vital.title }}
                </h3>
                <div class="mt-3 flex sm:mt-0 sm:ml-4 gap-2">
                    <a v-if="vital.isShown " href="Javascript:void(0)" @click="vital.isShown = !vital.isShown"><i class="fa fa-chevron-up text-xl pt-2 font-black text-gentian-blue" /></a>
                    <a v-else href="Javascript:void(0)" @click="vital.isShown = !vital.isShown"><i class="fa fa-chevron-down text-xl font-black  pt-2 text-gentian-blue" /></a>
                </div>
            </div>
            <div v-if="vital.isShown" class="grid grid-cols-1 lg:gap-6 sm:grid-cols-1 lg:grid-cols-3">
                <div class="col-span-1 rounded-lg">
                    <div class="mb-4">
                        <vitals-card :vitals="patient.stats[i]" :height="`divmin-height-2x`" />
                    </div>
                </div>
                <div class="col-span-2 rounded-lg">
                    <div class="divmin-height-2x px-4 py-10 bg-white border-2 border-gray-200 rounded-lg overflow-hidden sm:p-6 text-center">
                        <div class="w-full gap-2 mb-5 px-4 grid grid-cols-3 sm:grid-cols-6">
                            <a
                                v-for="(chart, x) in chartFilters"
                                :key="x"
                                href="Javascript:void(0)"
                                class="text-left"
                                :class="{ 'text-charcoal-900 text-xs': chart.ranage !== vital.filter, 'text-default-900 font-black text-sm': chart.range == vital.filter }"
                                @click="setFilter(chart, i, vital.title)"
                            >
                                {{ chart.title }}
                            </a>
                        </div>
                        <spline-chart
                            v-if="isShown"
                            :series="vital.series"
                            :categories="vital.categories"
                            :unit="vital.unit"
                            :filter="vital.filter"
                        />
                    </div>
                </div>
            </div>
        </div>
    </grid-content>
</template>

<script>
import { ref, onMounted } from 'vue'
import SplineChart from '../../components/charts/SplineChart.vue'
import VitalsCard from '../../components/cards/VitalsCard.vue'
import useVitalStats from '../../composables/useVitalStats.js'

export default {
    name: 'PatientVitals',
    components: { SplineChart, VitalsCard },
    props: {
        patient: {
            type: Object,
            required: true
        },
    },
    setup (props) {

        const { loading, isShown, vitals, getChartData, chartFilters} = useVitalStats()

        const isBloodPressureCont = ref(true)
        const selectedFilter = ref({ title: 'Last 4 Hours', range: 4 })
        const selectedIndex = ref(1)
        const filter = ref('per-day')

        const sections = ref(['Blood Pressure', 'Heart Rate', 'Temperature', 'O2 Saturation', 'Respiratory Rate'])

        function setFilter(filter, index) {
            selectedFilter.value = filter
            selectedIndex.value = index

            getChartData(props.patient.id, selectedFilter.value.range, sections.value, index)
        }

        onMounted(async () => {
            await getChartData(props.patient.id, selectedFilter.value.range, sections.value, selectedIndex.value)
        })

        return {
            vitals,
            isBloodPressureCont,
            chartFilters,
            setFilter,
            selectedIndex,
            selectedFilter,
            loading,
            sections,
            filter,
            isShown
        }
    }
}
</script>
<style scoped>
    .divmin-height-2x {
        min-height: 470px;
        height: 470px;
    }
</style>

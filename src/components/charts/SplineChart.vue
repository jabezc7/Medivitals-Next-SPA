<template>
    <highcharts
        :options="options"
    />
</template>
<script>
import { defineComponent, computed } from 'vue'
import { Chart } from 'highcharts-vue'
import { datetime } from '@niftee-group/niftee-core/src/utils/datetime'

export default defineComponent({
    components: {
        highcharts: Chart
    },
    props: {
        series: {
            type: Object,
            default: []
        },
        categories: {
            type: Object,
            default: []
        },
        unit: {
            type: String
        },
        filter: {
            type: [String, Number],
            default: 'per-day'
        }
    },
    setup(props) {
        const { dayjs } = datetime()
        const options = computed(() => {
            return {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        rotation: 330,
                        formatter: function() {
                            if (props.filter != -1)
                                return dayjs(this.value).format('DD MMM');
                            else
                                return dayjs(this.value).format('MMMM');
                        },
                        style: {
                            fontSize: '14px'
                        }
                    },

                    categories: props.categories,
                    tickPositioner: function () {
                        let positions = []
                        if (props.filter != -1) {
                            let current_day = ''
                            for(let i = 0; i < props.categories.length; i++) {
                                let day = props.categories[i].split(' ')
                                if (current_day != day[0]) {
                                    current_day = day[0]
                                    positions.push(i)
                                }
                            }
                        } else {
                            let currentMonth = ''
                            for(let i = 0; i < props.categories.length; i++) {
                                let month = props.categories[i].split('-')
                                let m = `${month[0]-month[1]}`
                                if (currentMonth != m) {
                                    currentMonth = m
                                    positions.push(i)
                                }
                            }
                        }

                        return positions;
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        style: {
                            fontSize: '14px',
                        }
                    }
                },
                tooltip: {
                    formatter: function () {
                        return this.points.reduce(function (s, point) {
                            return `${s} <br>
                                    ${point.series.name} :
                                    ${point.y}  ${props.unit}`
                            }, `<b> Time: ${dayjs(this.x).format('MMM D, YYYY hh:mm A')} </b>`
                        )
                    },
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    series: {
                        marker: {
                            enabled: true,
                            radius: 5
                        }
                    }
                },
                colors: ['#005199', '#008fd1', '#06C', '#036', '#000'],
                series: props.series,
                credits: {
                    enabled: false
                }
            }
        })

        return {
            options
        }
    },
})
</script>

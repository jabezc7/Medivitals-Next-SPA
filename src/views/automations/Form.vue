<template>
    <form class="h-full overflow-hidden" @submit="onSubmit">
        <spinner v-if="loading" />
        <page-header
            :buttons="pageActions.buttons"
            :additional="pageActions.additional"
            @method="methodHandler"
            @submit="onSubmit"
        >
            <template #title>
                {{ type }} Automation
            </template>
        </page-header>
        <div v-show="errorMessage || Object.keys(errors).length !== 0" class="bg-red-200 py-2 text-red-700 text-center w-full -mt-px z-20" role="alert">
            <span v-if="errorMessage">{{ errorMessage }}</span>
            <span v-if="Object.keys(errors).length !== 0">Please complete all required fields</span>
        </div>
        <div class="w-full flex flex-col overflow-hidden grow">
            <tabs
                ref="tabs"
                :tabs="pageTabs"
                :active="startTab"
                @setTab="setActiveTab"
            />
            <content-right-sidebar v-if="!loading">
                <template #left>
                    <grid-content v-show="activeTab === 'details'">
                        <input-text
                            v-model="item.name"
                            class="col-span-12"
                            label="Automation Name"
                            name="name"
                            placeholder="Automation Name (Optional)"
                            :initial-value="item.name"
                        />
                        <input-textarea
                            v-model="item.description"
                            class="col-span-12"
                            label="Description"
                            name="description"
                            placeholder="Description"
                            :initial-value="item.description"
                        />
                    </grid-content>
                    <grid-content v-show="activeTab === 'triggers'">
                        <h2 class="w-full col-span-12 pb-2 border-b-2 border-charcoal-900 text-left font-medium text-charcoal-900 text-lg pt-px">
                            Triggers
                            <button
                                type="button"
                                class="float-right text-sm py-1 px-3 bg-default-500 text-white ml-2 flex flex-row items-center"
                                @click="addTrigger"
                            >
                                <icon name="plus" type="light" class="text-white text-sm mr-2 h-4" />
                                <span>Add Trigger</span>
                            </button>
                        </h2>
                        <div class="col-span-12">
                            <div v-for="(trigger, triggerIndex) in thisTriggers" :key="triggerIndex">
                                <div v-if="triggerIndex > 0" class="w-full flex justify-center">
                                    <span class="text-xs py-2">and</span>
                                </div>
                                <div class="flex flex-row no-wrap gap-x-2">
                                    <input-select
                                        v-model="trigger.vital"
                                        class="w-4/12"
                                        placeholder="Vital"
                                        :name="`vital-${triggerIndex}`"
                                        :initial-value="trigger.vital"
                                        return="value"
                                        :options="vitalTypes"
                                        :watch-initial="true"
                                    />
                                    <input-select
                                        v-model="trigger.operator"
                                        class="w-2/12"
                                        placeholder="Operator"
                                        name="operator"
                                        :initial-value="trigger.operator"
                                        return="value"
                                        :options="operators"
                                        :watch-initial="true"
                                    />
                                    <input-text
                                        v-model="trigger.value"
                                        class="w-1/12"
                                        :name="`value-${triggerIndex}`"
                                        placeholder="Value"
                                        :initial-value="trigger.value"
                                        :watch-initial="true"
                                    />
                                    <span class="text-xs flex items-center justify-center whitespace-nowrap">
                                        for the last
                                    </span>
                                    <input-text
                                        v-model="trigger.comparison.value"
                                        class="w-1/12"
                                        :name="`comparison.value-${triggerIndex}`"
                                        placeholder="Value"
                                        :initial-value="trigger.comparison.value"
                                        :watch-initial="true"
                                    />
                                    <input-select
                                        v-model="trigger.comparison.period"
                                        class="w-3/12"
                                        placeholder="Period"
                                        name="comparison.period"
                                        :initial-value="trigger.comparison.period"
                                        return="value"
                                        :options="periods"
                                        :watch-initial="true"
                                    />
                                    <div class="flex items-center justify-center">
                                        <icon name="trash-alt" class="w-5 h-5 text-red-500 cursor-pointer" @click="removeTrigger(triggerIndex)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </grid-content>
                    <grid-content v-show="activeTab === 'actions'" class="mb-64">
                        <h2 class="w-full col-span-12 pb-2 border-b-2 border-charcoal-900 text-left font-medium text-charcoal-900 text-lg pt-px">
                            Actions
                            <button
                                type="button"
                                class="float-right text-sm py-1 px-3 bg-default-500 text-white ml-2 flex flex-row items-center"
                                @click="addAction"
                            >
                                <icon name="plus" type="light" class="text-white text-sm mr-2 h-4" />
                                <span>Add Action</span>
                            </button>
                        </h2>
                        <div v-if="thisActions.length" class="col-span-12">
                            <div v-for="(action, actionIndex) in thisActions" :key="actionIndex">
                                <div v-if="actionIndex > 0" class="w-full flex justify-center">
                                    <span class="text-xs py-3">and</span>
                                </div>
                                <div class="border-2 border-dashed border-gray-500 p-4 rounded-xl">
                                    <div class="flex flex-row no-wrap gap-x-2">
                                        <input-select
                                            v-model="action.action"
                                            class="w-full"
                                            placeholder="Action"
                                            :name="`action-${actionIndex}`"
                                            :initial-value="action.action"
                                            return="value"
                                            :options="automationActions"
                                            :watch-initial="true"
                                        />
                                        <div class="flex items-center justify-center">
                                            <icon name="trash-alt" class="w-5 h-5 text-red-500 cursor-pointer" @click="removeAction(actionIndex)" />
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-12 space-y-1 mt-2">
                                        <input-textarea
                                            v-if="slugsThatHaveContentField.find(slug => getActionSlug(action.action) === slug)"
                                            v-model="action.content"
                                            class="col-span-12"
                                            label="Message/Content"
                                            :name="`content-${actionIndex}`"
                                            placeholder="Message/Content"
                                            :initial-value="action.content"
                                        />
                                        <input-text
                                            v-if="slugsThatHaveToField.find(slug => getActionSlug(action.action) === slug)"
                                            v-model="action.to"
                                            label="To"
                                            class="col-span-12"
                                            :name="`to-${actionIndex}`"
                                            placeholder="Comma Separated List of Emails or Mobile Numbers"
                                            :initial-value="action.to"
                                            :watch-initial="true"
                                        />
                                        <div
                                            v-if="slugsThatHaveValueField.find(slug => getActionSlug(action.action) === slug)"
                                            class="col-span-12 grid grid-cols-12 space-x-3"
                                        >
                                            <input-select
                                                v-model="action.vital"
                                                class="col-span-6"
                                                placeholder="Vital"
                                                :name="`vital-action-${actionIndex}`"
                                                :initial-value="action.vital"
                                                return="value"
                                                :options="vitalTypes"
                                                :watch-initial="true"
                                            />
                                            <input-select
                                                v-model="action.value"
                                                class="col-span-4"
                                                placeholder="Interval"
                                                :name="`value-action-${actionIndex}`"
                                                :initial-value="action.value"
                                                return="value"
                                                :options="minutes"
                                                :watch-initial="true"
                                            />
                                        </div>
                                        <div
                                            v-if="slugsThatHavePriorityField.find(slug => getActionSlug(action.action) === slug)"
                                            class="col-span-12 grid grid-cols-12 space-x-3"
                                        >
                                            <input-select
                                                v-model="action.priority"
                                                class="col-span-4"
                                                placeholder="Priority"
                                                :name="`priority-action-${actionIndex}`"
                                                :initial-value="action.priority"
                                                return="value"
                                                :options="priorities"
                                                :watch-initial="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </grid-content>
                </template>
                <template #right>
                    <grid-content>
                        <input-select
                            v-if="isPatientsLoaded"
                            v-model="item.patient_id"
                            class="col-span-12"
                            label="Patient"
                            placeholder="Patient"
                            name="patient_id"
                            :initial-value="item.patient_id"
                            return="value"
                            :options="patients"
                        />
                        <input-toggle
                            v-model="item.active"
                            class="sm:col-span-3"
                            label="Active"
                            name="active"
                            :initial-value="item.active"
                        />
                    </grid-content>
                </template>
            </content-right-sidebar>
        </div>
    </form>
</template>

<script>
import { form } from '@niftee-group/niftee-core/src/utils/form'
import { tabs as TabsUtil } from '@niftee-group/niftee-core/src/utils/tabs'
import { ref, onMounted, onBeforeMount } from 'vue'
import { useForm } from 'vee-validate'
import axios from 'axios'

export default {
    name: "AutomationForm",
    props: {
        id: {
            required: false,
            type: String,
            default: null
        },
        type: {
            required: true,
            type: String
        }
    },
    setup (props) {
        const { handleSubmit, errors } = useForm()
        const { startTab, activeTab, setActiveTab } = TabsUtil()
        const { resource, loading, errorMessage, methodHandler, item, returnPath, submitForm, mounted, saveClose, getOptions } = form()

        resource.value = 'automations'
        returnPath.value = '/automations'
        saveClose.value = true
        item.value.active = true

        const isPatientsLoaded = ref(false)
        const vitalTypes = ref([])
        const automationActions = ref([])
        const thisTriggers = ref([])
        const thisActions = ref([])
        const patients = ref([])

        const operators = [
            {
                label: 'Equals',
                value: '='
            },
            {
                label: 'Greater Than',
                value: '>'
            },
            {
                label: 'Less Than',
                value: '<'
            },
        ]

        const periods = [
            // {
            //     label: 'Minute(s)',
            //     value: 'minute'
            // },
            // {
            //     label: 'Hour(s)',
            //     value: 'hour'
            // },
            {
                label: 'Reading(s)',
                value: 'reading'
            },
        ]

        const priorities = [
            {
                label: 'Normal',
                value: 'Normal'
            },
            {
                label: 'Medium',
                value: 'medium'
            },
            {
                label: 'High',
                value: 'High'
            },
        ]

        const minutes = [
            {
                label: 'Set to Default',
                value: 'default'
            },
            {
                label: 'Every Minute',
                value: '1'
            },
            {
                label: 'Every 2 Minutes',
                value: '2'
            },
            {
                label: 'Every 5 Minutes',
                value: '5'
            },
            {
                label: 'Every 10 Minutes',
                value: '10'
            },
            {
                label: 'Every 15 Minutes',
                value: '15'
            },
            {
                label: 'Every 30 Minutes',
                value: '30'
            },
            {
                label: 'Every 60 Minutes',
                value: '60'
            },
        ]

        const pageActions = {
            buttons: [
                {
                    label: 'Save',
                    icon: 'save',
                    iconClass: 'text-green-600',
                    type: 'submit'
                },
                {
                    label: 'View',
                    icon: 'eye',
                    iconClass: 'text-blue-600',
                    type: 'method',
                    method: 'view',
                    display: props.type === "Edit"
                },
                {
                    label: 'Cancel',
                    icon: 'times',
                    iconClass: 'text-red-600',
                    type: 'method',
                    method: 'cancel',
                }
            ]
        }

        const pageTabs = [
            {
                name: 'Details',
                slug: 'details'
            },
            {
                name: 'Triggers',
                slug: 'triggers'
            },
            {
                name: 'Actions',
                slug: 'actions'
            }
        ]

        const onSubmit = handleSubmit(() => {
            item.value.triggers = thisTriggers.value
            item.value.actions = thisActions.value
            submitForm(props.id)
        })

        onBeforeMount(() => {
            getOptions('vitalTypes', 'GET_VITAL_TYPES', 'options').then(response => {
                vitalTypes.value = response.map((item) => {
                    return {
                        label: item.name,
                        value: item.slug
                    }
                })
            })

            getOptions('automationActions', 'GET_AUTOMATION_ACTIONS', 'original').then(response => {
                automationActions.value = response.map(action => {
                    return {
                        label: action.name,
                        value: action.id,
                        slug: action.slug,
                    }
                })
            })

            getPatients()
        })

        onMounted(async () => {
            await mounted(props, startTab)

            if (props.type === 'Edit') {
                thisTriggers.value = item.value.triggers
                thisActions.value = item.value.actions
            }
        })

        const addTrigger = () => {
            thisTriggers.value.push({
                vital: null,
                operator: null,
                value: null,
                comparison: {
                    period: null,
                    value: null
                }
            })
        }

        const removeTrigger = (index) => {
            thisTriggers.value.splice(index, 1)
        }

        const addAction = () => {
            thisActions.value.push({
                action: null,
                to: null,
                content: null,
                value: null,
                vital: null,
                priority: null
            })
        }

        const removeAction = (index) => {
            thisActions.value.splice(index, 1)
        }

        async function getPatients() {
            isPatientsLoaded.value = false

            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/patients`, {
                params: {
                    sortColumn: 'first',
                    sortDir: 'ASC'
                }
            })
            patients.value = data.map(patient => {
                return {
                    label: patient.full_name,
                    value: patient.id
                }
            })

            isPatientsLoaded.value = true
        }

        const getActionSlug = (id) => {
            return automationActions.value.find(action => action.value === id)?.slug
        }

        const slugsThatHaveContentField = [
            'automation-actions-send-notification-to-device',
            'automation-actions-send-email',
            'automation-actions-send-sms',
            'automation-actions-create-alert'
        ]

        const slugsThatHaveToField = [
            'automation-actions-send-email',
            'automation-actions-send-sms',
        ]

        const slugsThatHaveValueField = [
            'automation-actions-change-testing-frequency'
        ]

        const slugsThatHavePriorityField = [
            'automation-actions-create-alert'
        ]

        return {
            onSubmit,
            loading,
            methodHandler,
            startTab,
            activeTab,
            setActiveTab,
            errorMessage,
            item,
            pageActions,
            pageTabs,
            errors,
            addTrigger,
            addAction,
            thisTriggers,
            thisActions,
            operators,
            periods,
            vitalTypes,
            removeTrigger,
            removeAction,
            isPatientsLoaded,
            patients,
            automationActions,
            getActionSlug,
            slugsThatHaveContentField,
            slugsThatHaveToField,
            slugsThatHaveValueField,
            slugsThatHavePriorityField,
            minutes,
            priorities
        }
    }
}
</script>

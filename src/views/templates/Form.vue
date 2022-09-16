<template>
    <form class="h-full overflow-hidden" @submit="onSubmit">
        <spinner v-if="loading" />
        <page-header :buttons="pageActions.buttons"
            :additional="pageActions.additional"
            @method="methodHandler"
            @submit="onSubmit"
        >
            <template #title>
                {{ type }} Template
            </template>
        </page-header>
        <div v-show="errorMessage || Object.keys(errors).length !== 0" class="bg-red-200 py-2 text-red-700 text-center w-full -mt-px z-20" role="alert">
            <span v-if="errorMessage">{{ errorMessage }}</span>
            <span v-if="Object.keys(errors).length !== 0">Please complete all required fields</span>
        </div>
        <div class="w-full flex flex-col overflow-hidden grow">
            <tabs ref="tabs"
                :tabs="pageTabs"
                :active="startTab"
                @set-tab="setActiveTab"
            />
            <content-right-sidebar v-if="!loading">
                <template #left>
                    <grid-content v-show="activeTab === 'details'">
                        <input-text v-model="item.name"
                            class="col-span-8"
                            label="Name"
                            name="name"
                            placeholder="Name"
                            :initial-value="item.name"
                            rules="required"
                        />
                        <input-select v-model="item.type_id"
                            class="col-span-4"
                            label="Type"
                            name="type_id"
                            placeholder="Type"
                            :initial-value="item.type_id"
                            return="value"
                            :options="types"
                        />
                        <!-- Options -->
                        <textarea v-show="typeName === 'SMS'" ref="contentInput" class="col-span-12 focus:outline-none border-gray-400 focus:border-gray-400 focus:ring-0"  rows="10" v-model="smsContent"></textarea>
                        <div v-if="typeName === 'SMS'" class="flex flex-row -mt-3">
                            <button type="button"
                                class="bg-gray-300 border border-gray-400 py-1 px-4 text-xs whitespace-nowrap mr-2"
                                @click="insertCode('{{patient-first}}')"
                            >
                                Patient First
                            </button>
                            <button type="button"
                                class="bg-gray-300 border border-gray-400 py-1 px-4 text-xs whitespace-nowrap mr-2"
                                @click="insertCode('{{patient-last}}')"
                            >
                                Patient Last
                            </button>
                        </div>
                    </grid-content>
                </template>
                <template #right>
                    <grid-content>
                        <input-toggle v-model="item.active"
                            class="col-span-12"
                            label="Active"
                            name="active"
                            :initial-value="item.active"
                        />
                        <input-toggle v-model="item.quick_link"
                            class="col-span-12"
                            label="Quick Link"
                            name="quick_link"
                            :initial-value="item.quick_link"
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
import { onBeforeMount, onMounted, ref, computed, nextTick } from 'vue'
import { useForm } from 'vee-validate'
import Editor from '@tinymce/tinymce-vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    name: "TemplateForm",
    components: {
        Editor
    },
    props: {
        id: {
            type: String,
            required: false,
            default: null
        },
        type: {
            type: String,
            required: true
        }
    },
    setup (props) {
        const { handleSubmit, errors, values } = useForm()
        const { startTab, activeTab, setActiveTab } = TabsUtil()
        const { methods, resource, loading, errorMessage, methodHandler, item, returnPath, submitForm, mounted, prefix, saveClose, getOptions } = form()
        const router = useRouter()

        const types = ref(null)
        const contentInput = ref(null)
        const content = ref('')

        resource.value = 'templates'
        returnPath.value = '/configuration/templates'
        prefix.value = 'configuration'
        saveClose.value = true
        const smsContent = ref('')

        const pageActions = {
            buttons: [
                {
                    label: 'Save',
                    icon: 'save',
                    iconClass: 'text-green-600',
                    type: 'submit'
                },
                {
                    label: 'Cancel',
                    icon: 'times',
                    iconClass: 'text-red-600',
                    type: 'method',
                    method: 'cancel',
                }
            ],
            additional: []
        }

        const pageTabs = [
            {
                name: 'Details',
                slug: 'details'
            }
        ]

        const onSubmit = handleSubmit((values) => {
            item.value = values

            if (typeName.value === 'Email' || typeName.value === 'Quote Terms'){
                item.value.content = content.value
            } else if (typeName.value === 'SMS'){
                item.value.content = smsContent.value
            }

            submit(props.id)
        })

        async function submit() {
            try {
                if (props.type === 'New'){
                    await axios.post(`${import.meta.env.VITE_API_URL}/templates/`, item.value)
                } else {
                    await axios.put(`${import.meta.env.VITE_API_URL}/templates/${props.id}`, item.value)
                }

                router.push('/configuration/template')
            } catch (e) {
                console.error(e)
            }
        }

        function insertCode(text) {
            const el = contentInput.value
            let cursorPos = el.selectionEnd

            const content = smsContent.value

            if (content && content !== '') {
                smsContent.value =
                    smsContent.value.substring(0, cursorPos) +
                    text +
                    smsContent.value.substring(cursorPos);
            } else {
                smsContent.value = text + ''
            }

            cursorPos += text.length;
            nextTick(()  => el.setSelectionRange(cursorPos, cursorPos));
        }

        const typeName = computed(() => {
            if (values.type_id) {
                return types.value.find(type => {
                    return type.value === values.type_id
                }).label
            }
            return null
        })

        methods.value.cancel =  () => {
                router.push('/configuration/template')
        }

        onMounted(async () => {
            await mounted(props, startTab).then(() => {
                setTimeout(() => {
                    smsContent.value = item.value.content
                }, 300)
            })

            if (props.type === 'New') {
                values.active = true
                values.quick_link = false
            }
        })

        onBeforeMount(() => {
            getOptions('templateTypes', 'GET_TEMPLATE_TYPES').then(response => {
                types.value = response
            })
        })

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
            types,
            values,
            insertCode,
            contentInput,
            typeName,
            content,
            smsContent
        }
    }
}
</script>

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
                {{ type }} Device
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
                            v-model="item.imei"
                            class="col-span-4"
                            label="IMEI"
                            name="imei"
                            placeholder="IMEI"
                            :initial-value="item.imei"
                            rules="required"
                            :mask="'###############'"
                        />
                        <input-text
                            v-model="item.number"
                            class="col-span-4"
                            label="Number"
                            name="number"
                            placeholder="Number"
                            :initial-value="item.number"
                            rules="required"
                            :mask="'#### ### ###'"
                        />
                        <input-text
                            v-model="item.last"
                            class="col-span-4"
                            label="Nickname"
                            name="nickname"
                            placeholder="Nickname"
                            :initial-value="item.nickname"
                        />
                    </grid-content>
                </template>
                <template #right>
                    <grid-content></grid-content>
                </template>
            </content-right-sidebar>
        </div>
    </form>
</template>

<script>
import { form } from '@niftee-group/niftee-core/src/utils/form'
import { tabs as TabsUtil } from '@niftee-group/niftee-core/src/utils/tabs'
import { onBeforeMount, onMounted } from 'vue'
import { useForm } from 'vee-validate'

export default {
    name: "PatientForm",
    props: {
        id: { required: false },
        type: { required: true }
    },
    setup (props) {
        const { handleSubmit, errors, values } = useForm()
        const { startTab, activeTab, setActiveTab } = TabsUtil()
        const { resource, loading, errorMessage, methodHandler, item, returnPath, submitForm, mounted, saveClose } = form()

        resource.value = 'devices'
        returnPath.value = '/devices'
        saveClose.value = true
        item.value.active = true

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
            }
        ]

        const onSubmit = handleSubmit((values) => {
            item.value = values
            submitForm(props.id)
        })

        onMounted(async () => {
            await mounted(props, startTab)
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
        }
    }
}
</script>

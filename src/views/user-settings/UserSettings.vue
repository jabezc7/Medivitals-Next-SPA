<template>
    <div class="h-full overflow-hidden">
        <spinner v-if="loading" />
        <page-header :buttons="pageActions.buttons" @method="methodHandler" @submit="onSubmit">
            <template #title>
                User Settings
            </template>
        </page-header>
        <div class="w-full flex flex-col overflow-hidden grow bg-gray-200">
            <tabs
                ref="tabs"
                :tabs="pageTabs"
                :active="startTab"
                @setTab="setActiveTab"
            />
            <form v-show="activeTab === 'details'" class="px-6 py-4 grid grid-cols-12 gap-4 overflow-y-auto small-scrollbar" @submit="onSubmit">
                <input-text
                    v-model="item.first"
                    class="col-span-6"
                    label="First Name"
                    name="first"
                    placeholder="First Name"
                    :initial-value="user.first"
                    rules="required"
                />
                <input-text
                    v-model="item.last"
                    class="col-span-6"
                    label="Last Name"
                    name="last"
                    placeholder="Last Name"
                    :initial-value="user.last"
                    rules="required"
                />
                <input-text
                    v-model="item.company_name"
                    class="col-span-6"
                    label="Company Name"
                    name="company"
                    placeholder="Company Name"
                    :initial-value="user.company_name"
                    type="tel"
                />
                <input-text
                    v-model="item.email"
                    class="col-span-6"
                    label="Email"
                    name="email"
                    placeholder="Email"
                    :initial-value="user.email"
                    rules="required|email"
                    type="email"
                />
                <input-text
                    v-model="item.mobile"
                    class="col-span-6"
                    label="Mobile"
                    name="mobile"
                    placeholder="Mobile"
                    :initial-value="user.mobile"
                    type="tel"
                />
                <h2 class="w-full col-span-12 py-2 border-b-2 border-charcoal-900 text-left font-medium text-charcoal-900 -mt-2">
                    Password
                </h2>
                <p class="col-span-12 -mt-2 text-sm">
                    You only need to complete the field below if you would like to change your password
                </p>
                <input-text
                    v-model="item.password"
                    class="col-span-6"
                    label="New Password"
                    name="password"
                    placeholder="Leave empty for no change"
                    type="password"
                    :rules="passwordValidation"
                />
                <input-text
                    v-model="item.password_confirmation"
                    class="col-span-6"
                    label="Confirm New Password"
                    name="password_confirmation"
                    placeholder="Leave empty for no change"
                    type="password"
                />
                <h2 class="w-full col-span-12 py-2 border-b-2 border-charcoal-900 text-left font-medium text-charcoal-900 -mt-2">
                    Avatar
                    <small>(Upload your own)</small>
                </h2>
                <div class="flex flex-col items-start justify-start col-span-12">
                    <file-upload accept="image/x-png,image/gif,image/jpeg,image/jpg" @uploaded="avatarUploaded" />
                </div>
                <div class="col-span-12 flex flex-row flex-wrap">
                    <div
                        v-if="item.avatar?.upload"
                        class="mr-3 mb-3 block flex items-center cursor-pointer border-2 p-1"
                        :class="{'border-red-500 rounded-lg': item.avatar?.upload && !item.avatar?.selected }"
                        @click="selectAvatar('upload')"
                    >
                        <img :src="`${IMGIX_URL}/${item.avatar.upload}?mask=ellipse&w=150&h=150&fit=min&fm=png`" alt="Uploaded Avatar" class="rounded-full w-24 h-24">
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { form } from '@niftee-group/niftee-core/src/utils/form'
import { tabs as TabsUtil } from '@niftee-group/niftee-core/src/utils/tabs'
import { onBeforeMount, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useForm } from 'vee-validate'
import { view } from '@niftee-group/niftee-core/src/utils/view'
import { common } from '@niftee-group/niftee-core/src/utils/common'
import axios from 'axios'

export default {
    name: 'UserSettings',
    setup(props) {

        const { handleSubmit, errors, values, setFieldValue } = useForm()
        const { startTab, activeTab, setActiveTab } = TabsUtil()
        const {
            resource,
            loading,
            errorMessage,
            methodHandler,
            item,
            submitForm,
            mounted,
            errors: formErrors
        } = form()
        const store = useStore()
        const { toast } = view()
        const { S3URL } = common()
        const IMGIX_URL = import.meta.env.VITE_IMGIX_URL

        resource.value = 'user-details'

        const pageTabs = [
            {
                name: 'Details',
                slug: 'details'
            }
        ]

        const onSubmit = handleSubmit(async () => {
            await submitForm(null, `${import.meta.env.VITE_API_URL}/user-details`, 'put')

            if (formErrors && Object.keys(formErrors.value).length > 0) {
                return
            }

            setFieldValue('password', null)
            setFieldValue('password_confirmation', null)

            toast.success('Your details were successfully updated')

            await store.dispatch('AUTH_CONFIRM')
        })
        onBeforeMount(() => {
            axios.get(import.meta.env.VITE_API_URL + '/me').then(response => {
                item.value = response.data
            })
        })

        onMounted(async () => {
            await mounted(props, startTab)
        })

        const passwordValidation = value => {
            if (!value) {
                return true
            }

            if (value.length < 6) {
                return 'Your new password must be at least 6 characters long'
            }

            if (value !== item.value.password_confirmation) {
                return 'The password confirmation does not match'
            }

            return true
        }

        const avatarUploaded = (payload) => {
            if (payload.data[0]?.path) {
                item.value.avatar = {
                    upload: payload.data[0]?.path,
                    selected: null
                }
            }
        }

        const selectAvatar = (avatar) => {
            if (avatar === 'upload') {
                item.value.avatar.selected = null
                return
            }

            item.value.avatar ? item.value.avatar.selected = avatar : item.value.avatar = {
                upload: null,
                selected: avatar
            }
        }

        const pageActions = {
            buttons: [
                {
                    label: 'Save',
                    icon: 'save',
                    iconClass: 'text-green-600',
                    type: 'submit'
                }
            ]
        }

        return {
            onSubmit,
            loading,
            methodHandler,
            startTab,
            activeTab,
            setActiveTab,
            errorMessage,
            item,
            pageTabs,
            user: store.getters.user,
            errors,
            values,
            passwordValidation,
            S3URL,
            IMGIX_URL,
            avatarUploaded,
            selectAvatar,
            pageActions
        }
    }
}
</script>

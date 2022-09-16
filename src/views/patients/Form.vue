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
                {{ type }} Patient
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
                            v-model="item.first"
                            class="col-span-6"
                            label="First Name"
                            name="first"
                            placeholder="First Name"
                            :initial-value="item.first"
                            rules="required"
                        />
                        <input-text
                            v-model="item.last"
                            class="col-span-6"
                            label="Last Name"
                            name="last"
                            placeholder="Last Name"
                            :initial-value="item.last"
                            rules="required"
                        />
                        <input-text
                            v-model="item.email"
                            class="col-span-6"
                            label="Email"
                            name="email"
                            placeholder="Email"
                            :initial-value="item.email"
                            rules="required|email"
                        />
                        <input-text
                            v-model="item.mobile"
                            class="col-span-6"
                            label="Mobile"
                            name="mobile"
                            placeholder="Mobile"
                            :initial-value="item.mobile"
                            :mask="'#### ### ###'"
                        />
                        <h2 class="w-full col-span-12 pb-2 border-b-2 pt-5 border-charcoal-900 text-left font-medium text-charcoal-900 text-lg">
                            Address
                        </h2>
                        <input-address-autocomplete
                            class="col-span-12"
                            label="Address Line 1"
                            placeholder="Address Line 1"
                            name="address_1"
                            :initial-value="item.address_1"
                            :watch-initial="true"
                            :separate="true"
                            @selected="setAddress"
                        />
                        <input-text
                            v-model="item.address_2"
                            class="col-span-12"
                            label="Address Line 2"
                            placeholder="Address Line 2"
                            name="address_2"
                            :initial-value="item.address_2"
                            :watch-initial="true"
                        />
                        <input-text
                            v-model="item.suburb"
                            class="col-span-6"
                            label="Suburb"
                            placeholder="Suburb"
                            name="suburb"
                            :initial-value="item.suburb"
                            :watch-initial="true"
                        />
                        <input-text
                            v-model="item.state"
                            class="col-span-6"
                            label="State"
                            placeholder="State"
                            name="state"
                            :initial-value="item.state"
                            :watch-initial="true"
                        />
                        <input-text
                            v-model="item.postcode"
                            class="col-span-6"
                            label="Postcode"
                            placeholder="Postcode"
                            name="postcode"
                            :initial-value="item.postcode"
                            :watch-initial="true"
                        />
                        <input-text
                            v-model="item.country"
                            class="col-span-6"
                            label="Country"
                            placeholder="Country"
                            name="country"
                            :initial-value="item.country"
                            :watch-initial="true"
                        />
                        <h2 class="w-full col-span-12 py-2 pt-5 border-b-2 border-charcoal-900 text-left font-medium text-charcoal-900 -mt-2">
                            Medicare
                        </h2>
                        <input-text
                            v-model="item.medicare_number"
                            class="col-span-12"
                            label="Medicare Number"
                            placeholder="Medicare Number"
                            name="medicare_number"
                            :initial-value="item.medicare_number"
                            :watch-initial="true"
                        />
                        <input-text
                            v-model="item.medicare_position"
                            class="col-span-6"
                            label="Medicare Position"
                            placeholder="Medicare Position"
                            name="medicare_position"
                            :initial-value="item.medicare_position"
                            :watch-initial="true"
                        />
                        <input-date-time
                            v-model="item.medicare_expiry"
                            class="col-span-6"
                            label="Medicare Expirate Date"
                            placeholder="Medicare Expirate Date"
                            name="medicare_expiry"
                            :initial-value="item.medicare_expiry"
                            :watch-initial="true"
                            type="date"
                            format="dd/LL/yyyy"
                            :auto="true"
                            :required="true"
                        />
                        <input-text
                            v-model="item.private_health_fund"
                            class="col-span-6"
                            label="Private Health Fund"
                            placeholder="Private Health Fund"
                            name="private_health_fund"
                            :initial-value="item.private_health_fund"
                            :watch-initial="true"
                        />
                        <input-text
                            v-model="item.private_health_membership_no"
                            class="col-span-6"
                            label="Private Health Membership Number"
                            placeholder="Private Health Membership Number"
                            name="private_health_membership_no"
                            :initial-value="item.private_health_membership_no"
                            :watch-initial="true"
                        />
                        <h2 class="w-full col-span-12 py-2 border-b-2 pt-5 border-charcoal-900 text-left font-medium text-charcoal-900 -mt-2">
                            General Practitioner
                        </h2>
                        <input-text
                            v-model="item.gp_medical_centre"
                            class="col-span-6"
                            label="Medical Centre"
                            placeholder="Medical Centre"
                            name="gp_medical_centre"
                            :initial-value="item.gp_medical_centre"
                            :watch-initial="true"
                        />
                        <input-text
                            v-model="item.gp_name"
                            class="col-span-6"
                            label="Name"
                            placeholder="Name"
                            name="gp_name"
                            :initial-value="item.gp_name"
                            :watch-initial="true"
                        />
                        <input-text
                            v-model="item.gp_phone"
                            class="col-span-6"
                            label="Phone"
                            placeholder="Phone"
                            name="gp_phone"
                            :initial-value="item.gp_phone"
                            :watch-initial="true"
                        />
                        <input-text
                            v-model="item.gp_email"
                            class="col-span-6"
                            label="Email"
                            placeholder="Email"
                            name="gp_email"
                            :initial-value="item.gp_email"
                            :watch-initial="true"
                        />

                    </grid-content>
                </template>
                <template #right>
                    <grid-content>
                        <input-select
                            v-if="isUserLoaded"
                            v-model="item.assignee_id"
                            class="col-span-12 sm:col-span-12"
                            label="Assignee Name"
                            placeholder="Assignee Name"
                            name="assignee_id"
                            :initial-value="item.assignee_id"
                            return="value"
                            :options="userList"
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
import { ref, onBeforeMount, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import axios from 'axios'

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
        const userList = ref([])
        const isUserLoaded = ref(false)

        resource.value = 'patients'
        returnPath.value = '/patients'
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

        const setAddress = (address) => {
            values.address_1 = address.address_1
            values.address_2 = address.address_2
            values.suburb = address.suburb
            values.state = address.state
            values.postcode = address.postcode
            values.country = address.country
            values.latitude = address.latitude
            values.longitude = address.longitude
        }

        async function getUsers() {
            isUserLoaded.value = false
            try {
                const { data, status } = await axios.post(`${import.meta.env.VITE_API_URL}/users/get-list`)
                userList.value = data
            } catch (e) {
                console.error(e)
            }
            isUserLoaded.value = true
        }

        onBeforeMount(() => {
            if (props.type === 'New'){
                item.value.active = true
            }
        })

        onMounted(async () => {
            await mounted(props, startTab)
            getUsers()
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
            setAddress,
            userList,
            isUserLoaded
        }
    }
}
</script>

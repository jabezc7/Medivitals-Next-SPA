<template>
    <grid-content :row-gap="0">
        <h2 class="w-full col-span-12 pb-2 border-b-2 border-charcoal-900 text-left font-medium text-charcoal-900 text-lg pt-px">
            Patient Details
        </h2>
        <table class="w-full mb-4 internal-table col-span-12">
            <tbody>
                <tr>
                    <td class="w-32">
                        Name
                    </td>
                    <td>{{ item.full_name }}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{{ item.email }}</td>
                </tr>
                <tr>
                    <td>Mobile</td>
                    <td>{{ item.mobile }}</td>
                </tr>
            </tbody>
        </table>
        <h2 class="w-full col-span-12 pb-2 border-b-2 pt-5 border-charcoal-900 text-left font-medium text-charcoal-900 text-lg pt-px">
            Patient Medicare Details
        </h2>
        <table class="w-full mb-4 internal-table col-span-12">
            <tbody>
                <tr>
                    <td class="w-72">
                        Medicare Number
                    </td>
                    <td>{{ item.medicare_number }}</td>
                </tr>
                <tr>
                    <td class="w-72">
                        Medicare Position
                    </td>
                    <td>{{ item.medicare_position }}</td>
                </tr>
                <tr>
                    <td>Medicare Expiry</td>
                    <td> {{ item.medicare_expiry ? dayjs(item.medicare_expiry).format("DD/MM/YYYY") : '' }}</td>
                </tr>
                <tr>
                    <td>Private Health Fund</td>
                    <td>{{ item.private_health_fund }}</td>
                </tr>
                <tr>
                    <td>Private Health Membership Number</td>
                    <td>{{ item.private_health_membership_no }}</td>
                </tr>
            </tbody>
        </table>
        <h2 class="w-full col-span-12 pb-2 border-b-2 pt-5 border-charcoal-900 text-left font-medium text-charcoal-900 text-lg pt-px">
            General Practitioner
        </h2>
        <table class="w-full mb-4 internal-table col-span-12">
            <tbody>
                <tr>
                    <td class="w-72">
                        Medical Centre
                    </td>
                    <td>{{ item.gp_medical_centre }}</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{{ item.gp_name }}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{{ item.gp_email }}</td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>{{ item.gp_phone }}</td>
                </tr>
            </tbody>
        </table>
    </grid-content>
</template>

<script>
import { datetime } from '@niftee-group/niftee-core/src/utils/datetime'

export default {
    name: 'PatientsDetails',
    props: {
        item: {
            type: Object,
            default:[]
        },
    },
    setup (props) {
        const { dayjs } = datetime()
        return {
            dayjs
        }
    }
}
</script>

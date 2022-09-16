<template>
     <grid-content :row-gap="0">
        <h2 class="w-full col-span-12 pb-2 border-b-2 border-charcoal-900 text-left font-medium text-charcoal-900 text-lg pt-px">
            Meta
        </h2>
        <table class="w-full mb-6 internal-table col-span-12">
            <tbody>
                  <tr>
                    <td>Assignee</td>
                    <td class="text-right">
                        <span v-if="item.assignee">{{ item.assignee.full_name }}</span>
                    </td>
                </tr>
                <tr>
                    <td>Last Login</td>
                    <td class="text-right">
                        {{ item.meta.last_login ? dayjs(item.meta.last_login).format("DD/MM/YYYY h:mm a") : 'Never' }}
                    </td>
                </tr>
                <tr>
                    <td>Login Count</td>
                    <td class="text-right">
                        {{ item.meta.login_count > 0 ? item.meta.login_count : 'Never' }}
                    </td>
                </tr>
                <tr>
                    <td>Last Updated</td>
                    <td class="text-right">
                        {{ dayjs(item.meta.updated_at).format("DD/MM/YYYY h:mm a") }}
                    </td>
                </tr>
                <tr>
                    <td>Created At</td>
                    <td class="text-right">
                        {{ dayjs(item.meta.created_at).format("DD/MM/YYYY h:mm a") }}
                    </td>
                </tr>
                <tr>
                    <td>Created By</td>
                    <td v-if="item.meta.created_by" class="text-right">
                        {{ item.meta.created_by.full_name }}
                    </td>
                    <td v-else class="text-right">
                        N/A
                    </td>
                </tr>
            </tbody>
        </table>
    </grid-content>
</template>

<script>
import { datetime } from '@niftee-group/niftee-core/src/utils/datetime'

export default {
    name: 'PatientsMeta',
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
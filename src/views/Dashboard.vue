<template>
    <div class="flex flex-col h-full">
        <spinner v-if="loading" />
        <page-header>
            <template #title>
                Dashboard
            </template>
        </page-header>
        <div class="w-full flex flex-col overflow-hidden grow">
            <content-full-width v-if="!loading" :fixed-tabs="true">
                <template #content>
                    <grid-content :row-gap="0">

                    </grid-content>
                </template>
            </content-full-width>
        </div>
    </div>
</template>

<script>

import { ref } from 'vue'

export default {
    name: 'HomeDashboard',
    setup () {
        const loading = ref(false)

        return {
            loading,
        }
    }
}
</script>
